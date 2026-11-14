export default function HomeHero() {
    return (
        <div className="mx-auto max-w-storefront px-storefront-gutter">
            <section
                className="aspect-auto rounded-storefront-card bg-storefront-sage bg-cover bg-center p-6 md:p-10"
                style={{
                    backgroundImage: `url('/images/commercehub-hero.png')`,
                }}
            >
                <h1 className="font-storefront-heading text-storefront-hero-sm font-bold md:text-storefront-hero">
                    Everyday groceries
                </h1>

                <p className="mt-4 text-base text-storefront-muted">
                    Browse pantry staples, snacks and drinks.
                </p>

                <button className="mt-4 rounded-sm bg-storefront-brand px-4 py-1.5 text-storefront-surface">
                    Browse products
                </button>
            </section>
        </div>
    );
}
