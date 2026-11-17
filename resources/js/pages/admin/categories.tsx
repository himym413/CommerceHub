import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AdminLayout from '@/layouts/admin-layout';
import { MoreHorizontalIcon, Pencil, Plus, Trash } from 'lucide-react';

type Category = {
    name: string;
    numProducts: number;
};

const categories: Category[] = [
    {
        name: 'Beverages',
        numProducts: 8,
    },
    {
        name: 'Bread and Bakery',
        numProducts: 5,
    },
    {
        name: 'Canned and Jarred Food',
        numProducts: 12,
    },
    {
        name: 'Dairy and Eggs',
        numProducts: 6,
    },
    {
        name: 'Frozen Food',
        numProducts: 0,
    },
    {
        name: 'Fruit and Vegetables',
        numProducts: 9,
    },
];

export default function Categories() {
    return (
        <AdminLayout
            title="Categories"
            subtitle="Manage the categories in your catalog."
            actions={
                <Button
                    variant={'default'}
                    type="button"
                    className="bg-storefront-brand hover:cursor-pointer hover:bg-storefront-brand hover:opacity-90"
                >
                    <Plus className="size-4" aria-hidden="true" />
                    Add category
                </Button>
            }
            mainSectionWidth="w-4/5"
        >
            <Card className="m-0 w-full p-0 sm:max-w-4/5">
                <CardContent className="m-0 p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted-foreground/10 hover:bg-muted-foreground/10">
                                <TableHead className="font-bold">
                                    Name
                                </TableHead>
                                <TableHead className="font-bold">
                                    Products
                                </TableHead>
                                <TableHead className="text-right font-bold">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map(({ name, numProducts }) => (
                                <TableRow key={name}>
                                    <TableCell>{name}</TableCell>
                                    <TableCell>{numProducts}</TableCell>
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
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
