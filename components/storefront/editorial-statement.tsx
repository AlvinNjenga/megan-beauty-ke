import Image from "next/image";
import { cn } from "@/lib/utils";

function InlineImage({ src, className }: { src: string; className?: string }) {
  return (
    <span className={cn("relative mx-2 inline-block size-14 align-middle lg:mx-5 lg:size-32", className)}>
      <Image src={src} alt="" fill sizes="(min-width: 1024px) 128px, 56px" className="object-cover" />
    </span>
  );
}

export function EditorialStatement() {
  return (
    <section aria-labelledby="editorial-title" className="px-6 pb-14 text-center lg:px-14 lg:pb-20">
      <h2 id="editorial-title" className="mx-auto max-w-[1320px] font-heading text-[clamp(2rem,8.5vw,2.5rem)] leading-[1.85] font-normal tracking-[-0.015em] lg:text-[clamp(3rem,3.45vw,4.125rem)] lg:leading-[1.8]">
        <span className="block">
          Nourish your{" "}
          <InlineImage src="/images/olivelle/editorial-skin.webp" className="overflow-hidden rounded-[55%_45%_58%_42%]" />
          {" "}body. Skincare you&apos;ll
        </span>
        <span>
          love{" "}
          <InlineImage src="/images/olivelle/editorial-heart.webp" className="w-14 lg:w-28 [&_img]:object-contain" />
          {" "}every day{" "}
          <InlineImage src="/images/olivelle/products/glow-oil.webp" className="mx-auto mt-4 mb-2 block! overflow-hidden rounded-[50%_45%_50%_42%] lg:mx-5 lg:my-0 lg:inline-block!" />
        </span>
      </h2>
      <p className="mx-auto mt-5 max-w-[900px] text-lg leading-[1.75] tracking-[0.025em] text-muted-foreground sm:text-xl lg:mt-7 lg:text-[21px] lg:leading-[1.85]">
        Discover skincare essentials designed to nourish, hydrate, and enhance your natural glow.
        From botanical facial oils and beauty tools to luxurious self-care sets, everything you
        need for radiant, healthy-looking skin.
      </p>
    </section>
  );
}
