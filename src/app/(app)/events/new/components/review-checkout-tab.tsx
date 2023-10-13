import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EmailPreviewDialog } from "@/components/email-preview-dialog"
import { cn } from "@/lib/utils"
import Link from "next/link"

const ReviewCheckoutTab = ({ formData }: any) => {
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
              <span className="font-semibold">Event name:&nbsp;</span>
              {formData.name ?? "-"}
            </li>
            <li>
              <span className="font-semibold">Location:&nbsp;</span>
              {formData.location ?? "-"}
            </li>
            <li>
              <span className="font-semibold">Date:&nbsp;</span>
              {formData.date?.toLocaleString() ?? "-"}
            </li>
            <li>
              <span className="font-semibold">Time:&nbsp;</span>
              {formData.time ?? "-"}
            </li>
          </ul>
        </div>
        <Separator />
        <div className="space-y-2">
          <p className="font-semibold">Email template:</p>
          {/* TODO: generate email preview dynamically */}
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
                <TableCell className="text-right font-semibold">
                  Rp2,250,000
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {/* TODO: integrate payment gateway (stripe/xendit) */}
      <CardFooter className="gap-4">
        <Link
          href="?stage=3"
          className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
        >
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
