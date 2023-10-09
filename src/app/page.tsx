import { NextPage } from "next"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"

const Home: NextPage = () => {
  return (
    <>
      <p>hi world</p>
      <Link className={buttonVariants()} href="/events">
        sign in here
      </Link>
    </>
  )
}

export default Home
