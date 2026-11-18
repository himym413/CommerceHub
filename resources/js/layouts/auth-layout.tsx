import { MoveLeft } from 'lucide-react';
import { ReactNode } from 'react';

type AuthLayout = {
    children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayout) {
    return (
        <div className="relative flex min-h-svh w-full items-center justify-center bg-storefront-sage p-6 md:pt-2">
            <a
                href="/"
                className="absolute top-2 left-3 flex items-center gap-1 md:top-4 md:left-4"
            >
                <MoveLeft className="w-3.5 text-storefront-brand" />
                <span className="text-sm font-medium text-storefront-brand">
                    Back to store
                </span>
            </a>
            <div className="flex w-full max-w-sm flex-col">
                <a href="/" className="mx-auto h-fit w-60">
                    <img
                        src="/images/commercehub-logo.png"
                        alt="CommerceHub home"
                    />
                </a>
                {children}
            </div>
        </div>
    );
}
