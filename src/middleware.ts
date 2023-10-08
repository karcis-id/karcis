import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextRequest, NextResponse } from "next/server"

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user && req.nextUrl.pathname.startsWith("/events")) {
    return NextResponse.redirect(new URL("/sign-in", req.url))
  }

  if (user && req.nextUrl.pathname.startsWith("/sign-in")) {
    return NextResponse.redirect(new URL("/events", req.url))
  }

  return res
}

export const config = {
  matcher: ["/sign-in", "/events", "/events/:path*"],
}
