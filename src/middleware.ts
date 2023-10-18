import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextRequest, NextResponse } from "next/server"

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname, searchParams } = req.nextUrl
  const scanToken = searchParams.get("scanToken")

  // TODO: find a way to create time-bound token on demmand & validate here
  if (
    !user &&
    pathname.match(/\/events\/[^\/]+\/scan/) &&
    scanToken &&
    scanToken === "timebound-unique-shared-token"
  ) {
    console.log("valid token")
    return res
  }

  if (!user && (pathname.startsWith("/events") || pathname.startsWith("/api/events"))) {
    return NextResponse.redirect(new URL("/sign-in", req.url))
  }

  if (user && pathname.startsWith("/sign-in")) {
    return NextResponse.redirect(new URL("/events", req.url))
  }

  return res
}

export const config = {
  matcher: ["/sign-in", "/events", "/events/:path*", "/api/events/:path*"],
}
