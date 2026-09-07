import Image from "next/image";
import type { Feature } from "@/lib/storefront/story-content";

function FeatureTile({ feature }: { feature: Feature }) {
  return (
    <li className="flex h-full flex-col items-center bg-accent px-4 py-7 text-center even:bg-[#f7f5f2] lg:px-8 lg:py-8">
      <div className="relative mb-6 aspect-square w-full max-w-[250px] overflow-hidden rounded-full">
        <Image src={feature.image} alt="" fill sizes="(min-width: 1024px) 250px, 42vw" className="object-cover" />
      </div>
      <p className="mb-2 text-[9px] leading-relaxed tracking-[0.2em] text-muted-foreground uppercase lg:text-xs">{feature.eyebrow}</p>
      <h3 className="max-w-80 font-heading text-xl leading-tight font-bold lg:text-[28px]">{feature.title}</h3>
    </li>
  );
}

export function FeatureStrip({ features }: { features: Feature[] }) {
  return (
    <section aria-labelledby="features-title">
      <h2 id="features-title" className="sr-only">Our approach to skincare</h2>
      <ul className="grid grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => <FeatureTile key={feature.id} feature={feature} />)}
      </ul>
    </section>
  );
}
