import Image from "next/image";
import { ChevronRight } from "lucide-react";
import type { Promotion } from "@/lib/storefront/promotions";

export function PromotionCard({ promotion }: { promotion: Promotion }) {
  return (
    <article className="relative aspect-square">
      <a href={promotion.href} className="group relative block size-full rounded-[10px] focus-visible:outline-3 focus-visible:outline-ring focus-visible:outline-offset-2">
        <div className="absolute inset-0 overflow-hidden rounded-[10px]">
          <Image
            src={promotion.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 85vw"
            className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.035] motion-reduce:transition-none"
          />
        </div>
        <div className="absolute bottom-0 left-0 max-w-[85%] rounded-tr-xl bg-background px-5 pt-3 pb-2 lg:px-6 lg:pt-4">
          <p className="mb-2 w-fit rounded-sm bg-muted px-3 py-1 text-[9px] leading-relaxed tracking-[0.3em] uppercase lg:text-[10px]">{promotion.sale}</p>
          <h3 className="font-heading text-2xl leading-tight font-bold lg:text-[28px]">{promotion.title}</h3>
          <span className="mt-2 inline-flex min-h-11 items-center gap-1 text-sm tracking-[0.025em] underline-offset-4 group-hover:underline lg:text-base">
            {promotion.cta}
            <ChevronRight className="size-3.5" strokeWidth={1.25} aria-hidden="true" />
          </span>
        </div>
      </a>
    </article>
  );
}
