import { ListRowsTable } from '@/components/list-rows-table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, ListRow } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit List',
        href: '/list',
    },
];

export default function Index() {
    const listRows: ListRow[] = usePage().props.listRows.data as ListRow[];
    console.log('List Rows:', listRows);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="List" />
            <ListRowsTable data={listRows} />
        </AppLayout>
    );
}
