import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

import { Separator } from "@/components/ui/separator"
import { Participant, columns, DataTable } from "@/components/data-table"
import { Database } from "@/lib/types/supabase"

const getParticipants = async (eventSlug: string) => {
  // checking is already done in layouts.tsx, so we can assume the eventSlug is already valid
  const eventId = parseInt(eventSlug.split("-")[0].substring(1))
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: participants, error } = await supabase
    .from("participants")
    .select("*, events(count)")
    .eq("events.event_id", eventId)
    .order("participant_id")

  if (error) {
    console.log(error)
  }

  return participants
}

const EventDashboard = async ({
  params,
}: {
  params: { eventSlug: string }
}) => {
  const participants = await getParticipants(params.eventSlug)
  const data: Participant[] =
    participants?.map((p) => ({
      id: p.participant_id,
      name: p.name,
      email: p.email,
      status: p.is_checked_in,
    })) ?? []

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
