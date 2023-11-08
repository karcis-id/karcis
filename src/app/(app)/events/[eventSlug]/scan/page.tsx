"use client"

import { useState } from "react"
import { useZxing } from "react-zxing"

import { Participant } from "@/components/data-table"
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

interface ScanResult {
  ok: boolean
  message: string
  data?: Participant
}

const decodeQr = async (qrText: string) => {
  const res = await fetch("/api/events/scan", {
    method: "POST",
    body: JSON.stringify({ data: qrText }),
  })
  const ok = res.ok
  const { message, data } = await res.json()
  return { ok, message, data }
}

const EventScan = () => {
  const [result, setResult] = useState<ScanResult>()
  const [isPaused, setIsPaused] = useState(false)
  const { ref } = useZxing({
    onDecodeResult: async (result) => {
      setIsPaused(true)
      const res = await decodeQr(result.getText())
      setResult(res)
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
        {/* TODO: loading state */}
        {result && (
          <DialogContent
            className={
              result.ok
                ? ""
                : "destructive border-destructive bg-destructive text-destructive-foreground"
            }
          >
            <DialogHeader>
              <DialogTitle>
                {result.ok ? "Check in successful" : "Uh oh! Something went wrong"}
              </DialogTitle>
            </DialogHeader>
            {!result.data && result.message}
            {result.data && (
              <>
                <p>Participant details:</p>
                <ul className="list-disc list-inside [&>li]:ml-4">
                  <li>Name: {result.data.name}</li>
                  <li>Email: {result.data.email}</li>
                </ul>
              </>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={result.ok ? "default" : "secondary"}>Ok</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}

export default EventScan
