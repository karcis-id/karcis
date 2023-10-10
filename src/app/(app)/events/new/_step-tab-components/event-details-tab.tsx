import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const EventDetailsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Event details</CardTitle>
        <CardDescription>Descriptions are always helpful</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Event name</Label>
          <Input id="name" placeholder="John's birthday" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Event description</Label>
          <Input
            id="description"
            placeholder="A short description of the event"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="Kampus Binus Kemanggisan" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="datetime">Date and time</Label>
          <Input id="datetime" placeholder="get the datepicker component" />
        </div>
      </CardContent>
      <CardFooter>
        <Link href="?stage=2" className={cn(buttonVariants(), "w-full")}>
          Next
        </Link>
      </CardFooter>
    </Card>
  )
}

export default EventDetailsTab
