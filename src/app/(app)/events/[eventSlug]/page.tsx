import { redirect } from "next/navigation"

const EventRedirect = ({ params }: { params: { eventSlug: string } }) => {
  redirect(`/events/${params.eventSlug}/dashboard`)
}

export default EventRedirect
