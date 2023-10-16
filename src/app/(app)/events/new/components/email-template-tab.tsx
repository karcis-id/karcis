import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { EmailPreviewDialog } from "@/components/email-preview-dialog"
import { InfoBox } from "@/components/info-box"
import { Button, buttonVariants } from "@/components/ui/button"
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
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

import { EMAIL_MESSAGE_VARIABLES, EMAIL_MESSAGE_VARIABLE_EXPLANATION } from "../constants"
import { EventFormData } from "../types"

const formSchema = z.object({
  subject: z.string().trim().min(3).max(50),
  emailBody: z.string().trim().min(3).max(2000),
})

interface EmailTemplateTabProps {
  formData: EventFormData
  setFormData: Dispatch<SetStateAction<EventFormData>>
}

// TODO: support markdown for email template
const EmailTemplateTab = ({ formData, setFormData }: EmailTemplateTabProps) => {
  const router = useRouter()
  // TODO: write a decent default email body template
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      subject: formData.subject,
      emailBody: formData.emailBody,
    },
  })

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    setFormData((prev) => ({ ...prev, ...values }))
    router.push(`/events/new?stage=3`)
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardHeader>
            <CardTitle>Email template</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject heading</FormLabel>
                  <FormControl>
                    <Input
                      required
                      placeholder="e.g., Invitation: Annual conference 2023"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emailBody"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message body</FormLabel>
                  <InfoBox
                    title="Message variables:"
                    infoTitle="What are message variables?"
                    info={EMAIL_MESSAGE_VARIABLE_EXPLANATION}
                  >
                    <ul className="ml-6 list-disc [&>li]:mt-2">
                      {EMAIL_MESSAGE_VARIABLES.map((v, i) => (
                        <li key={i}>
                          <code className="bg-muted px-[0.2rem] py-[0.1rem] font-mono font-semibold rounded-sm border">
                            {`{{ ${v.name} }}`}
                          </code>
                          {`  : ${v.desc}`}
                        </li>
                      ))}
                    </ul>
                  </InfoBox>
                  <FormControl>
                    <Textarea
                      required
                      placeholder="Your email message body..."
                      className="h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <EmailPreviewDialog {...form.getValues()} />
          </CardContent>
          <CardFooter className="gap-4">
            <Link
              href="?stage=1"
              className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
            >
              Previous
            </Link>
            <Button type="submit" className="w-full">
              Next
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default EmailTemplateTab
