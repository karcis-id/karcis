import Image from "next/image"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const PostCheckoutTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order confirmed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative h-48 -ml-2">
          <Image src="/success.svg" alt="paper airplane" fill />
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold">Thank you for your order!</p>
          <p>
            {
              "We'll notify you as soon as your payment is confirmed. Once it's confirmed, you can access the dashboard in the event page."
            }
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/events" className={cn(buttonVariants(), "w-full")}>
          Back to all events
        </Link>
      </CardFooter>
    </Card>
  )
}

export default PostCheckoutTab
