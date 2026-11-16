import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export default function RecentOrders() {
    const orders = [
        { id: 1048, customer: 'Hana K.', status: 'Pending', total: '42.80 KM' },
        {
            id: 1047,
            customer: 'Emir S.',
            status: 'Approved',
            total: '67.50 KM',
        },
        {
            id: 1046,
            customer: 'Lejla M.',
            status: 'Dispatched',
            total: '28.90 KM',
        },
        {
            id: 1045,
            customer: 'Amar D.',
            status: 'Delivered',
            total: '104.20 KM',
        },
    ];

    return (
        <section className="w-full min-w-0 lg:flex-3">
            <Card className="rounded-lg">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold">
                        Recent Orders
                    </CardTitle>
                    <Button
                        variant={'outline'}
                        className="cursor-pointer rounded-lg px-4"
                    >
                        View orders
                    </Button>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader className="bg-muted-foreground/10">
                            <TableRow>
                                <TableHead>Order</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">
                                    Total
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map(({ id, customer, status, total }) => (
                                <TableRow key={id}>
                                    <TableCell className="font-medium">
                                        #{id}
                                    </TableCell>
                                    <TableCell>{customer}</TableCell>
                                    <TableCell>{status}</TableCell>
                                    <TableCell className="text-right tabular-nums">
                                        {total}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </section>
    );
}
