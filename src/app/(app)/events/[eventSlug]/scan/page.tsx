"use client"

import { useEffect, useState } from "react"
import { QrReader } from "react-qr-reader"

import { Separator } from "@/components/ui/separator"

const EventScan = ({ params }: { params: { eventSlug: string } }) => {
  const [result, setResult] = useState("")

  return (
    <div className="space-y-4">
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">Scan QR code</h1>
      <Separator />
      <div>
        content goes here
        {result}
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setResult(result.getText())
            }

            if (!!error) {
              console.info(error)
            }
          }}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  )
}

export default EventScan
