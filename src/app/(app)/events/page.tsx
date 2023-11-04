import { PlusCircledIcon } from "@radix-ui/react-icons"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"

import { EventCard } from "@/components/event-card"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Database } from "@/lib/types/supabase"

export const dynamic = "force-dynamic"

const getEvents = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: events, error } = await supabase
    .from("events")
    .select()
    .order("created_at", { ascending: false })

  console.log("fetched: ", events)
  if (error) {
    console.log(error)
  }

  return events
}

const Events = async () => {
  const events = await getEvents()

  // TODO: add ui for empty state
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">Your events</h1>
        <Link href="/events/new" className={buttonVariants()}>
          <PlusCircledIcon className="mr-2 h-4 w-4" /> Create event
        </Link>
      </div>
      <Separator />
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {events?.map((event, i) => <EventCard key={i} event={event} />)}
      </div>
    </div>
  )
}

export default Events
