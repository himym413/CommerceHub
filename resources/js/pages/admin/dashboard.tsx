import DashboardSummary from '@/components/admin/dashboard/dashboard-summary';
import LowStock from '@/components/admin/dashboard/low-stock';
import RecentOrders from '@/components/admin/dashboard/recent-orders';
import AdminLayout from '@/layouts/admin-layout';

export default function Dashboard() {
    return (
        <AdminLayout title="Dashboard" subtitle="Review orders and inventory">
            <DashboardSummary />
            <div className="flex flex-col items-start gap-5 lg:flex-row">
                <RecentOrders />
                <LowStock />
            </div>
        </AdminLayout>
    );
}
