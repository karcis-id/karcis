"use client"

import { ClipboardIcon, Link2Icon, ReloadIcon } from "@radix-ui/react-icons"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { CardDescription, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"
import { Database } from "@/lib/types/supabase"
import { isTokenExpired, setExpireToken } from "@/lib/utils"

// TODO: move db type aliases to separate file
export type ShareToken = Database["public"]["Tables"]["share_tokens"]["Row"]

interface ShareLinkPopoverProps {
  eventId: number
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

  // if token is active but expired, update db value
  if (token && token.is_active) setExpireToken(supabase, token)

  // if no active/non-expired tokens, create a new one
  const { data: newToken, error: error3 } = await supabase
    .from("share_tokens")
    .insert({ event_id: eventId })
    .select()
    .single()

  if (error3) {
    console.log(error3)
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
        {token ? (
          <>
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
          </>
        ) : (
          <div className="mx-auto flex gap-2 items-center">
            <ReloadIcon className="h-4 w-4 animate-spin" />
            Generating link...
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default ShareLinkPopover
