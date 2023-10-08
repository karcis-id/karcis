import Link from "next/link"

export default function Home() {
  return (
    <main>
      <p>hi world</p>
      <Link href="/sign-in">sign in here</Link>
    </main>
  )
}
