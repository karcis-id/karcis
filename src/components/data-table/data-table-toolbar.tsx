import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export const DataTableToolbar = <TData,>({
  table,
}: DataTableToolbarProps<TData>) => {
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
        onClick={() => console.log(table.getFilteredSelectedRowModel().rows)}
      >
        Toggle status
      </Button>
    </div>
  )
}
