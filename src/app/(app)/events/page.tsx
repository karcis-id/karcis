import { NextPage } from "next"
import Link from "next/link"

const Events: NextPage = async () => {
  return (
    <>
      <p>events page</p>
      <Link href="/events/new">create event</Link>
      <form action="/api/auth/sign-out" method="POST">
        <button type="submit">sign out</button>
      </form>
    </>
  )
}

export default Events
