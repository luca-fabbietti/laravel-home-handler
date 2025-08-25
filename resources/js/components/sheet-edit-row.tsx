import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export function SheetEditRow({
    rowId,
    listId,
    quantity,
    quantityUnit,
    productId,
}: {
    rowId: number;
    listId: number;
    quantity: string;
    quantityUnit: string;
    productId: number;
}) {
    const [qtyValue, setQtyValue] = useState(quantity);
    const [qtyUnit, setQtyUnit] = useState(quantityUnit);
    const [open, setOpen] = useState(false);

    const handleSave = () => {
        const quantity = (document.getElementById('sheet-edit-row-quantity') as HTMLInputElement).value;
        const quantityUnit = (document.getElementById('sheet-edit-row-unit') as HTMLInputElement).value;
        router.put(
            `/api/v1/lists/${listId}/rows/${rowId}`,
            {
                qty_value: quantity,
                qty_uom: quantityUnit,
                product_id: productId,
            },
            {},
        );
        setOpen(false); // Close sheet after save
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" className="px-2! py-1.5! text-sm! font-light!">
                    Edit row
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Row</SheetTitle>
                    <SheetDescription>Edit the item here. Click save when you&apos;re done.</SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div className="grid gap-3">
                        <Label htmlFor="sheet-edit-row-quantity">Quantity</Label>
                        <Input id="sheet-edit-row-quantity" value={qtyValue} onChange={(event) => setQtyValue(event.target.value)} />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="sheet-edit-row-unit">Quantity unit</Label>
                        <Input id="sheet-edit-row-unit" value={qtyUnit} onChange={(event) => setQtyUnit(event.target.value)} />
                    </div>
                </div>
                <SheetFooter>
                    <Button
                        type="submit"
                        onClick={() => {
                            handleSave();
                        }}
                    >
                        Save changes
                    </Button>
                    <SheetClose asChild>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Close
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
