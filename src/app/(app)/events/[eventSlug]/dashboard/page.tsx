import { NextPage } from "next"

const EventDashboard: NextPage = async ({
  params,
}: {
  params: { eventSlug: string }
}) => {
  return (
    <>
      event id = {params.eventSlug}
      <p>dashboard</p>
    </>
  )
}

export default EventDashboard
