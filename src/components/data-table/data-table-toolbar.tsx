import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs"
import { Table } from "@tanstack/react-table"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

// TODO: once we can change row values manually, show a toast message
const toggleStatuses = async <TData,>(
  table: Table<TData>,
  router: AppRouterInstance,
) => {
  const selectedRowModels = table.getFilteredSelectedRowModel().rows
  const ids = selectedRowModels.map((rm) => table.getRow(rm.id).getValue("id"))
  const supabase = createClientComponentClient()
  // NOTE: batch updates not supported atm
  // https://github.com/supabase/postgrest-js/issues/174
  const { error } = await supabase.rpc("toggle_participants_statuses", { ids })

  if (error) {
    console.log(error)
    return
  }

  selectedRowModels.forEach((rm) => table.getRow(rm.id).toggleSelected())
  // HACK: can't seem to find a way to change the row values manually
  // so refresh the page to refetch the data
  router.refresh()
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export const DataTableToolbar = <TData,>({
  table,
}: DataTableToolbarProps<TData>) => {
  const router = useRouter()
  // TODO: use global filter here
  return (
    <div className="flex items-center justify-between">
      <Input
        placeholder="Filter string..."
        value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("email")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <Button
        variant="outline"
        onClick={async () => await toggleStatuses(table, router)}
      >
        Toggle status
      </Button>
    </div>
  )
}
