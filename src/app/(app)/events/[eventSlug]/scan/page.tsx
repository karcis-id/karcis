"use client"
import { useEffect, useState } from "react"
import { useZxing } from "react-zxing"

import { Separator } from "@/components/ui/separator"

const EventScan = ({ params }: { params: { eventSlug: string } }) => {
  const [fuck, setFuck] = useState("")
  const { ref } = useZxing({
    onDecodeResult(result) {
      // alert(res)
      setFuck(result.getText())
    },
    constraints: { video: { width: 1280, height: 720 } },
  })
  // const vidRef = useRef()
  // const getVideo = async () => {
  //   const stream = await navigator.mediaDevices.getUserMedia({
  //     video: { width: 1920, height: 1080 }
  //   })
  //   let video = vidRef.current
  //   video.srcObject = stream
  //   video.play()
  // }
  //
  // useEffect(() => {
  //   getVideo()
  // }, [vidRef])

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Scan QR code
        </h1>
        <p className="text-muted-foreground">Helpful description here...</p>
      </div>
      <Separator />
      <div>
        content goes here
        {fuck}
        <video ref={ref} className="w-96 h-96" />
      </div>
    </div>
  )
}

export default EventScan
