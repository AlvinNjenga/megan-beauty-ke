import Image from "next/image";
import { ActionLink } from "./action-link";

type ImageTextSectionProps = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  watermark?: string;
  cta: { label: string; href: string };
};

export function ImageTextSection({
  id, label, eyebrow, title, description, image, imageAlt, watermark, cta,
}: ImageTextSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 px-5 py-12 lg:px-[3%] lg:py-20">
      <div className="mx-auto grid max-w-[1920px] items-center gap-8 lg:grid-cols-2 lg:gap-0">
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-0">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[10px] lg:min-w-0 lg:flex-1">
            <Image src={image} alt={imageAlt} fill sizes="(min-width: 1024px) 44vw, 100vw" className="object-cover object-[47%_29%]" />
          </div>
          <p className="text-center text-xs tracking-[0.35em] text-muted-foreground uppercase lg:flex lg:w-20 lg:shrink-0 lg:items-center lg:justify-center lg:border-r lg:text-lg">
            <span className="lg:rotate-180 lg:[writing-mode:vertical-rl]">{label}</span>
          </p>
        </div>
        <div className="relative isolate py-2 lg:py-10 lg:pl-[8%]">
          {watermark && (
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-1/2 items-center lg:flex">
              <div className="relative aspect-square w-full">
                <Image src={watermark} alt="" fill sizes="25vw" className="object-contain" />
              </div>
            </div>
          )}
          <p className="mb-2 text-[10px] leading-relaxed tracking-[0.25em] text-muted-foreground uppercase lg:text-[13px]">{eyebrow}</p>
          <h2 id={`${id}-title`} className="font-heading text-[clamp(2.125rem,7vw,2.75rem)] leading-[1.1] font-bold tracking-[-0.025em] lg:text-[clamp(2.75rem,3.5vw,4.25rem)]">
            {title}
          </h2>
          <p className="mt-6 max-w-[760px] text-lg leading-[1.75] tracking-[0.025em] text-muted-foreground lg:mt-8 lg:text-xl">
            {description}
          </p>
          <ActionLink href={cta.href} tone="dark" className="mt-7 lg:mt-9">{cta.label}</ActionLink>
        </div>
      </div>
    </section>
  );
}
