"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventFormData } from "@/lib/types/events"

import EmailTemplateTab from "./components/email-template-tab"
import EventDetailsTab from "./components/event-details-tab"
import PostCheckoutTab from "./components/post-checkout"
import ReviewCheckoutTab from "./components/review-checkout-tab"
import UploadSpreadsheetTab from "./components/upload-spreadsheet-tab"
import { DEFAULT_EMAIL_SUBJECT, DEFAULT_EMAIL_TEMPLATE } from "./constants"

const CreateEvent = () => {
  // TODO: sync this state with the url so that data persists if page is refreshed
  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    location: "",
    date: undefined,
    time: "",
    subject: DEFAULT_EMAIL_SUBJECT,
    emailBody: DEFAULT_EMAIL_TEMPLATE,
    data: [],
  })
  const router = useRouter()
  const searchParams = useSearchParams()
  const stage = searchParams.get("stage") || "1"

  return (
    <div className="space-y-4">
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">Create event</h1>
      <Separator />
      <Tabs
        defaultValue="1"
        value={stage}
        onValueChange={(stage) => router.push(`/events/new?stage=${stage}`)}
        className="w-full md:max-w-lg space-y-4"
      >
        <TabsList className="w-full grid grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <TabsTrigger disabled key={i} value={i.toString()}>
              Step {i}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="1">
          <EventDetailsTab formData={formData} setFormData={setFormData} />
        </TabsContent>
        <TabsContent value="2">
          <EmailTemplateTab formData={formData} setFormData={setFormData} />
        </TabsContent>
        <TabsContent value="3">
          <UploadSpreadsheetTab setFormData={setFormData} />
        </TabsContent>
        <TabsContent value="4">
          <ReviewCheckoutTab formData={formData} />
        </TabsContent>
        <TabsContent value="5">
          <PostCheckoutTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CreateEvent
