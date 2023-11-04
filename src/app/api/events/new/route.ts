import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { EventFormData } from "@/lib/types/events"
import { Database } from "@/lib/types/supabase"
import { postgrestToHttpCode } from "@/lib/utils"

export const dynamic = "force-dynamic"

// TODO: unit tests
const formatEventsData = (reqBody: EventFormData) => {
  const is_verified = false
  const { name, location, date, time, subject: email_subject, emailBody: email_body } = reqBody
  // @ts-ignore
  const event_datetime = date.split("T")[0] + "T" + time + ":00.000Z"
  return { name, location, event_datetime, is_verified, email_subject, email_body }
}

// TODO: move this to a server action when it's stable
export const POST = async (req: Request) => {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })
  const body: EventFormData = await req.json()
  const eventsData = formatEventsData(body)

  const { data, error } = await supabase
    .from("events")
    .insert(eventsData)
    .select("event_id")
    .single()

  if (error) {
    console.log(error)
    return NextResponse.json(
      { message: error.message },
      { status: postgrestToHttpCode(error.code) },
    )
  }

  // @ts-ignore
  const participants = body.data.map((p) => ({ ...p, event_id: data.event_id }))
  const { error: error2 } = await supabase.from("participants").insert(participants)

  if (error2) {
    console.log(error2)
    return NextResponse.json(
      { message: error2.message },
      { status: postgrestToHttpCode(error2.code) },
    )
  }

  return NextResponse.json({ message: "success" }, { status: 200 })
}
