import * as React from 'react';

import { NavOperations } from '@/components/nav-operations';
import { NavAdministration } from '@/components/nav-administration';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
} from '@/components/ui/sidebar';
import { House, Box, Tag, ShoppingCart, Users } from 'lucide-react';

// This is sample data.
const data = {
    operations: [
        {
            title: 'Dashboard',
            url: '/admin/dashboard',
            icon: <House />,
        },
        {
            title: 'Categories',
            url: '/admin/categories',
            icon: <Tag />,
        },
        {
            title: 'Products',
            url: '/admin/products',
            icon: <Box />,
        },
        {
            title: 'Orders',
            url: '/admin/orders',
            icon: <ShoppingCart />,
        },
    ],
    administration: [
        {
            name: 'Staff and roles',
            url: '/admin/administration',
            icon: <Users />,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <a
                    href="/admin/dashboard"
                    aria-label="Commercehub dashboard"
                    className="flex h-9 items-center justify-center"
                >
                    <img
                        src="/images/commercehub-logo.png"
                        alt=""
                        className="w-40 group-data-[collapsible=icon]:hidden"
                    />
                    <img
                        src="/images/favicon-32x32.png"
                        alt=""
                        className="hidden size-6 shrink-0 object-contain group-data-[collapsible=icon]:block"
                    />
                </a>
            </SidebarHeader>
            <SidebarContent>
                <NavOperations items={data.operations} />
                <NavAdministration projects={data.administration} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
