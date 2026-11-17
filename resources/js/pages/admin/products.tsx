import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AdminLayout from '@/layouts/admin-layout';
import { MoreHorizontalIcon, Pencil, Plus, Search, Trash } from 'lucide-react';
import { useState } from 'react';

type Product = {
    id: number;
    name: string;
    sku: string;
    category: string;
    price: string;
    availableStock: number;
    isActive: boolean;
};

const products: Product[] = [
    {
        id: 1,
        name: 'Whole Milk · 1 L',
        sku: 'MILK-001',
        category: 'Dairy and Eggs',
        price: '2.80',
        availableStock: 2,
        isActive: true,
    },
    {
        id: 2,
        name: 'Penne · 500 g',
        sku: 'PASTA-001',
        category: 'Rice, Pasta and Grains',
        price: '3.20',
        availableStock: 18,
        isActive: true,
    },
    {
        id: 3,
        name: 'Oat Biscuits · 250 g',
        sku: 'BISC-001',
        category: 'Snacks and Sweets',
        price: '4.50',
        availableStock: 4,
        isActive: true,
    },
    {
        id: 4,
        name: 'Sparkling Water · 1 L',
        sku: 'WATER-001',
        category: 'Beverages',
        price: '1.60',
        availableStock: 0,
        isActive: false,
    },
];

const categories = [
    ...new Set(products.map((product) => product.category)),
].sort();

export default function Products() {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');

    const categoryOptions = [
        { label: 'All categories', value: 'all' },
        ...categories.map((category) => ({
            label: category,
            value: category,
        })),
    ];

    const statusOptions = [
        { label: 'All statuses', value: 'all' },
        { label: 'Only active', value: 'active' },
        { label: 'Only inactive', value: 'inactive' },
    ];

    const query = search.trim().toLowerCase();

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(query) ||
            product.sku.toLowerCase().includes(query);

        const matchesCategory =
            selectedCategory === 'all' || product.category === selectedCategory;

        const matchesStatus =
            selectedStatus === 'all' ||
            product.isActive === (selectedStatus === 'active');

        return matchesSearch && matchesCategory && matchesStatus;
    });

    return (
        <AdminLayout
            title="Products"
            subtitle="Manage products in your catalog."
            actions={
                <Button
                    variant={'default'}
                    type="button"
                    className="bg-storefront-brand hover:cursor-pointer hover:bg-storefront-brand hover:opacity-90"
                >
                    <Plus className="size-4" aria-hidden="true" />
                    Add product
                </Button>
            }
        >
            <Card className="w-full">
                <CardHeader className="grid w-full gap-3 lg:grid-cols-[minmax(0,1fr)_12rem_12rem]">
                    <div className="relative">
                        <Search
                            aria-hidden="true"
                            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                            type="search"
                            aria-label="Search products by name or SKU"
                            placeholder="Search products…"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            className="pl-9"
                        />
                    </div>

                    <Select
                        items={categoryOptions}
                        value={selectedCategory}
                        onValueChange={(value) =>
                            setSelectedCategory(value ?? 'all')
                        }
                    >
                        <SelectTrigger
                            className="w-full"
                            aria-label="Filter by category"
                        >
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent alignItemWithTrigger={false}>
                            <SelectGroup>
                                {categoryOptions.map(({ label, value }) => (
                                    <SelectItem key={value} value={value}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Select
                        items={statusOptions}
                        value={selectedStatus}
                        onValueChange={(value) =>
                            setSelectedStatus(value ?? 'all')
                        }
                    >
                        <SelectTrigger
                            className="w-full"
                            aria-label="Filter by status"
                        >
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent alignItemWithTrigger={false}>
                            <SelectGroup>
                                {statusOptions.map(({ label, value }) => (
                                    <SelectItem key={value} value={value}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent className="m-0 p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted-foreground/10 hover:bg-muted-foreground/10">
                                <TableHead className="font-bold">
                                    Product
                                </TableHead>
                                <TableHead className="font-bold">
                                    Category
                                </TableHead>
                                <TableHead className="font-bold">
                                    Price
                                </TableHead>
                                <TableHead className="font-bold">
                                    Stock
                                </TableHead>
                                <TableHead className="font-bold">
                                    Status
                                </TableHead>
                                <TableHead className="text-right font-bold">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="py-8 text-center text-muted-foreground"
                                    >
                                        No products match your filters.
                                    </TableCell>
                                </TableRow>
                            )}
                            {filteredProducts.map(
                                ({
                                    id,
                                    name,
                                    sku,
                                    category,
                                    price,
                                    availableStock,
                                    isActive,
                                }) => (
                                    <TableRow key={id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src="/images/product-placeholder.png"
                                                    alt=""
                                                    className="block h-auto w-10 rounded-sm"
                                                />
                                                <div>
                                                    <p className="text-sm font-bold">
                                                        {name}
                                                    </p>
                                                    <span className="text-xs text-storefront-muted">
                                                        {sku}
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{category}</TableCell>
                                        <TableCell className="font-bold">
                                            {price} KM
                                        </TableCell>
                                        <TableCell>{availableStock}</TableCell>
                                        <TableCell>
                                            {isActive ? 'Active' : 'Inactive'}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger
                                                    render={
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            aria-label={`Actions for ${name}`}
                                                        >
                                                            <MoreHorizontalIcon aria-hidden="true" />
                                                        </Button>
                                                    }
                                                />
                                                <DropdownMenuContent
                                                    align="start"
                                                    className="w-40"
                                                >
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuItem
                                                            variant="default"
                                                            className="hover:cursor-pointer"
                                                        >
                                                            <Pencil />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            variant="destructive"
                                                            className="hover:cursor-pointer"
                                                        >
                                                            <Trash />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ),
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
