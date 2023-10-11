"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "../ui/badge"
import { cn } from "@/lib/utils"

// BUG: can't import to server component for some reason
// export enum ParticipantStatus {
//   Present = "Present",
//   Absent = "Absent",
// }

export type Participant = {
  id: number
  name: string
  email: string
  phone: string
  status: string
}

export const columns: ColumnDef<Participant>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone number",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => (
      <Badge
        variant="secondary"
        className={cn(
          info.getValue() === "Present"
            ? "bg-green-200 hover:bg-green-200"
            : "bg-red-200 hover:bg-red-200",
        )}
      >
        {info.getValue() as string}
      </Badge>
    ),
  },
]
