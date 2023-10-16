import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { InfoBox } from "@/components/info-box"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
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

import {
  DATA_FORMAT_EXPLANATION,
  SAMPLE_CSV_DATA,
  MAX_FILE_SIZE,
  ACCEPTED_FILE_TYPES,
} from "../constants"
import { EventFormData } from "../types"

const formSchema = z.object({
  file: z
    .any()
    .refine((file) => file?.size > 0, { message: "File cannot be empty" })
    .refine((file) => file?.size < MAX_FILE_SIZE, {
      message: "Max file size is 2 GB",
    })
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file?.type), {
      message: "Only *.csv files are accepted",
    }),
})

interface UploadSpreadsheetTabProps {
  setFormData: Dispatch<SetStateAction<EventFormData>>
}

const UploadSpreadsheetTab = ({ setFormData }: UploadSpreadsheetTabProps) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
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
              title="Spreadsheet data format guidelines"
              infoTitle="What should my data look like?"
              info={DATA_FORMAT_EXPLANATION}
            >
              <Table className="border rounded text-xs">
                <TableHeader>
                  <TableRow className="bg-muted hover:bg-muted">
                    {SAMPLE_CSV_DATA.headers.map((header, i) => (
                      <TableHead key={i} className="h-8">
                        {header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {SAMPLE_CSV_DATA.data.map((row, i) => (
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
                      onChange={(e) => onChange(e.target.files && e.target.files[0])}
                    />
                  </FormControl>
                  <FormDescription>Only *.csv files accepted</FormDescription>
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
