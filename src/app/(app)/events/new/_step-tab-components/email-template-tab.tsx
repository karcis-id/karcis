import Link from "next/link"
import Image from "next/image"
import { InfoCircledIcon, EyeOpenIcon } from "@radix-ui/react-icons"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" type="button">
                <EyeOpenIcon className="mr-2 h-4 w-4" />
                Preview template
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Email template preview</DialogTitle>
                <DialogDescription>
                  Subject heading: Your E-ticket for PKPM 2023
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2 bg-slate-50 border rounded p-2">
                <p>
                  Dear &nbsp;
                  <code className="bg-muted px-[0.2rem] py-[0.1rem] font-mono font-semibold rounded-sm border text-sm">
                    {"{{ name }}"}
                  </code>
                  ,
                </p>
                <p>
                  We&apos;re excited to have you join us at PKPM 2023! Here are
                  the key details:
                </p>
                <ul className="ml-6 list-disc">
                  <li>
                    <span className="font-medium">Location:&nbsp;</span>Kampus
                    Binus Kemanggisan
                  </li>
                  <li>
                    <span className="font-medium">Date:&nbsp;</span>Tuesday, 10
                    Oct 2023
                  </li>
                  <li>
                    <span className="font-medium">Time:&nbsp;</span>08:00 WIB
                  </li>
                </ul>
                <p>
                  Please arrive a bit early with this QR code for a smooth
                  check-in.
                </p>
                <div className="h-48 w-48 relative border rounded ml-6">
                  <Image src="/sample-qr.png" alt="sample qr code" fill />
                </div>
                <p>Any questions? Contact us at support@pkpm2023.com</p>
                <p>See you there!</p>
                <p>
                  Best regards,
                  <br />
                  Michelle W.
                </p>
              </div>
            </DialogContent>
          </Dialog>
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
