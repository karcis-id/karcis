import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import * as z from "zod"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
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
import { cn, isValidCsv, parseCsv } from "@/lib/utils"
import { InfoBox } from "@/components/info-box"

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

const sampleDataHeaders = ["Name", "Email"]
const sampleData = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
  },
  {
    name: "Luke Smith",
    email: "luke.smith@example.com",
  },
  {
    name: "Bard Altman",
    email: "bard.altman@example.com",
  },
]

const UploadSpreadsheetTab = ({ setFormData }: any) => {
  const router = useRouter()
  // TODO: write a decent default email body template
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    // @ts-ignore
    const {
      data,
      errors,
      meta: { fields },
    } = await parseCsv(values.file)

    if (errors.length > 0) {
      const e = errors[0]
      const message = `Error${e.row ? " on line " + e.row : ""}: ${e.message}`
      form.setError("file", { type: "manual", message })
      return
    }

    const checked = isValidCsv(data, fields)
    if (!checked.valid) {
      form.setError("file", { type: "manual", message: checked.message })
      return
    }

    // @ts-ignore
    setFormData((prev) => ({ ...prev, data }))
    router.push(`/events/new?stage=4`)
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardHeader>
            <CardTitle>Upload parcitipants spreadsheet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <InfoBox
              infoTitle="What should my data look like?"
              info="description"
              title="Spreadsheet data format guidelines"
            >
              <Table className="border rounded text-xs">
                <TableHeader>
                  <TableRow className="bg-muted hover:bg-muted">
                    {sampleDataHeaders.map((header, i) => (
                      <TableHead key={i} className="h-8">
                        {header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleData.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </InfoBox>
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
