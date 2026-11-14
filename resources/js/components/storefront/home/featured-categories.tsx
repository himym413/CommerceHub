import { Carton, Wheat, Candy, CupSoda, ArrowRight } from "lucide-react"

export default function FeaturedCategories() {
  const categories = [
    { name: "Dairy and Eggs", icon: Carton },
    { name: "Rice, Pasta and Grains", icon: Wheat },
    { name: "Snacks and Sweets", icon: Candy },
    { name: "Beverages", icon: CupSoda },
  ];

  return (
    <div className="mx-auto max-w-storefront px-storefront-gutter mt-5">
      <section id="categories">
        <div className="flex justify-between items-center">
          <h2 className="font-storefront-heading font-bold text-xl flex-1 xs:text-storefront-section">Shop by category</h2>

          <a href="" className="text-storefront-brand text-sm inline-flex items-center gap-1 xs:text-base">
            <span>View all categories</span>
            <ArrowRight size={20} color="var(--color-storefront-brand)" strokeWidth={2} aria-hidden="true" />
          </a>
        </div>

        <ul className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          {categories.map(({ name, icon: Icon }) => (
            <li key={name} className="px-2 py-3 border border-storefront-border rounded-storefront-card flex items-center justify-start gap-3 font-semibold flex-1">
              <Icon size={50} color="var(--color-storefront-brand)" strokeWidth={1} className="shrink-0" aria-hidden="true" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}