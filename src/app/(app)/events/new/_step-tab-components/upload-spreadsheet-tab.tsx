import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { TableIcon } from "@radix-ui/react-icons"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const sampleDataHeaders = ["Name", "Email", "Phone"]
const sampleData = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123456789",
  },
  {
    name: "Luke Smith",
    email: "luke.smith@example.com",
    phone: "123456789",
  },
  {
    name: "Bard Altman",
    email: "bard.altman@example.com",
    phone: "123456789",
  },
]

const UploadSpreadsheetTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload parcitipants spreadsheet</CardTitle>
        <CardDescription>Descriptions are always helpful</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-2 border border-l-4 rounded space-y-4">
          <p className="text-sm font-medium leading-none">
            Spreadsheet data format guidelines
          </p>
          <Table className="border rounded text-sm">
            <TableHeader>
              <TableRow className="bg-muted hover:bg-muted">
                {sampleDataHeaders.map((header, i) => (
                  <TableHead key={i}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="space-y-2">
          <Label htmlFor="spreadsheet">Upload file</Label>
          <Input
            id="spreadsheet"
            type="file"
            className="hover:cursor-pointer"
          />
          {/* TODO: dynamically render this with row count of uploaded file */}
          <p className="text-sm text-muted-foreground">
            Total participants: 450
          </p>
        </div>
      </CardContent>
      <CardFooter className="gap-4">
        <Link
          href="?stage=2"
          className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
        >
          Previous
        </Link>
        <Link href="?stage=4" className={cn(buttonVariants(), "w-full")}>
          Next
        </Link>
      </CardFooter>
    </Card>
  )
}

export default UploadSpreadsheetTab
