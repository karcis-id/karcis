import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { EyeOpenIcon } from "@radix-ui/react-icons"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EmailPreviewDialog } from "@/components/email-preview-dialog"

const ReviewCheckoutTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Review and checkout</CardTitle>
        <CardDescription>Descriptions are always helpful</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="font-semibold">Event details:</p>
          <ul className="my-6 ml-6 list-disc text-sm">
            <li>
              <span className="font-medium">Event name:&nbsp;</span>PKPM 2023
            </li>
            <li>
              <span className="font-medium">Event description:&nbsp;</span>
              Short description of PKPM 2023 which may span multiple lines
            </li>
            <li>
              <span className="font-medium">Location:&nbsp;</span>Kampus Binus
              Kemanggisan
            </li>
            <li>
              <span className="font-medium">Date:&nbsp;</span>Tuesday, 10 Oct
              2023
            </li>
            <li>
              <span className="font-medium">Time:&nbsp;</span>08:00 WIB
            </li>
          </ul>
        </div>
        <Separator />
        <div className="space-y-2">
          <p className="font-semibold">Email template:</p>
          <EmailPreviewDialog />
        </div>
        <Separator />
        <div className="space-y-2">
          <p className="font-semibold">Payment details:</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Service fee</TableCell>
                <TableCell className="text-right">x450</TableCell>
                <TableCell className="text-right">Rp5,000</TableCell>
                <TableCell className="text-right">Rp2,250,000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {/* TODO: integrate payment gateway (stripe/xendit) */}
      <CardFooter>
        <Button type="submit" className="w-full">
          Confirm payment
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ReviewCheckoutTab
