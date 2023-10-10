import { Separator } from "@/components/ui/separator"
import { Participant, ParticipantStatus, columns } from "./columns"
import { DataTable } from "./data-table"

const data: Participant[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123456789",
    status: ParticipantStatus.Present,
  },
  {
    id: 2,
    name: "Luke Smith",
    email: "luke.smith@example.com",
    phone: "123456789",
    status: ParticipantStatus.Present,
  },
  {
    id: 3,
    name: "Bard Altman",
    email: "bard.altman@example.com",
    phone: "123456789",
    status: ParticipantStatus.Absent,
  },
]

const EventDashboard = ({ params }: { params: { eventSlug: string } }) => {
  return (
    <div className="space-y-4">
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Participants dashboard
      </h1>
      <Separator />
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default EventDashboard
