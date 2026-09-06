import { EditorialStatement } from "@/components/storefront/editorial-statement";
import { FeaturedProducts } from "@/components/storefront/featured-products";
import { CollectionRail } from "@/components/storefront/collection-rail";
import { HeroBanner } from "@/components/storefront/hero-banner";
import { StorefrontHeader } from "@/components/storefront/storefront-header";
import { collections, hero } from "@/lib/storefront/home-content";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="sr-only fixed top-3 left-3 z-50 rounded-lg bg-white p-3 text-foreground focus:not-sr-only">
        Skip to content
      </a>
      <div className="relative">
        <StorefrontHeader collections={collections} />
        <main id="main-content" tabIndex={-1} className="outline-none">
          <HeroBanner {...hero} />
          <CollectionRail collections={collections} />
          <EditorialStatement />
          <FeaturedProducts />
        </main>
      </div>
    </>
  );
}
