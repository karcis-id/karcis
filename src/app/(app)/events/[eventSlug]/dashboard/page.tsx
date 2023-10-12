import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

import { Separator } from "@/components/ui/separator"
import { Participant, columns, DataTable } from "@/components/data-table"
import { Database } from "@/lib/types/supabase"

// supabase client uses cookies, which makes this call dynamic & non-[memoizable & cacheable]
// and since layouts can't pass data to pages, all pages in /events/[eventSlug]/.* will
// have to fetch the event individually, leading to multiple requests being made to the same
// data from what should've been only 1 request...
// TODO: find a way to memoize request or cache the data
const getEvent = async (eventSlug: string) => {
  // checking is already done in layouts.tsx, so we can assume the eventSlug is already valid
  const eventId = parseInt(eventSlug.split("-")[0].substring(1))
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: event, error } = await supabase
    .from("events")
    .select()
    .eq("event_id", eventId)
    .single()

  if (error) {
    console.log(error)
  }

  return event
}

const data: Participant[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123456789",
    status: "Present",
  },
  {
    id: 2,
    name: "Luke Smith",
    email: "luke.smith@example.com",
    phone: "123456789",
    status: "Present",
  },
  {
    id: 3,
    name: "Bard Altman",
    email: "bard.altman@example.com",
    phone: "123456789",
    status: "Absent",
  },
]

const EventDashboard = async ({
  params,
}: {
  params: { eventSlug: string }
}) => {
  const event = await getEvent(params.eventSlug)

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Participants dashboard
        </h1>
        <p className="text-muted-foreground">Helpful description here...</p>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default EventDashboard
