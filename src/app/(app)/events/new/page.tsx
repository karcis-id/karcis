"use client"
import { NextPage } from "next"
import { useRouter, useSearchParams } from "next/navigation"

import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EventDetailsTab from "./_step-tab-components/event-details-tab"
import EmailTemplateTab from "./_step-tab-components/email-template-tab"
import UploadSpreadsheetTab from "./_step-tab-components/upload-spreadsheet-tab"
import ReviewCheckoutTab from "./_step-tab-components/review-checkout-tab"

const CreateEvent: NextPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const stage = searchParams.get("stage") || "1"

  // TODO: handle stages using url query params
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Create event
        </h1>
        <p className="text-muted-foreground">Helpful description here...</p>
      </div>
      <Separator />
      <div>
        <Tabs
          defaultValue="1"
          value={stage}
          onValueChange={(stage) => router.push(`/events/new?stage=${stage}`)}
          className="w-full md:max-w-lg space-y-4"
        >
          <TabsList className="w-full grid grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <TabsTrigger key={i} value={i.toString()}>
                Step {i}
              </TabsTrigger>
            ))}
          </TabsList>
          {/* TODO: use shadcn's form & zod */}
          <form>
            <TabsContent value="1">
              <EventDetailsTab />
            </TabsContent>
            <TabsContent value="2">
              <EmailTemplateTab />
            </TabsContent>
            <TabsContent value="3">
              <UploadSpreadsheetTab />
            </TabsContent>
            <TabsContent value="4">
              <ReviewCheckoutTab />
            </TabsContent>
          </form>
        </Tabs>
      </div>
    </div>
  )
}

export default CreateEvent
