import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LowStock() {
    const lowStockProducts = [
        { id: 1, name: 'Whole Milk · 1 L', availableStock: 2 },
        { id: 2, name: 'Penne · 500 g', availableStock: 3 },
        { id: 3, name: 'Oat Biscuits · 250 g', availableStock: 4 },
    ];

    return (
        <section className="w-full min-w-0 lg:flex-2">
            <Card className="rounded-lg">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold">
                        Low Stock
                    </CardTitle>
                    <Button
                        variant={'link'}
                        className="cursor-pointer rounded-lg px-4 text-storefront-brand underline hover:scale-103"
                    >
                        View products
                    </Button>
                </CardHeader>
                <CardContent>
                    <ul className="divide-y divide-storefront-border">
                        {lowStockProducts.map(
                            ({ id, name, availableStock }) => (
                                <li
                                    key={id}
                                    className="flex items-center justify-between gap-3 py-3"
                                >
                                    <span className="min-w-0 text-sm font-medium">
                                        {name}
                                    </span>
                                    <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900 tabular-nums">
                                        {availableStock} left
                                    </span>
                                </li>
                            ),
                        )}
                    </ul>
                </CardContent>
            </Card>
        </section>
    );
}
