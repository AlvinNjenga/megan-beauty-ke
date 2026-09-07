import Image from "next/image";
import { ActionLink } from "./action-link";

export function GlowDealsCard() {
  return (
    <article className="relative isolate flex h-full min-h-[110vw] items-end overflow-hidden rounded-[10px] bg-stone-500 p-7 text-white sm:min-h-[560px] lg:min-h-0 lg:p-10">
      <Image
        src="/images/olivelle/glow-deals.webp"
        alt="Three women holding skincare products and facial massage tools."
        fill
        sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 88vw"
        className="-z-20 object-cover object-center"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-black/70 via-black/20 to-black/10" />
      <div>
        <p className="mb-2 text-[9px] font-bold tracking-[0.25em] uppercase lg:text-[11px]">Limited time offer</p>
        <h3 className="font-heading text-[32px] leading-tight font-bold lg:text-5xl">Glow Deals</h3>
        <p className="mt-3 max-w-sm text-xs leading-snug text-white/90 lg:text-base">
          Treat yourself or someone special with our curated beauty and wellness sets.
        </p>
        <ActionLink href="https://flux-demo-6.myshopify.com/collections/wellness-sets" className="mt-3 h-10 px-4 text-sm lg:text-base">
          Explore Sets
        </ActionLink>
      </div>
    </article>
  );
}
