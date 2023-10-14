import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import * as z from "zod"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

const MAX_SIZE = 1024 * 1024 * 2000 // 2 GB
const ACCEPTED_FILE_TYPES = ["text/csv"]

// TODO: csv file validation (along with contents)
const formSchema = z.object({
  file: z
    .any()
    .refine((file) => file?.size > 0, { message: "File cannot be empty" })
    .refine((file) => file?.size < MAX_SIZE, {
      message: "Max file size is 2 GB",
    })
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file?.type), {
      message: "Only *.csv files are accepted",
    }),
})

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

const UploadSpreadsheetTab = ({ formData, setFormData }: any) => {
  const router = useRouter()
  // TODO: write a decent default email body template
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      file: formData.file ?? null,
    },
  })

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // @ts-ignore
    setFormData((prev) => ({ ...prev, ...values }))
    router.push(`/events/new?stage=4`)
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardHeader>
            <CardTitle>Upload parcitipants spreadsheet</CardTitle>
            <CardDescription>Descriptions are always helpful</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-2 border border-l-4 rounded space-y-4">
              <p className="text-sm font-medium leading-none">
                Spreadsheet data format guidelines
              </p>
              <Table className="border rounded text-xs">
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
            <FormField
              control={form.control}
              name="file"
              render={({ field: { value, onChange, ...props } }) => (
                <FormItem>
                  <FormLabel>Upload file</FormLabel>
                  <FormControl>
                    <Input
                      {...props}
                      required
                      type="file"
                      accept="text/csv"
                      className="hover:cursor-pointer"
                      onChange={(e) =>
                        onChange(e.target.files && e.target.files[0])
                      }
                    />
                  </FormControl>
                  {/* TODO: dynamically render this with row count of uploaded file */}
                  <FormDescription>Total participants: 450</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="gap-4">
            <Link
              href="?stage=2"
              className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
            >
              Previous
            </Link>
            <Button type="submit" className="w-full">
              Next
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default UploadSpreadsheetTab
