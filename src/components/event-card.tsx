import { CalendarIcon } from "@radix-ui/react-icons"
import Link from "next/link"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn, formatSlug } from "@/lib/utils"
import { Database } from "@/lib/types/supabase"

// TODO: make a script to autogenerate friendlier types? e.g. Event
// https://github.com/orgs/supabase/discussions/13364
type Event = Database["public"]["Tables"]["events"]["Row"]
interface EventCardProps {
  event: Event
}

const hasEventPast = (dt: string) => new Date(dt) < new Date()

const formatDatetime = (dt: string) =>
  new Date(dt).toLocaleString("en-uk", {
    weekday: "short", // short weekday name
    day: "2-digit", // day of the month (leading zero if single digit)
    month: "short", // abbreviated month name
    year: "numeric", // 4-digit year
    hour: "2-digit", // hours (24-hour format, leading zero if single digit)
    minute: "2-digit", // minutes (leading zero if single digit)
    hour12: false, // use 24-hour format
  })

export const EventCard = ({ event }: EventCardProps) => {
  if (!event) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {event.name}
          {hasEventPast(event.event_datetime) && (
            <Badge variant="secondary" className="ml-2">
              Finished
            </Badge>
          )}
          {!event.is_verified && (
            <Badge variant="secondary" className="ml-2">
              Pending confirmation
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="text-sm space-y-2 [&>li]:flex [&>li]:items-center [&>li]:gap-2">
          <li>
            {/* radix doesn't have the map pin icon unfortunately */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.85}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            {event.location}
          </li>
          <li>
            <CalendarIcon aria-label="date & time" className="h-5 w-5" />
            {formatDatetime(event.event_datetime)}
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        {/* TODO: create a format slug function, e.g. formatSlug(event) */}
        {event.is_verified ? (
          <Link
            href={`/events/${formatSlug(event.event_id, event.name)}/overview`}
            className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
          >
            View event
          </Link>
        ) : (
          // because cursor-not-allowed and pointer-events-none can't coexist
          <div className="w-full hover:cursor-not-allowed">
            <Button disabled variant="outline" className="w-full">
              View event
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
