import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

import { Database } from "@/lib/types/supabase"

export const dynamic = "force-dynamic"

interface Context {
  params: {
    eventId: number
  }
}

export const GET = async (req: Request, context: Context) => {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })
  const { eventId } = context.params
  const { data, error } = await supabase
    .from("participants")
    .select("name, email, is_checked_in, checked_in_at")
    .eq("event_id", eventId)
    .csv()

  if (error) {
    console.log(error)
    return Response.error()
  }

  return new Response(data, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment;filename=data.csv",
    },
  })
}
