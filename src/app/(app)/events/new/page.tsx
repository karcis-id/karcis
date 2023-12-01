import { Suspense } from "react"

import { Separator } from "@/components/ui/separator"

import Steps, { StepsFallback } from "./components/steps"

const CreateEvent = () => {
  return (
    <div className="space-y-4">
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">Create event</h1>
      <Separator />
      <Suspense fallback={<StepsFallback />}>
        <Steps />
      </Suspense>
    </div>
  )
}

export default CreateEvent
