import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { NextApiHandler } from "next"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const GET: NextApiHandler = async (req) => {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  const { searchParams } = new URL(req.url)
  const code = searchParams.get("code")

  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(new URL("/events", req.url))
}
