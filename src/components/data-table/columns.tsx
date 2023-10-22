"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
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
  status: boolean
}

export const columns: ColumnDef<Participant>[] = [
  {
    id: "select",
    header: ({ table }) => (
      // align-middle to stop the checkbox flickering when toggled
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="align-middle"
      />
    ),
    cell: ({ row }) => (
      <div>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="align-middle"
        />
      </div>
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
    accessorKey: "status",
    header: "Status",
    cell: (info) => (
      <Badge
        variant="secondary"
        className={cn(
          info.getValue()
            ? "bg-green-200 hover:bg-green-200/80 dark:bg-green-300 dark:brightness-90 dark:text-background"
            : "bg-red-200 hover:bg-red-200/80 dark:bg-red-300 dark:brightness-90 dark:text-background",
        )}
      >
        {info.getValue() ? "Present" : "Absent"}
      </Badge>
    ),
  },
]
