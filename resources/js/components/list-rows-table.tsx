import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';
import * as React from 'react';

import { AlertDeleteRow } from '@/components/alert-delete-row';
import { SheetEditRow } from '@/components/sheet-edit-row';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ListRow } from '@/types';
import { clsx } from 'clsx';

const columns: ColumnDef<ListRow>[] = [
    {
        id: 'id',
        accessorKey: 'id',
        header: () => <div className="capitalize">Completed</div>,
        cell: ({ row }) => {
            row.toggleSelected(row.original.attributes.completed);
            console.log(row);
            return (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => {
                        console.log(value);
                        // TODO: Update completed status via API
                    }}
                    aria-label="Select row"
                />
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'attributes.product.name',
        accessorKey: 'attributes.product.name',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Product
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className={clsx('capitalize', row.original.attributes.completed ? 'line-through' : '')}>
                {row.getValue('attributes.product.name')}
            </div>
        ),
    },
    {
        id: 'attributes.quantity',
        accessorKey: 'attributes.quantity',
        header: 'Quantity',
        cell: ({ row }) => (
            <div className={clsx('lowercase', row.original.attributes.completed ? 'line-through' : '')}>{row.getValue('attributes.quantity')}</div>
        ),
    },
    {
        id: 'attributes.quantity_unit',
        accessorKey: 'attributes.quantity_unit',
        header: () => <div className="text-right">U.O.M.</div>,
        cell: ({ row }) => {
            return (
                <div className={clsx('text-right font-medium', row.original.attributes.completed ? 'line-through' : '')}>
                    {row.getValue('attributes.quantity_unit')}
                </div>
            );
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild={true}>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div>
                            <div>
                                <DropdownMenuItem asChild>
                                    <SheetEditRow
                                        listId={row.original.attributes.list_id}
                                        rowId={row.getValue('id')}
                                        quantity={row.getValue('attributes.quantity')}
                                        quantityUnit={row.getValue('attributes.quantity_unit')}
                                        productId={row.original.attributes.product.id}
                                    />
                                </DropdownMenuItem>
                            </div>
                            <div>
                                <DropdownMenuItem asChild>
                                    <AlertDeleteRow listId={row.original.attributes.list_id} rowId={row.getValue('id')} />
                                </DropdownMenuItem>
                            </div>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export function ListRowsTable({ data }: { data: ListRow[] }) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
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
    });
    return (
        <div className="w-full p-4">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter products..."
                    value={(table.getColumn('attributes.product.name')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('attributes.product.name')?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" autoFocus={false}>
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => {
                                return (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                        {row.getVisibleCells().map((cell) => {
                                            return <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>;
                                        })}
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
