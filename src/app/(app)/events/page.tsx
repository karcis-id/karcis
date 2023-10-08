import { NextPage } from "next"

const Events: NextPage = async () => {
  return (
    <>
      events page
      <form action="/api/auth/sign-out" method="POST">
        <button type="submit">sign out</button>
      </form>
    </>
  )
}

export default Events
