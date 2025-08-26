import { ComboboxFindProduct } from '@/components/combobox-find-product';
import { ListRowsTable } from '@/components/list-rows-table';

import AlertError from '@/components/alert-error';
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
    const props = usePage().props;
    const listRows: ListRow[] = props.listRows.data as unknown as ListRow[];
    const { errors } = usePage().props;
    return (
        <div className="relative">
            <AppLayout breadcrumbs={breadcrumbs}>
                <ComboboxFindProduct />
                <Head title="List" />
                {errors && Object.entries(errors).length > 0 && <AlertError errorText={'Impossible to edit entry'} errors={errors} />}
                <ListRowsTable data={listRows} />
            </AppLayout>
        </div>
    );
}
