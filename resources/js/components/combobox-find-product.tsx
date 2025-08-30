import { useDebounce } from '@/hooks/use-debounce';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Product } from '@/types';

export function ComboboxFindProduct({ classNames, oldProductId }: { classNames?: string; oldProductId: number }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [productId, setProductId] = useState<number>(oldProductId);
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const debouncedSearch = useDebounce(searchTerm, 300);

    const portalContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            if (debouncedSearch.length < 2) {
                setProducts([]);
                return;
            }

            setIsLoading(true);
            try {
                const response = await fetch(`/api/v1/products/search/${encodeURI(debouncedSearch)}`);
                const data = await response.json();
                setProducts(data.data || []);
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [debouncedSearch]);

    return (
        <div className={classNames}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
                        {value ? products.find((product) => product.attributes.name === value)?.attributes.name : 'Select product...'}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="z-[1000] w-[200px] p-0" container={portalContainerRef.current ?? undefined}>
                    <Command>
                        <CommandInput
                            placeholder={isLoading ? 'Loading...' : 'Search products...'}
                            className="h-9"
                            value={searchTerm}
                            onValueChange={setSearchTerm}
                        />
                        <CommandList>
                            <CommandEmpty>{isLoading ? 'Loading...' : 'No products found.'}</CommandEmpty>
                            <CommandGroup className="z-[1000]">
                                {products.map((product) => {
                                    return (
                                        <CommandItem
                                            key={product.id}
                                            value={product.attributes.name}
                                            onSelect={(currentValue) => {
                                                setValue(currentValue === value ? '' : currentValue);
                                                setProductId(parseInt(product.id, 10));
                                                setOpen(false);
                                            }}
                                        >
                                            {product.attributes.name}
                                            <Check className={cn('ml-auto', value === product.id ? 'opacity-100' : 'opacity-0')} />
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <div ref={portalContainerRef} />
            <input value={productId} id="sheet-product-id-input" type="hidden" />
        </div>
    );
}
