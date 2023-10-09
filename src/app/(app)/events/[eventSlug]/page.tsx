import { redirect } from "next/navigation"

const EventRedirect = ({ params }: { params: { eventSlug: string } }) => {
  // TODO: call redirect if eventSlug is in events table
  if (params.eventSlug === "test") {
    redirect(`/events/${params.eventSlug}/overview`)
  }
  return null
}

export default EventRedirect
