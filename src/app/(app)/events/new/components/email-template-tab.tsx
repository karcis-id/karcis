import Link from "next/link"
import { InfoCircledIcon } from "@radix-ui/react-icons"
import * as z from "zod"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { EmailPreviewDialog } from "@/components/email-preview-dialog"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  subject: z.string().trim().min(3).max(50),
  emailBody: z.string().trim().min(3).max(2000),
})

const messageVariables = [
  { name: "email", desc: "The participant's email address" },
  { name: "name", desc: "The participant's name" },
]

// TODO: make types for these props for all of the form step components
const EmailTemplateTab = ({ formData, setFormData }: any) => {
  const router = useRouter()
  // TODO: write a decent default email body template
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      subject: formData.subject ?? "",
      emailBody: formData.emailBody ?? "",
    },
  })

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // @ts-ignore
    setFormData((prev) => ({ ...prev, ...values }))
    router.push(`/events/new?stage=3`)
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardHeader>
            <CardTitle>Email template</CardTitle>
            <CardDescription>Descriptions are always helpful</CardDescription>
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
                  <div className="space-y-2">
                    <div className="p-2 border border-l-4 rounded relative">
                      <p className="text-sm font-medium leading-none">
                        Message variables:
                      </p>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6"
                          >
                            <InfoCircledIcon className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        {/* TODO: update explanation popover */}
                        <PopoverContent
                          side="right"
                          align="start"
                          className="text-sm space-y-2"
                        >
                          <p className="font-medium">
                            What are message variables?
                          </p>
                          <p>Clear explanation here...</p>
                        </PopoverContent>
                      </Popover>
                      <ul className="ml-6 list-disc [&>li]:mt-2 text-xs">
                        {messageVariables.map((v, i) => (
                          <li key={i}>
                            <code className="bg-muted px-[0.2rem] py-[0.1rem] font-mono font-semibold rounded-sm border">
                              {`{{ ${v.name} }}`}
                            </code>
                            {`  : ${v.desc}`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
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
            <EmailPreviewDialog />
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
