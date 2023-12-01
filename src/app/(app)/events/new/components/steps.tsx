"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventFormData } from "@/lib/types/events"

import { DEFAULT_EMAIL_SUBJECT, DEFAULT_EMAIL_TEMPLATE } from "../constants"
import EmailTemplateTab from "./email-template-tab"
import EventDetailsTab from "./event-details-tab"
import PostCheckoutTab from "./post-checkout"
import ReviewCheckoutTab from "./review-checkout-tab"
import UploadSpreadsheetTab from "./upload-spreadsheet-tab"

export const StepsFallback = () => {
  return <>steps placeholder...</>
}

// https://nextjs.org/docs/messages/deopted-into-client-rendering
const Steps = () => {
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
  )
}

export default Steps
