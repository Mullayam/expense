/* eslint-disable @typescript-eslint/no-explicit-any */
import { addDays } from "date-fns"
import * as React from "react"
import moment from 'moment'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown, Loader2, MoreHorizontal } from "lucide-react"
import { sentenceCase } from "change-case"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useQueries, useQueryClient } from "@tanstack/react-query"
import { apiHandlers } from "@/lib/api/instance"
import { DateRangeFilter } from "./dateRangeFilter"
import { DateRange } from "react-day-picker"




interface InputData {
  id: string;
  created_at: string;
  updated_at: string;
  amount: string;
  description: string;
  type: string;
  category: Category;
}

interface Category {
  name: string;
}
const columns: ColumnDef<InputData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <Badge className="capitalize" variant={row.original.type === "income" ? "success" : "destructive"}>{row.getValue("type")}</Badge>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "category.name",
    header: () => <div className="text-right">Category</div>,
    cell: ({ row }) => <div className="text-right ">{row.original.category.name}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount)

      return <div className={`text-right font-medium ${row.original.type === "income" ? "text-green-500" : "text-red-500"}`}> {row.original.type === "income" ? "+ " : "- "}{formatted}</div>
    },

  },
  {
    accessorKey: "created_at",
    header: () => <div className="text-center">Date</div>,
    cell: ({ row }) => <div className="lowercase text-center">{moment(row.getValue("created_at")).format("DD-MM-YYYY hh:mm A")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit {sentenceCase(row.original.type)}</DropdownMenuItem>
            <DropdownMenuItem>Delete {sentenceCase(row.original.type)}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function AllExpenseList() {
  const today =  moment().startOf("month").toDate()
  const queryClient = useQueryClient();
  const [inputData, setInputData] = React.useState([])
  const [filteredData, setFilteredData] = React.useState([])
  const [categories, setCatgories] = React.useState([])
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: today, 
    to: addDays(today, 30),
  })
  const results = useQueries({
    queries: [
      {
        queryKey: ['get-expenses',{ startDate: date?.from, endDate: date?.to }],
        queryFn: async ({ queryKey }) => {
          const [, params] = queryKey  as [string, { startDate: string; endDate: string }];       

          const { data } = await apiHandlers.getAllExpenses(params)
          setInputData(data.result)
          setFilteredData(data.result)
          return data
        }, staleTime: Infinity
      },
      {
        queryKey: ['get-categories', 2], queryFn: async () => {
          const { data } = await apiHandlers.getExpenseCategory()
          setCatgories(data.result)
          return data
        },
      },
    ],
  })
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  const handleCategoryChange = React.useCallback((category: string) => {
    if (category === "all") {
      setFilteredData(inputData)

    } else {
      const newdata = filteredData.filter((item: any) => item.category.name.toLowerCase() === category.toLowerCase())
      setFilteredData(newdata)
    }
  }, [])
  const handleDateChange = React.useCallback((date: any) => {
    if (date) {
      queryClient.invalidateQueries({
        queryKey: ['get-expenses', { startDate: date.from, endDate: date.to }],
      });
    } else {
      setFilteredData(inputData)
    }
    setDate(date)
  },[])
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Expense and Income..."
          value={(table.getColumn("type")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("type")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu >
          <DropdownMenuTrigger asChild className="mx-2">
            <Button variant="outline" className="ml-auto">
              Category <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              className="capitalize"
              onCheckedChange={() => handleCategoryChange("all")}
            >
              All
            </DropdownMenuCheckboxItem>
            {categories
              .map((item: any) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={item.id}
                    className="capitalize"
                    onCheckedChange={() => handleCategoryChange(item.name)}
                  >
                    {item.name}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <DateRangeFilter date={date} handleDateChange={handleDateChange} />

      </div>
      <div className="rounded-md border">
        <ScrollArea className="h-[450px] w-full">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : results[0].isFetching ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center flex justify-center items-center mx-auto"
                  >
                    <Loader2 className="animate-spin mr-2" /> Loading...
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>

      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
