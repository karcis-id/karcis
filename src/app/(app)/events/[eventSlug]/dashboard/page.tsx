import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

import { Participant, columns, DataTable } from "@/components/data-table"
import ShareLinkPopover from "@/components/share-link-popover"
import { Separator } from "@/components/ui/separator"
import { Database } from "@/lib/types/supabase"

const getParticipants = async (eventId: number) => {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: participants, error } = await supabase
    .from("participants")
    .select()
    .eq("event_id", eventId)
    .order("participant_id")

  if (error) {
    console.log(error)
    return []
  }

  // since participants are all in the same table, subtract row ids with row[0].id - 1
  // so that the ids start from 1
  const firstId = participants[0].participant_id - 1
  return participants.map((p) => ({ ...p, participant_id: p.participant_id - firstId }))
}

const EventDashboard = async ({ params }: { params: { eventSlug: string } }) => {
  // checking is already done in layouts.tsx, so we can assume the eventSlug is already valid
  const eventId = parseInt(params.eventSlug.split("-")[0].substring(1))
  const participants = await getParticipants(eventId)
  const data: Participant[] =
    participants?.map((p) => ({
      id: p.participant_id,
      name: p.name,
      email: p.email,
      status: p.is_checked_in,
    })) ?? []

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">Dashboard</h1>
        <ShareLinkPopover eventId={eventId} />
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default EventDashboard
