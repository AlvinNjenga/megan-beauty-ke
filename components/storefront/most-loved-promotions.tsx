import { mostLovedPromotions } from "@/lib/storefront/promotions";
import { PromotionCard } from "./promotion-card";
import { ScrollRail } from "./scroll-rail";

export function MostLovedPromotions() {
  return (
    <section id="most-loved" aria-labelledby="most-loved-title" className="scroll-mt-24 bg-background pb-12 lg:pb-20">
      <h2 id="most-loved-title" className="mb-3 px-3.5 font-heading text-[clamp(1.5rem,8.3vw,2rem)] leading-tight font-bold tracking-[-0.025em] md:pr-32 lg:mb-8 lg:px-[3%] lg:pr-36 lg:text-5xl">
        Most Loved Products
      </h2>
      <ScrollRail
        label="Most loved promotions"
        controlLabel="promotions"
        controlsClassName="hidden md:flex lg:-top-20"
        className="scroll-px-3.5 gap-2.5 px-3.5 lg:gap-6"
      >
        {mostLovedPromotions.map((promotion) => (
          <li key={promotion.id} className="w-[85vw] shrink-0 snap-start sm:w-[45vw] lg:w-[calc((100%-72px)/4)]">
            <PromotionCard promotion={promotion} />
          </li>
        ))}
      </ScrollRail>
    </section>
  );
}
