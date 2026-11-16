import { Card, CardContent } from '@/components/ui/card';
import {
    BoxIcon,
    ShoppingCartIcon,
    TagIcon,
    TriangleExclamationPointIcon,
} from 'lucide-react';

export default function DashboardSummary() {
    const data = [
        {
            label: 'Pending orders',
            description: 'Awaiting staff approval',
            value: 8,
            icon: ShoppingCartIcon,
        },
        {
            label: 'Active products',
            description: 'Visible in the storefront catalog',
            value: 124,
            icon: BoxIcon,
        },
        {
            label: 'Low stock',
            description: 'Products below the stock threshold',
            value: 6,
            icon: TriangleExclamationPointIcon,
        },
        {
            label: 'Categories',
            description: 'Total categories in the catalog',
            value: 12,
            icon: TagIcon,
        },
    ];

    return (
        <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            {data.map(({ label, description, value, icon: Icon }) => (
                <Card
                    key={label}
                    className="border-storefront-border bg-storefront-surface pb-2 shadow-none"
                >
                    <CardContent className="flex items-start gap-3 px-3">
                        <Icon
                            className="size-5 shrink-0 text-storefront-brand"
                            aria-hidden="true"
                        />
                        <div className="min-w-0">
                            <p className="text-sm leading-tight font-medium">
                                {label}
                            </p>
                            <p className="mt-1 text-2xl font-bold tabular-nums">
                                {value}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </section>
    );
}
