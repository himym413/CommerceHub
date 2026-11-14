export default function HomeHero() {
  return (
    <div className="mx-auto max-w-storefront px-storefront-gutter">
      <section className="rounded-storefront-card p-6 md:p-10 bg-storefront-sage bg-cover bg-center aspect-auto" style={{ backgroundImage: `url('/images/commercehub-hero.png')` }}>
        <h1 className="font-storefront-heading text-storefront-hero-sm font-bold md:text-storefront-hero">
          Everyday groceries
        </h1>

        <p className="mt-4 text-base text-storefront-muted">
          Browse pantry staples, snacks and drinks.
        </p>

        <button className="mt-4 bg-storefront-brand text-storefront-surface px-4 py-1.5 rounded-sm">
          Browse products
        </button>
      </section>
    </div>
  );
}