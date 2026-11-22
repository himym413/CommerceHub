import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import Error from '@/components/ui/error';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/toast';
import { useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export function CreateCategoryDialog() {
    const [open, setOpen] = useState(false);
    const form = useForm({ name: '' });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <Button
                        variant={'default'}
                        type="button"
                        className="bg-storefront-brand hover:cursor-pointer hover:bg-storefront-brand hover:opacity-90"
                    >
                        <Plus className="size-4" aria-hidden="true" />
                        Add category
                    </Button>
                }
            />

            <DialogContent className="sm:max-w-sm">
                <form
                    className="space-y-4"
                    onSubmit={(event) => {
                        event.preventDefault();
                        form.post('/admin/categories', {
                            onSuccess: () => {
                                form.reset();
                                setOpen(false);

                                toast.add({
                                    title: 'Category created',
                                    type: 'success',
                                });
                            },
                        });
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>Add category</DialogTitle>
                        <DialogDescription>
                            Add a new category
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="category_name">Name</Label>
                            <Input
                                id="category_name"
                                name="name"
                                value={form.data.name}
                                onChange={(event) =>
                                    form.setData('name', event.target.value)
                                }
                                required
                                maxLength={100}
                            />
                            {form.errors.name && (
                                <Error message={form.errors.name} />
                            )}
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose
                            render={
                                <Button
                                    variant="outline"
                                    type="button"
                                    className="hover:cursor-pointer"
                                >
                                    Cancel
                                </Button>
                            }
                        />
                        <Button
                            type="submit"
                            className="bg-storefront-brand hover:cursor-pointer hover:bg-storefront-brand hover:opacity-90"
                            disabled={form.processing}
                        >
                            Create category
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
