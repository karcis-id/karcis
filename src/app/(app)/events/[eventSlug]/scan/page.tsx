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

const decodeQr = async (qrText: string) => {
  const res = await fetch("/api/events/scan", {
    method: "POST",
    body: JSON.stringify({ data: qrText }),
  })
  const { participant }: { participant: Participant } = await res.json()
  return participant
}

const EventScan = () => {
  const [participant, setParticipant] = useState<Participant>()
  const [isPaused, setIsPaused] = useState(false)
  const { ref } = useZxing({
    onDecodeResult: async (result) => {
      setIsPaused(true)
      const participant = await decodeQr(result.getText())
      setParticipant(participant)
      console.log(participant)
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
          {participant && (
            <>
              <p>Participant details:</p>
              <ul className="list-disc list-inside [&>li]:ml-4">
                <li>Name: {participant.name}</li>
                <li>Email: {participant.email}</li>
              </ul>
            </>
          )}
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
