import { NextPage } from "next"

const EventOverview: NextPage = async ({
  params,
}: {
  params: { eventSlug: string }
}) => {
  return (
    <>
      event id = {params.eventSlug}
      <p>overview</p>
    </>
  )
}

export default EventOverview
