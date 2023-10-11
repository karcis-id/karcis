import Link from "next/link"
import { InfoCircledIcon } from "@radix-ui/react-icons"

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { EmailPreviewDialog } from "@/components/email-preview-dialog"

// TODO: come up with full list of message variables
const messageVariables = [
  { name: "email", desc: "the participant's email address" },
  { name: "name", desc: "the participant's name" },
]

const EmailTemplateTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email template</CardTitle>
        <CardDescription>Descriptions are always helpful</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject heading</Label>
          <Input id="subject" placeholder="John's birthday invitation ticket" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="template">Message body</Label>
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
                <p className="font-medium">What are message variables?</p>
                <p>Clear explanation here...</p>
              </PopoverContent>
            </Popover>
            <ul className="ml-6 list-disc [&>li]:mt-2 text-sm text-sm">
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
          <div>
            <Textarea
              id="template"
              placeholder="Your email message body..."
              className="h-24 inline-block mt-1"
            />
          </div>
          <EmailPreviewDialog />
        </div>
      </CardContent>
      <CardFooter className="gap-4">
        <Link
          href="?stage=1"
          className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
        >
          Previous
        </Link>
        <Link href="?stage=3" className={cn(buttonVariants(), "w-full")}>
          Next
        </Link>
      </CardFooter>
    </Card>
  )
}

export default EmailTemplateTab
