import { CreateCategoryDialog } from '@/components/admin/categories/create-category-dialog';
import { DeleteCategoryDialog } from '@/components/admin/categories/delete-category-dialog';
import { EditCategoryDialog } from '@/components/admin/categories/edit-category-dialog';
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
import { MoreHorizontalIcon, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';

type Category = {
    id: number;
    name: string;
    products_count: number;
};

type SelectedCategory = {
    category: Category;
    action: 'edit' | 'delete';
};

type CategoriesProps = {
    categories: Category[];
};

export default function Categories({ categories }: CategoriesProps) {
    const [selectedCategory, setSelectedCategory] =
        useState<SelectedCategory | null>(null);

    return (
        <AdminLayout
            title="Categories"
            subtitle="Manage the categories in your catalog."
            actions={<CreateCategoryDialog />}
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
                            {categories.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={3}
                                        className="py-10 text-center text-muted-foreground"
                                    >
                                        No categories yet.
                                    </TableCell>
                                </TableRow>
                            )}
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>
                                        {category.products_count}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger
                                                render={
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        aria-label={`Actions for ${category.name}`}
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
                                                        className="cursor-pointer"
                                                        onClick={() =>
                                                            setSelectedCategory(
                                                                {
                                                                    category,
                                                                    action: 'edit',
                                                                },
                                                            )
                                                        }
                                                    >
                                                        <Pencil aria-hidden="true" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        variant="destructive"
                                                        className="cursor-pointer"
                                                        onClick={() =>
                                                            setSelectedCategory(
                                                                {
                                                                    category,
                                                                    action: 'delete',
                                                                },
                                                            )
                                                        }
                                                    >
                                                        <Trash aria-hidden="true" />
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

            {selectedCategory && selectedCategory.action === 'edit' && (
                <EditCategoryDialog
                    key={selectedCategory.category.id}
                    category={selectedCategory.category}
                    onClose={() => setSelectedCategory(null)}
                />
            )}

            {selectedCategory && selectedCategory.action === 'delete' && (
                <DeleteCategoryDialog
                    key={selectedCategory.category.id}
                    category={selectedCategory.category}
                    onClose={() => setSelectedCategory(null)}
                />
            )}
        </AdminLayout>
    );
}
