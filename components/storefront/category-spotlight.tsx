import Image from "next/image";
import type { Product } from "@/lib/storefront/products";
import { ActionLink } from "./action-link";
import { ProductCard } from "./product-card";
import { ScrollRail } from "./scroll-rail";

type CategorySpotlightProps = {
  id: string;
  title: string;
  accent: string;
  description: string;
  image: string;
  cta: { label: string; href: string };
  products: Product[];
};

export function CategorySpotlight({
  id, title, accent, description, image, cta, products,
}: CategorySpotlightProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 bg-background pb-12 lg:scroll-mt-24 lg:pb-20">
      <div className="relative isolate min-h-[435px] bg-stone-400 px-3.5 pt-9 pb-36 text-center lg:min-h-[550px] lg:px-14 lg:pt-20 lg:pb-64">
        <Image src={image} alt="" fill sizes="100vw" className="-z-20 object-cover object-center" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/35" />
        <div className="mx-auto max-w-3xl text-white">
          <h2 id={`${id}-title`} className="font-heading text-[clamp(2.75rem,13.5vw,3.5rem)] leading-[1.05] font-bold tracking-[-0.025em] lg:text-[clamp(3.5rem,3.5vw,4.25rem)]">
            {title}{" "}
            <span className="relative inline-block">
              {accent}
              <svg aria-hidden="true" viewBox="0 0 260 16" fill="none" className="absolute -bottom-2 left-0 h-3 w-full text-accent">
                <path d="M3 11C66 1 185 4 257 13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-base leading-[1.7] lg:text-lg">{description}</p>
          <ActionLink href={cta.href} className="mt-4 h-11 px-5 text-base">{cta.label}</ActionLink>
        </div>
      </div>
      {/* Keep the rail in flow so its overlap still reserves space below the banner. */}
      <div className="relative z-10 mx-auto -mt-[106px] max-w-[1576px] lg:-mt-[180px]">
        <ScrollRail
          label={accent}
          controlLabel="facial oils"
          controlsClassName="hidden lg:right-5 lg:flex"
          className="scroll-px-3.5 gap-3 px-3.5 lg:scroll-px-5 lg:gap-5 lg:px-5"
        >
          {products.map((product) => (
            <li key={product.slug} className="w-[85vw] shrink-0 snap-start sm:w-[45vw] lg:w-[calc((100%-60px)/4)]">
              <ProductCard product={product} variant="bare" />
            </li>
          ))}
        </ScrollRail>
      </div>
    </section>
  );
}
