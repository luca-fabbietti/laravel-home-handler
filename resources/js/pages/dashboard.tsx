import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, PaginatedLists } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { clsx } from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const lists: PaginatedLists = usePage().props.lists;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {lists.data.map((list) => (
                        <Card key={list.id} className="w-full">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-start overflow-hidden text-ellipsis">
                                    {list.attributes.name}
                                </CardTitle>
                                <CardAction>
                                    <Button asChild>
                                        <Link href={`/list/${list.id}`} className="w-full">
                                            View List
                                        </Link>
                                    </Button>
                                </CardAction>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-1.5">
                                {list.attributes.rows &&
                                    list.attributes.rows.slice(0, 3).map((row) => (
                                        <div key={row.id} className="flex items-center gap-2">
                                            <Checkbox
                                                id={`row-${row.id}-${list.id}`}
                                                defaultChecked={Boolean(row.completed)}
                                                className="pointer-events-none"
                                            />
                                            <Label className={clsx(row.completed ? 'line-through' : '')} htmlFor={`row-${row.id}-${list.id}`}>
                                                {row.product.name}
                                            </Label>
                                        </div>
                                    ))}
                                {list.attributes.rows && list.attributes.rows.length > 3 && (
                                    <Label className="text-sm text-neutral-700 dark:text-neutral-300">more...</Label>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <Link
                                href={lists.links.prev ?? '#'}
                                className={clsx(
                                    'flex h-9 items-center gap-1 px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                                    lists.links.prev === null && 'pointer-events-none opacity-50',
                                )}
                                preserveScroll
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </Link>
                        </PaginationItem>

                        {lists.meta.current_page > 2 && (
                            <PaginationItem>
                                <Link
                                    href="?page=1"
                                    className="flex h-9 min-w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                                    preserveScroll
                                >
                                    1
                                </Link>
                            </PaginationItem>
                        )}

                        {lists.meta.current_page > 3 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}

                        {lists.meta.current_page > 1 && (
                            <PaginationItem>
                                <Link
                                    href={`?page=${lists.meta.current_page - 1}`}
                                    className="flex h-9 min-w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                                    preserveScroll
                                >
                                    {lists.meta.current_page - 1}
                                </Link>
                            </PaginationItem>
                        )}

                        <PaginationItem>
                            <Link
                                href="#"
                                className="flex h-9 min-w-9 items-center justify-center rounded-md bg-accent text-sm font-medium text-accent-foreground transition-colors"
                                preserveScroll
                            >
                                {lists.meta.current_page}
                            </Link>
                        </PaginationItem>

                        {lists.meta.current_page < lists.meta.last_page && (
                            <PaginationItem>
                                <Link
                                    href={`?page=${lists.meta.current_page + 1}`}
                                    className="flex h-9 min-w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                                    preserveScroll
                                >
                                    {lists.meta.current_page + 1}
                                </Link>
                            </PaginationItem>
                        )}

                        {lists.meta.current_page < lists.meta.last_page - 2 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}

                        {lists.meta.current_page < lists.meta.last_page - 1 && (
                            <PaginationItem>
                                <Link
                                    href={`?page=${lists.meta.last_page}`}
                                    className="flex h-9 min-w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                                    preserveScroll
                                >
                                    {lists.meta.last_page}
                                </Link>
                            </PaginationItem>
                        )}

                        <PaginationItem>
                            <Link
                                href={lists.links.next ?? '#'}
                                className={clsx(
                                    'flex h-9 items-center gap-1 px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                                    lists.links.next === null && 'pointer-events-none opacity-50',
                                )}
                                preserveScroll
                            >
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </Link>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </AppLayout>
    );
}
