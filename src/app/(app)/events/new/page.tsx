"use client"
import { NextPage } from "next"
import { useRouter, useSearchParams } from "next/navigation"

import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EventDetailsTab from "./components/event-details-tab"
import EmailTemplateTab from "./components/email-template-tab"
import UploadSpreadsheetTab from "./components/upload-spreadsheet-tab"
import ReviewCheckoutTab from "./components/review-checkout-tab"
import { useState } from "react"

const CreateEvent: NextPage = () => {
  // TODO: sync this state with the url so that data persists if page is refreshed
  const [formData, setFormData] = useState({})
  const router = useRouter()
  const searchParams = useSearchParams()
  const stage = searchParams.get("stage") || "1"

  return (
    <div className="space-y-4">
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Create event
      </h1>
      <Separator />
      <Tabs
        defaultValue="1"
        value={stage}
        onValueChange={(stage) => router.push(`/events/new?stage=${stage}`)}
        className="w-full md:max-w-lg space-y-4"
      >
        <TabsList className="w-full grid grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
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
          <UploadSpreadsheetTab formData={formData} setFormData={setFormData} />
        </TabsContent>
        <TabsContent value="4">
          <ReviewCheckoutTab formData={formData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CreateEvent
