import { useDebounce } from '@/hooks/use-debounce';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Product = {
    type: string;
    id: string;
    attributes: {
        name: string;
        description: string | null;
        created_by: number;
    };
};

export function ComboboxFindProduct() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const debouncedSearch = useDebounce(searchTerm, 300);

    useEffect(() => {
        const fetchProducts = async () => {
            if (debouncedSearch.length < 2) {
                setProducts([]);
                return;
            }

            setIsLoading(true);
            try {
                const response = await fetch(`/api/v1/products/search/${debouncedSearch}`);
                const data = await response.json();
                setProducts(data.data || []);
                // Use this log to see the actual response
                console.log('API Response:', data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [debouncedSearch]);

    // Use this effect to monitor products state changes
    useEffect(() => {
        console.log('Products updated:', products);
    }, [products]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
                    {value ? products.find((product) => product.id === value)?.attributes.name : 'Select product...'}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="z-[1000] w-[200px] p-0">
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
                                console.log('Rendering product:', product);
                                return (
                                    <CommandItem
                                        key={product.id}
                                        value={product.id}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? '' : currentValue);
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
    );
}
