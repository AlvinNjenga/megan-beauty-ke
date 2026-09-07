import { HeartHandshake, Soup, FlaskConical, HandHeart } from "lucide-react";

const benefits = [
  { title: "Cruelty Free", description: "Cosmetics for a kinder World", icon: HeartHandshake },
  { title: "Organic Cosmetics", description: "Nourish Your Skin with Nature", icon: Soup },
  { title: "Made with Love", description: "Beautifully Crafted with Love", icon: FlaskConical },
  { title: "Strong Formula", description: "A Formula For Flawless Skin", icon: HandHeart },
];

export function BeautyBenefits() {
  return (
    <section aria-labelledby="beauty-benefits-title" className="px-4 pb-9 lg:px-[3%] lg:pb-14">
      <h2 id="beauty-benefits-title" className="sr-only">Our beauty values</h2>
      <ul className="grid gap-3 lg:grid-cols-4 lg:gap-6">
        {benefits.map(({ title, description, icon: Icon }) => (
          <li key={title} className="flex min-w-0 items-center justify-between gap-4 rounded-[10px] bg-muted px-5 py-4 lg:min-h-24 lg:px-6">
            <div className="min-w-0">
              <h3 className="font-heading text-lg leading-tight font-bold lg:text-2xl">{title}</h3>
              <p className="mt-1 text-xs leading-snug tracking-[0.035em] text-muted-foreground lg:text-base">{description}</p>
            </div>
            <Icon className="size-8 shrink-0" strokeWidth={1.4} aria-hidden="true" />
          </li>
        ))}
      </ul>
    </section>
  );
}
