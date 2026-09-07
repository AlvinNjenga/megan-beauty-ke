import products from "@/lib/storefront/wellness-products.json";
import { BeautyBenefits } from "./beauty-benefits";
import { GlowDealsCard } from "./glow-deals-card";
import { ProductCard } from "./product-card";
import { ScrollRail } from "./scroll-rail";

export function CuratedSelfCare() {
  const itemClass = "w-[88vw] shrink-0 snap-start sm:w-[45vw] lg:w-[calc((100%-72px)/4)]";

  return (
    <>
      <BeautyBenefits />
      <section id="curated-self-care" aria-labelledby="curated-self-care-title" className="scroll-mt-24 pb-14 lg:pb-20">
        <h2 id="curated-self-care-title" className="mb-5 px-4 font-heading text-[clamp(1.5rem,7.4vw,2rem)] leading-tight font-bold tracking-[-0.025em] md:pr-32 lg:mb-7 lg:px-[3%] lg:pr-36 lg:text-5xl">
          Curated Self-Care Sets
        </h2>
        <ScrollRail label="Curated self-care sets" controlLabel="self-care sets" controlsClassName="hidden md:flex lg:-top-20" className="scroll-px-4 gap-2.5 px-4 lg:gap-6">
          <li className={itemClass}><GlowDealsCard /></li>
          {products.map((product) => (
            <li key={product.slug} className={itemClass}>
              <ProductCard product={product} variant="set" />
            </li>
          ))}
        </ScrollRail>
      </section>
    </>
  );
}
