import StorefrontHeader from '@/components/storefront/storefront-header';
import HomeHero from '@/components/storefront/home/home-hero';
import FeaturedCategories from '@/components/storefront/home/featured-categories';

export default function Home() {
    return (
        <>
            <StorefrontHeader />

            <main className="bg-storefront-canvas font-storefront-body text-storefront-ink">
                <HomeHero />
                <FeaturedCategories />

                <div className="mx-auto mt-5 max-w-storefront px-storefront-gutter">
                    <section id="products">
                        <h2 className="font-storefront-heading text-storefront-section font-bold">
                            Explore Products
                        </h2>
                    </section>
                </div>
            </main>
        </>
    );
}
