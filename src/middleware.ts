import { SupabaseClient, createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextRequest, NextResponse } from "next/server"

import { isTokenExpired, setExpireToken } from "@/lib/utils"

const { SUPABASE_SCAN_USER_EMAIL, SUPABASE_SCAN_USER_PASSWORD } = process.env

const isValidToken = async (supabase: SupabaseClient, scanToken: string) => {
  const { data: token, error } = await supabase
    .from("share_tokens")
    .select()
    .eq("token_id", scanToken)
    .single()

  if (error) {
    console.log(error)
    return false
  }

  if (!token) return false

  const isExpired = isTokenExpired(token)
  if (token.is_active && isExpired) setExpireToken(supabase, token)

  return !isExpired
}

// TODO: verify security of this
// WARN: this might lead to vulnerabilities
const getAnonUser = async (supabase: SupabaseClient) => {
  const email = SUPABASE_SCAN_USER_EMAIL
  const password = SUPABASE_SCAN_USER_PASSWORD
  if (!email || !password) return

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    console.log(error)
  }
}

// TODO: handle session invalidation
export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname, searchParams } = req.nextUrl
  const scanToken = searchParams.get("scanToken")

  if (
    (!user || (user && user.email === SUPABASE_SCAN_USER_EMAIL)) &&
    pathname.match(/\/events\/[^\/]+\/scan/) &&
    scanToken &&
    (await isValidToken(supabase, scanToken))
  ) {
    console.log("valid token: ", scanToken)
    await getAnonUser(supabase)
    return res
  }

  // edge case, allow calls to this route for anon
  if (user && user.email === SUPABASE_SCAN_USER_EMAIL && pathname === "/api/events/scan") {
    return res
  }

  if (
    (!user || (user && user.email === SUPABASE_SCAN_USER_EMAIL)) &&
    (pathname.startsWith("/events") ||
      pathname.startsWith("/account") ||
      pathname.startsWith("/api/events"))
  ) {
    return NextResponse.redirect(new URL("/sign-in", req.url))
  }

  if (user && user.email !== SUPABASE_SCAN_USER_EMAIL && pathname.startsWith("/sign-in")) {
    return NextResponse.redirect(new URL("/events", req.url))
  }

  return res
}

export const config = {
  matcher: ["/sign-in", "/events", "/events/:path*", "/account", "/api/events/:path*"],
}
