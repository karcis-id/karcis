import { Separator } from "@/components/ui/separator"
import { Participant, columns, DataTable } from "@/components/data-table"

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

const EventDashboard = ({ params }: { params: { eventSlug: string } }) => {
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
