import { notFound } from "next/navigation"

const EventLayout = ({
  params,
  children,
}: {
  params: { eventSlug: string }
  children: React.ReactNode
}) => {
  // TODO: call not found if eventSlug isn't in events table
  if (params.eventSlug !== "test") {
    notFound()
  }

  return children
}

export default EventLayout
