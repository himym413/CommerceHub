import { Menu, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';

export default function StorefrontHeader() {
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    return (
        <nav className="relative mb-3 border-b border-storefront-border bg-storefront-surface font-storefront-body font-semibold">
            <div className="mx-auto flex max-w-storefront items-center justify-between px-storefront-gutter py-2">
                <a href="/">
                    <img
                        className="block w-40"
                        src="/images/commercehub-logo.png"
                        alt="CommerceHub"
                    />
                </a>

                <ul className="hidden items-center gap-5 xs:inline-flex">
                    <li>
                        <a href="/#categories">Categories</a>
                    </li>
                    <li>
                        <a href="/#products">Products</a>
                    </li>
                </ul>

                <button
                    type="button"
                    className="inline-flex size-11 items-center justify-center rounded-md text-storefront-brand focus-visible:outline-2 sm:hidden"
                    aria-label={
                        isOpenMenu ? 'Close navigation' : 'Open navigation'
                    }
                    aria-expanded={isOpenMenu}
                    aria-controls="storefront-menu"
                    onClick={() => setIsOpenMenu((open) => !open)}
                >
                    <Menu
                        className={`size-6 ${isOpenMenu ? 'hidden' : 'block'}`}
                        aria-hidden="true"
                    />
                    <X
                        className={`size-6 ${isOpenMenu ? 'block' : 'hidden'}`}
                        aria-hidden="true"
                    />
                </button>

                <ul
                    id="storefront-menu"
                    className={`absolute top-full right-25 left-25 z-10 mt-2 flex-col items-center gap-storefront-gap rounded-2xl bg-storefront-canvas py-5 opacity-95 sm:relative sm:inset-0 sm:mt-0 sm:flex sm:flex-row sm:rounded-none sm:bg-transparent sm:opacity-100 ${isOpenMenu ? 'flex' : 'hidden'}`}
                >
                    <li className="xs:hidden">
                        <a
                            href="/#categories"
                            onClick={() => setIsOpenMenu(false)}
                        >
                            Categories
                        </a>
                    </li>
                    <li className="xs:hidden">
                        <a
                            href="/#products"
                            onClick={() => setIsOpenMenu(false)}
                        >
                            Products
                        </a>
                    </li>
                    <li>
                        <a href="/login" onClick={() => setIsOpenMenu(false)}>
                            Log in
                        </a>
                    </li>
                    <li>
                        <a
                            href="/register"
                            onClick={() => setIsOpenMenu(false)}
                        >
                            Register
                        </a>
                    </li>
                    <li>
                        <a
                            href="/cart"
                            className="inline-flex items-center gap-2"
                            onClick={() => setIsOpenMenu(false)}
                        >
                            <ShoppingCart
                                size={20}
                                color="var(--color-storefront-brand)"
                                aria-hidden="true"
                            />
                            <span>Cart</span>
                            <span className="rounded-full bg-storefront-brand px-2 pb-0.5 text-sm text-storefront-canvas">
                                0
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
