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
import { toast } from '@/components/ui/toast';
import { useForm } from '@inertiajs/react';

type DeleteCategoryDialogProps = {
    category: {
        id: number;
        name: string;
    };
    onClose: () => void;
};

export function DeleteCategoryDialog({
    category,
    onClose,
}: DeleteCategoryDialogProps) {
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
                    className="space-y-4"
                    onSubmit={(event) => {
                        event.preventDefault();
                        form.delete(`/admin/categories/${category.id}`, {
                            onSuccess: () => {
                                onClose();

                                toast.add({
                                    title: 'Category deleted',
                                    type: 'success',
                                });
                            },
                        });
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>Delete category</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete "
                            <span className="font-bold">{category.name}</span>"?
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    {form.errors.name && <Error message={form.errors.name} />}

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
                            variant="destructive"
                            className="cursor-pointer"
                            disabled={form.processing}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
