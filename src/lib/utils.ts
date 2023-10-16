import { type ClassValue, clsx } from "clsx"
import Papa from "papaparse"
import { twMerge } from "tailwind-merge"
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

// NOTE: Date constructor can take a Date object, and it will return a deep copy
export const formatDatetime = (datetime: string | Date) =>
  new Date(datetime).toLocaleString("en-uk", {
    weekday: "short", // short weekday name
    day: "2-digit", // day of the month (leading zero if single digit)
    month: "short", // abbreviated month name
    year: "numeric", // 4-digit year
    hour: "2-digit", // hours (24-hour format, leading zero if single digit)
    minute: "2-digit", // minutes (leading zero if single digit)
    hour12: false, // use 24-hour format
  })

export const formatDate = (date: string | Date) =>
  new Date(date).toLocaleString("en-uk", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

export const parseCsv: any = (file: File) => {
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
  if (headers.length !== 2 && (name.toLowerCase() !== "name" || email.toLowerCase() !== "email")) {
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
  const error = invalidRows[0][0].success ? invalidRows[0][1] : invalidRows[0][0]
  // @ts-ignore
  const message = `Error on line ${error.line} near ${error.column}: ${error.error.issues[0].message}`
  return { valid: false, message }
}

// https://postgrest.org/en/stable/references/errors.html#http-status-codes
export const postgrestToHttpCode = (code: string) => {
  switch (code) {
    case "23503":
      return 409
    case "23505":
      return 409
    case "25006":
      return 405
    case "P0001":
      return 400
    case "42883":
      return 404
    case "42P01":
      return 404
    case "42501":
      return 403
  }
  if (code.startsWith("54")) return 413
  if (code.startsWith("08") || code.startsWith("53")) return 503
  if (code.startsWith("0L") || code.startsWith("0P") || code.startsWith("28")) return 403
  if (
    code.startsWith("09") ||
    code.startsWith("25") ||
    code.startsWith("2D") ||
    code.startsWith("38") ||
    code.startsWith("39") ||
    code.startsWith("3B") ||
    code.startsWith("40") ||
    code.startsWith("55") ||
    code.startsWith("57") ||
    code.startsWith("58") ||
    code.startsWith("F0") ||
    code.startsWith("HV") ||
    code.startsWith("P0") ||
    code.startsWith("XX")
  )
    return 500
  return 400
}
