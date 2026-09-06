import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { featuredCollections } from "@/lib/storefront/products";
import { ProductCard } from "./product-card";
import { ScrollRail } from "./scroll-rail";
import { SectionHeading } from "./section-heading";

export function FeaturedProducts() {
  return (
    <section id="featured-products" aria-labelledby="featured-title" className="scroll-mt-24 bg-muted py-12 lg:pt-14 lg:pb-24">
      <SectionHeading id="featured-title" eyebrow="Shop our favorites">Glow Essentials</SectionHeading>
      <Tabs defaultValue={featuredCollections[0].slug} className="mt-5 gap-0 lg:mt-4">
        <TabsList aria-label="Featured product collections" className="mx-auto mb-5 grid w-[calc(100%-28px)] max-w-md grid-cols-3 gap-1.5 bg-transparent p-0 group-data-horizontal/tabs:h-auto lg:mb-9 lg:max-w-xl lg:gap-9">
          {featuredCollections.map((collection) => (
            <TabsTrigger
              key={collection.slug}
              value={collection.slug}
              className="min-h-9 gap-2 rounded-2xl border-border px-3 py-2 text-left text-[9px] leading-[1.05] font-normal tracking-[0.04em] whitespace-normal uppercase data-active:bg-transparent data-active:font-bold data-active:shadow-none lg:min-h-11 lg:text-[11px]"
            >
              <span>{collection.title}</span>
              <span className="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full bg-black/[0.025] text-[10px] tracking-normal lg:size-6">
                {collection.products.length}
                <span className="sr-only"> products</span>
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        {featuredCollections.map((collection) => (
          <TabsContent key={collection.slug} value={collection.slug}>
            <ScrollRail
              label={collection.title}
              controlLabel="products"
              controlsClassName="hidden md:flex"
              className="scroll-px-3.5 gap-2.5 px-3.5 lg:gap-6"
            >
              {collection.products.map((product) => (
                <li key={product.slug} className="w-[85vw] shrink-0 snap-start sm:w-[45vw] lg:w-[calc((100%-72px)/4)]">
                  <ProductCard product={product} />
                </li>
              ))}
            </ScrollRail>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
