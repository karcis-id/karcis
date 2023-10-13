import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/date-picker"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useRouter } from "next/navigation"

export const formSchema = z.object({
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
  date: z.date().min(new Date(), { message: "Date should be in the future" }),
  time: z
    .string()
    .trim()
    .regex(/\d\d:\d\d/),
})

const EventDetailsTab = ({
  formData,
  setFormData,
}: {
  formData: any
  setFormData: any
}) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: formData.name ?? "",
      location: formData.location ?? "",
      date: formData.date ?? "",
      time: formData.time ?? "",
    },
  })
  // NOTE: we're not using isDirty because when the user navigates from another
  // step, isDirty will be set to false, making the button disabled even when
  // all fields have been filled
  const { isValid } = form.formState

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // @ts-ignore
    setFormData((prev) => ({ ...prev, ...values }))
    router.push(`/events/new?stage=2`)
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardHeader>
            <CardTitle>Event details</CardTitle>
            <CardDescription>Descriptions are always helpful</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Annual conference 2023"
                      {...field}
                    />
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
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={!isValid} className="w-full">
              Next
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default EventDetailsTab
