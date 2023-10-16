import { Separator } from "@/components/ui/separator"

const EventScan = ({ params }: { params: { eventSlug: string } }) => {
  return (
    <div className="space-y-4">
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">Scan QR code</h1>
      <Separator />
      <div>content goes here</div>
    </div>
  )
}

export default EventScan
