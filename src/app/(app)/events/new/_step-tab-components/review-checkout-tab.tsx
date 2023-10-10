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
          {/* TODO: export this to a reusable component */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" type="button">
                <EyeOpenIcon className="mr-2 h-4 w-4" />
                Preview template
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Email template preview</DialogTitle>
                <DialogDescription>
                  Subject heading: Your E-ticket for PKPM 2023
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2 bg-slate-50 border rounded p-2">
                <p>
                  Dear &nbsp;
                  <code className="bg-muted px-[0.2rem] py-[0.1rem] font-mono font-semibold rounded-sm border text-sm">
                    {"{{ name }}"}
                  </code>
                  ,
                </p>
                <p>
                  We&apos;re excited to have you join us at PKPM 2023! Here are
                  the key details:
                </p>
                <ul className="ml-6 list-disc">
                  <li>
                    <span className="font-medium">Location:&nbsp;</span>Kampus
                    Binus Kemanggisan
                  </li>
                  <li>
                    <span className="font-medium">Date:&nbsp;</span>Tuesday, 10
                    Oct 2023
                  </li>
                  <li>
                    <span className="font-medium">Time:&nbsp;</span>08:00 WIB
                  </li>
                </ul>
                <p>
                  Please arrive a bit early with this QR code for a smooth
                  check-in.
                </p>
                <div className="h-48 w-48 relative border rounded ml-6">
                  <Image src="/sample-qr.png" alt="sample qr code" fill />
                </div>
                <p>Any questions? Contact us at support@pkpm2023.com</p>
                <p>See you there!</p>
                <p>
                  Best regards,
                  <br />
                  Michelle W.
                </p>
              </div>
            </DialogContent>
          </Dialog>
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
