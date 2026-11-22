import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import Error from '@/components/ui/error';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/toast';
import { useForm } from '@inertiajs/react';

type EditCategoryDialogProps = {
    category: {
        id: number;
        name: string;
    };
    onClose: () => void;
};

export function EditCategoryDialog({
    category,
    onClose,
}: EditCategoryDialogProps) {
    const form = useForm({ name: category.name });

    return (
        <Dialog
            open={true}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    onClose();
                }
            }}
        >
            <DialogContent className="sm:max-w-sm">
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        form.patch(`/admin/categories/${category.id}`, {
                            onSuccess: () => {
                                onClose();

                                toast.add({
                                    title: 'Category updated',
                                    type: 'success',
                                });
                            },
                        });
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>Edit category</DialogTitle>
                        <DialogDescription>
                            Change category name
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
                            Save changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
