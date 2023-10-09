import { NextPage } from "next"

const EventScan: NextPage = async ({
  params,
}: {
  params: { eventSlug: string }
}) => {
  return (
    <>
      event id = {params.eventSlug}
      <p>scanner</p>
    </>
  )
}

export default EventScan
