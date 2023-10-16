import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"

import { Database } from "@/lib/types/supabase"
import { formatSlug } from "@/lib/utils"

const isValidEvent = async (eventSlug: string) => {
  const eventId = parseInt(eventSlug.split("-")[0].substring(1))
  if (!eventId) return false

  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: event, error } = await supabase
    .from("events")
    .select("event_id, name, is_verified")
    .eq("event_id", eventId)
    .single()

  console.log("fetched: ", event)
  if (error) {
    console.log(error)
  }

  return event && event.is_verified && formatSlug(event.event_id, event.name) === eventSlug
}

const EventLayout = async ({
  params,
  children,
}: {
  params: { eventSlug: string }
  children: React.ReactNode
}) => {
  if (!(await isValidEvent(params.eventSlug))) {
    console.log("this should print")
    notFound()
  }

  // BUG: this is a bug(?) in next.js with async layout.tsx
  // https://github.com/vercel/next.js/issues/49280#issuecomment-1536915621
  return <>{children}</>
}

export default EventLayout
