import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { DatePicker } from "@/components/date-picker"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EventFormData } from "@/lib/types/events"

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Must be 3 or more characters long" })
    .max(50, { message: "Must be 50 or fewer characters long" }),
  location: z
    .string()
    .trim()
    .min(3, { message: "Must be 3 or more characters long" })
    .max(100, { message: "Must be 100 or fewer characters long" }),
  date: z
    .date({ invalid_type_error: "Date is required" })
    .min(new Date(), { message: "Date should be in the future" }),
  time: z
    .string()
    .trim()
    .regex(/\d\d:\d\d/),
})

interface EventDetailsTabProps {
  formData: EventFormData
  setFormData: Dispatch<SetStateAction<EventFormData>>
}

const EventDetailsTab = ({ formData, setFormData }: EventDetailsTabProps) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: formData.name,
      location: formData.location,
      // @ts-ignore
      date: formData.date,
      time: formData.time,
    },
  })

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    setFormData((prev) => ({ ...prev, ...values }))
    router.push("/events/new?stage=2")
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardHeader>
            <CardTitle>Event details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event name</FormLabel>
                  <FormControl>
                    <Input required placeholder="e.g., Annual conference 2023" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="e.g., Kuala Lumpur City Centre (KLCC)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Date</FormLabel>
                    <DatePicker field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input required type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Next
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default EventDetailsTab
