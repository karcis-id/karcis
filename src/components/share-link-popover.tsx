"use client"

import { ClipboardIcon, Link2Icon } from "@radix-ui/react-icons"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { CardDescription, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Database } from "@/lib/types/supabase"

import { useToast } from "./ui/use-toast"

type ShareToken = Database["public"]["Tables"]["share_tokens"]["Row"]

interface ShareLinkPopoverProps {
  eventId: number
}

const isTokenExpired = (token: ShareToken) => {
  const millisecondsInOneHour = 3600000
  const expireAt = new Date(token.created_at).getTime() + millisecondsInOneHour
  return new Date(expireAt) < new Date()
}

const getShareToken = async (eventId: number) => {
  const supabase = createClientComponentClient<Database>()
  const { data, error } = await supabase
    .from("share_tokens")
    .select()
    .eq("event_id", eventId)
    .order("created_at", { ascending: false })

  if (error) {
    console.log(error)
    return undefined
  }

  const token = data[0]
  if (token && token.is_active && !isTokenExpired(token)) return token

  // if no active/non-expired tokens, create a new one
  const { data: newToken, error: error2 } = await supabase
    .from("share_tokens")
    .insert({ event_id: eventId })
    .select()
    .single()

  if (error2) {
    console.log(error2)
    return undefined
  }

  return newToken
}

const formatShareUrl = (token: ShareToken) => {
  if (!token) return ""
  // remove the /dashboard
  const url = window.location.href.split("/dashboard")[0]
  return `${url}/scan?scanToken=${token.token_id}`
}

// TODO: add loading state
const ShareLinkPopover = ({ eventId }: ShareLinkPopoverProps) => {
  const [token, setToken] = useState<ShareToken>()
  const { toast } = useToast()

  const handleOnOpenAutoFocus = async () => {
    const shareToken = await getShareToken(eventId)
    setToken(shareToken)
  }

  const handleClick = async () => {
    if (!token) return
    await navigator.clipboard.writeText(formatShareUrl(token))
    await toast({ title: "Link copied" })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <Link2Icon className="mr-2 h-4 w-4" />
          Share scanner link
        </Button>
      </PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={handleOnOpenAutoFocus}
        align="end"
        className="w-[24rem] space-y-2"
      >
        <CardTitle>Share scanner link</CardTitle>
        <CardDescription>
          Anyone with the link can scan QR codes on your behalf. Each link expires in 1 hour.
        </CardDescription>
        <div className="flex gap-2">
          <Input value={(token && formatShareUrl(token)) ?? ""} readOnly />
          <Button variant="secondary" className="shrink-0" onClick={handleClick}>
            <ClipboardIcon className="mr-2 h-4 w-4" />
            Copy link
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ShareLinkPopover
