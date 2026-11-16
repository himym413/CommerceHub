import { AppSidebar } from '@/components/app-sidebar';
import { NavUser } from '@/components/nav-user';
import { Separator } from '@/components/ui/separator';
import {
    SidebarInset,
    SidebarProvider,
    SidebarSeparator,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { ReactNode } from 'react';

type AdminLayoutProps = {
    title: string;
    subtitle?: string;
    children: ReactNode;
};

export default function AdminLayout({
    title,
    children,
    subtitle,
}: AdminLayoutProps) {
    const data = {
        user: {
            name: 'shadcn',
            email: 'm@example.com',
            avatar: '/avatars/shadcn.jpg',
        },
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="mt-1 flex h-11 shrink-0 items-center justify-between transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1 cursor-ew-resize" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
                        />
                        <span className="text-sm opacity-70">{title}</span>
                    </div>

                    <NavUser user={data.user} />
                </header>

                <SidebarSeparator className="mx-0 mt-1 w-full bg-storefront-border" />

                <main className="flex h-screen flex-1 flex-col gap-4 bg-storefront-sage/70 px-4 pt-2 pb-6 sm:px-6">
                    <section>
                        <h1 className="font-storefront-heading text-3xl font-bold">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="mt-1 text-sm text-muted-foreground">
                                {subtitle}
                            </p>
                        )}
                    </section>
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
