import { getImageProps } from "next/image";
import { ActionLink } from "./action-link";

type HeroBannerProps = {
  title: string;
  accent: string;
  description: string;
  cta: { label: string; href: string };
  desktopImage: string;
  mobileImage: string;
};

export function HeroBanner({
  title, accent, description, cta, desktopImage, mobileImage,
}: HeroBannerProps) {
  const common = {
    alt: "",
    sizes: "100vw",
    loading: "eager" as const,
    fetchPriority: "high" as const,
  };
  const { props: desktop } = getImageProps({
    ...common, src: desktopImage, width: 2200, height: 1200,
  });
  const { props: mobile } = getImageProps({
    ...common, src: mobileImage, width: 800, height: 600,
  });

  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[630px] items-center overflow-hidden bg-brand-lavender lg:min-h-[min(46.875vw,900px)] lg:py-44">
      {/* picture selects one source before loading; CSS-hidden images could fetch both. */}
      <picture className="absolute inset-0 -z-20">
        <source media="(min-width: 1024px)" srcSet={desktop.srcSet} sizes={desktop.sizes} />

        <img {...mobile} alt="" className="size-full object-cover object-center" />
      </picture>
      <div className="absolute inset-0 -z-10 bg-black/20 lg:bg-transparent" />
      <div className="w-full px-5 pb-8 text-center text-white lg:px-[3%] lg:pb-0 lg:text-left">
        <h1 id="hero-title" className="font-heading text-[clamp(3.25rem,14vw,4rem)] leading-[1.08] font-bold tracking-[-0.035em] lg:text-[clamp(4rem,4.2vw,5rem)]">
          {title}{" "}
          <span className="relative inline-block">
            {accent}
            <svg aria-hidden="true" viewBox="0 0 220 18" fill="none" className="absolute -bottom-3 -left-[4%] h-4 w-[112%] text-accent">
              <path d="M3 11C58 1 145 5 217 14" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </span>
        </h1>
        <p className="mx-auto mt-7 max-w-sm text-lg leading-relaxed font-bold lg:mx-0 lg:max-w-xl lg:text-xl">
          {description}
        </p>
        <ActionLink href={cta.href} className="mt-4">{cta.label}</ActionLink>
      </div>
    </section>
  );
}
