import type { Collection } from "@/lib/storefront/home-content";
import { CollectionCard } from "./collection-card";
import { ScrollRail } from "./scroll-rail";

export function CollectionRail({ collections }: { collections: Collection[] }) {
  return (
    <section id="collections" aria-labelledby="collections-title" className="relative z-10 -mt-[132px] scroll-mt-24 pb-16 lg:-mt-[170px] lg:pb-24">
      <h2 id="collections-title" className="sr-only">Shop by collection</h2>
      <ScrollRail label="Shop by collection">
        {collections.map((collection) => (
          <li key={collection.slug} className="w-[43vw] shrink-0 snap-start sm:w-[30vw] lg:w-[calc((100%-5.6vw)/5)]">
            <CollectionCard collection={collection} />
          </li>
        ))}
      </ScrollRail>
    </section>
  );
}
