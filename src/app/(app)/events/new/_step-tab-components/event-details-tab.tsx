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
import { DatePicker } from "@/components/date-picker"

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
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="Kampus Binus Kemanggisan" />
        </div>
        <div className="flex items-center gap-4 [&>div]:space-y-2">
          <div className="w-full">
            <Label htmlFor="location">Date</Label>
            <DatePicker />
          </div>
          <div className="w-full">
            <Label htmlFor="time">Time</Label>
            <Input id="time" type="time" />
          </div>
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
