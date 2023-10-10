import { NextPage } from "next"
import Link from "next/link"

const Events: NextPage = () => {
  return (
    <>
      <p>events page</p>
      <Link href="/events/new">create event</Link>
    </>
  )
}

export default Events
