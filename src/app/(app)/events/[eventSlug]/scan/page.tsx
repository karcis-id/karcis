"use client"

import { useState } from "react"
import { useZxing } from "react-zxing"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

const EventScan = ({ params }: { params: { eventSlug: string } }) => {
  const [isPaused, setIsPaused] = useState(false)
  const [result, setResult] = useState("")
  const { ref } = useZxing({
    onDecodeResult: (result) => {
      setIsPaused(true)
      setResult(result.getText())
      // TODO: qr code handling here
    },
    timeBetweenDecodingAttempts: 300,
    paused: isPaused,
  })

  // TODO: handle empty state (can't access camera)
  return (
    <div className="space-y-4">
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">Scan QR code</h1>
      <Separator />
      <video ref={ref} />
      <Dialog open={isPaused} onOpenChange={setIsPaused}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan success</DialogTitle>
          </DialogHeader>
          scanned: <a href={result}>{result}</a>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Ok</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EventScan
