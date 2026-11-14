import { Carton, Wheat, Candy, CupSoda, ArrowRight } from 'lucide-react';

export default function FeaturedCategories() {
    const categories = [
        { name: 'Dairy and Eggs', icon: Carton },
        { name: 'Rice, Pasta and Grains', icon: Wheat },
        { name: 'Snacks and Sweets', icon: Candy },
        { name: 'Beverages', icon: CupSoda },
    ];

    return (
        <div className="mx-auto mt-5 max-w-storefront px-storefront-gutter">
            <section id="categories">
                <div className="flex items-center justify-between">
                    <h2 className="flex-1 font-storefront-heading text-xl font-bold xs:text-storefront-section">
                        Shop by category
                    </h2>

                    <a
                        href=""
                        className="inline-flex items-center gap-1 text-sm text-storefront-brand xs:text-base"
                    >
                        <span>View all categories</span>
                        <ArrowRight
                            size={20}
                            color="var(--color-storefront-brand)"
                            strokeWidth={2}
                            aria-hidden="true"
                        />
                    </a>
                </div>

                <ul className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                    {categories.map(({ name, icon: Icon }) => (
                        <li
                            key={name}
                            className="flex flex-1 items-center justify-start gap-3 rounded-storefront-card border border-storefront-border px-2 py-3 font-semibold"
                        >
                            <Icon
                                size={50}
                                color="var(--color-storefront-brand)"
                                strokeWidth={1}
                                className="shrink-0"
                                aria-hidden="true"
                            />
                            <span>{name}</span>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
