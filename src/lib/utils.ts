import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Papa from "papaparse"
import { z } from "zod"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const formatSlug = (eventId: number, eventName: string) => {
  const safeName = eventName
    .toLowerCase()
    .replaceAll(/[^\w\d\s-]/g, "")
    .replaceAll(/\s+/g, "-")
  return `e${eventId}-${safeName}`
}

export const parseCsv = (file: File) => {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => resolve(res),
    })
  })
}

// TODO: unit tests
export const isValidCsv = (data: any[], headers: string[]) => {
  if (data.length === 0) {
    return { valid: false, message: "File should contain atleast 1 record" }
  }

  const [name, email] = headers
  if (
    headers.length !== 2 &&
    (name.toLowerCase() !== "name" || email.toLowerCase() !== "email")
  ) {
    return { valid: false, message: "Incorrect file headers" }
  }

  const nameSchema = z.string().trim().min(3).max(50)
  const emailSchema = z.string().email()
  const invalidRows = data
    .slice(1)
    .map(({ name, email }, i) => [
      { column: name, line: i + 1, ...nameSchema.safeParse(name) },
      { column: email, line: i + 1, ...emailSchema.safeParse(email) },
    ])
    .filter(([name, email]) => !name.success || !email.success)

  if (invalidRows.length === 0) return { valid: true, message: "" }

  // return only the first row with error even if there are multiple
  const error = invalidRows[0][0].success
    ? invalidRows[0][1]
    : invalidRows[0][0]
  // @ts-ignore
  const message = `Error on line ${error.line} near ${error.column}: ${error.error.issues[0].message}`
  return { valid: false, message }
}
