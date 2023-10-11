import { ColumnDef } from "@tanstack/react-table"

export enum ParticipantStatus {
  Present = "Present",
  Absent = "Absent",
}

export type Participant = {
  id: number
  name: string
  email: string
  phone: string
  status: ParticipantStatus
}

export const columns: ColumnDef<Participant>[] = [
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
  },
]
