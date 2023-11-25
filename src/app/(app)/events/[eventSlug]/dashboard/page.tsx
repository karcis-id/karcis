import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

import { Participant, columns, DataTable } from "@/components/data-table"
import ShareLinkPopover from "@/components/share-link-popover"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
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

  return participants
}

const EventDashboard = async ({ params }: { params: { eventSlug: string } }) => {
  // checking is already done in layouts.tsx, so we can assume the eventSlug is already valid
  // since participants are all in the same table, subtract row ids with row[0].id - 1
  // so that the ids start from 1
  const eventId = parseInt(params.eventSlug.split("-")[0].substring(1))
  const participants = await getParticipants(eventId)
  const firstId = participants.length > 0 ? participants[0].participant_id - 1 : 0
  const data: Participant[] =
    participants?.map((p) => ({
      id: p.participant_id - firstId,
      name: p.name,
      email: p.email,
      status: p.is_checked_in,
    })) ?? []
  const nTotal = participants.length
  const nCheckedIn = participants.filter((p) => p.is_checked_in).length

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">Dashboard</h1>
        <ShareLinkPopover eventId={eventId} />
      </div>
      <Separator />
      {/* TODO: realtime updates when participant status changes */}
      <Card>
        <CardHeader>
          <CardTitle>Attendee check-ins</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <p>{nCheckedIn} check-ins</p>
            <p>{nTotal} total attendees</p>
          </div>
          <Slider
            disabled
            defaultValue={[0]}
            value={[(nCheckedIn / nTotal) * 100]}
            max={100}
            step={1}
          />
        </CardContent>
      </Card>
      <DataTable columns={columns} data={data} firstId={firstId} />
    </div>
  )
}

export default EventDashboard
