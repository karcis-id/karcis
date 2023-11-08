import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import * as jose from "jose"
import { cookies } from "next/headers"

import { Database } from "@/lib/types/supabase"

export const dynamic = "force-dynamic"

const decrypt = async (jwt: string) => {
  const { QR_SECRET } = process.env
  const secret = jose.base64url.decode(QR_SECRET as string)
  const { payload } = await jose.jwtDecrypt(jwt, secret)
  return payload.code as string
}

const isValidCode = (decoded: string) => {
  return decoded.match("karcis-\\d{4}-\\d{12}")
}

const getDecodedIds = (decoded: string) => {
  // karcis-eventId-participantId
  const split = decoded.split("-")
  return {
    eventId: parseInt(split[1]),
    participantId: parseInt(split[2]),
  }
}

// TODO: error handling & unit tests
export const POST = async (req: Request) => {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })
  const { data: encoded } = await req.json()

  if (!encoded) {
    return Response.json({ message: "Bad request" }, { status: 400 })
  }

  let decoded = ""
  try {
    decoded = await decrypt(encoded)
  } catch (e) {
    console.log(e)
    return Response.json({ message: "Error: Invalid QR code" }, { status: 400 })
  }

  if (!isValidCode(decoded)) {
    return Response.json({ message: "Error: Invalid QR code" }, { status: 400 })
  }

  const { participantId } = getDecodedIds(decoded)

  const { data: participant, error } = await supabase
    .from("participants")
    .select()
    .eq("participant_id", participantId)
    .single()

  if (error) {
    console.log(error)
    return Response.json({ message: error.message }, { status: 400 })
  }

  if (!participant.is_checked_in) {
    const { error } = await supabase.rpc("toggle_participants_statuses", {
      ids: [participant.participant_id],
    })
    if (error) {
      console.log(error)
      return Response.json({ message: error.message }, { status: 400 })
    }
  }

  return Response.json({ message: "Check in success", data: participant }, { status: 200 })
}
