import { NextPage } from "next"
import Link from "next/link"
import { PlusCircledIcon } from "@radix-ui/react-icons"

import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

const Events: NextPage = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Your events
          </h1>
          <p className="text-muted-foreground">Helpful description here...</p>
        </div>
        <Link href="/events/new" className={buttonVariants()}>
          <PlusCircledIcon className="mr-2 h-4 w-4" /> Create event
        </Link>
      </div>
      <Separator />
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((i) => (
          // TODO: move to a separate component when this is used in another page
          <Card key={i}>
            <CardHeader>
              <CardTitle>
                {`Event ${i}`}
                {/* TODO: change condition to past events */}
                {i > 2 && (
                  <Badge variant="secondary" className="ml-2">
                    Finished
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>Short description of event</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="ml-6 list-disc text-sm">
                <li>
                  <span className="font-semibold">Where:&nbsp;</span>
                  Jln. D.I Panjaitan km. 9
                </li>
                <li>
                  <span className="font-semibold">When:&nbsp;</span>
                  {new Date().toLocaleString("en-uk", {
                    weekday: "short", // short weekday name
                    day: "2-digit", // day of the month (leading zero if single digit)
                    month: "short", // abbreviated month name
                    year: "numeric", // 4-digit year
                    hour: "2-digit", // hours (24-hour format, leading zero if single digit)
                    minute: "2-digit", // minutes (leading zero if single digit)
                    hour12: false, // use 24-hour format
                  })}
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link
                href={`/events/${i}/overview`}
                className={cn(buttonVariants({ variant: "outline" }), "w-full")}
              >
                View event
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Events
