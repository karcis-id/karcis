import Link from "next/link"

import { EmailPreviewDialog } from "@/components/email-preview-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn, formatDate } from "@/lib/utils"

import { DEFAULT_PRICE } from "../constants"
import { EventFormData } from "../types"

interface ReviewCheckoutTabProps {
  formData: EventFormData
}

const ReviewCheckoutTab = ({ formData }: ReviewCheckoutTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Review and checkout</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="space-y-2">
          <p className="font-semibold">Event details:</p>
          <ul className="ml-6 list-disc">
            <li>
              <span className="font-semibold">Event name:&nbsp;</span>
              {formData.name ?? "-"}
            </li>
            <li>
              <span className="font-semibold">Location:&nbsp;</span>
              {formData.location ?? "-"}
            </li>
            <li>
              <span className="font-semibold">Date:&nbsp;</span>
              {formData.date ? formatDate(formData.date) : "-"}
            </li>
            <li>
              <span className="font-semibold">Time:&nbsp;</span>
              {formData.time ?? "-"}
            </li>
            <li>
              <span className="font-semibold">Total participants:&nbsp;</span>
              {formData.data.length ?? "-"}
            </li>
          </ul>
        </div>
        <Separator />
        <div className="space-y-2">
          <p className="font-semibold">Email template:</p>
          <EmailPreviewDialog subject={formData.subject} emailBody={formData.emailBody} />
        </div>
        <Separator />
        <div className="space-y-2">
          <p className="font-semibold">Payment details:</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="h-8">Description</TableHead>
                <TableHead className="h-8 text-right">Qty</TableHead>
                <TableHead className="h-8 text-right">Unit Price</TableHead>
                <TableHead className="h-8 text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Service fee</TableCell>
                <TableCell className="text-right">
                  {formData.data.length.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">Rp {DEFAULT_PRICE.toLocaleString()}</TableCell>
                <TableCell className="text-right font-semibold">
                  Rp {(formData.data.length * DEFAULT_PRICE).toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {/* TODO: integrate payment gateway (stripe/xendit) */}
      <CardFooter className="gap-4">
        <Link href="?stage=3" className={cn(buttonVariants({ variant: "secondary" }), "w-full")}>
          Previous
        </Link>
        <Button type="submit" className="w-full">
          Confirm payment
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ReviewCheckoutTab
