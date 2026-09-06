import Image from "next/image";
import type { Collection } from "@/lib/storefront/home-content";

export function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <a
      href={collection.href}
      className="group relative block aspect-square overflow-hidden rounded-[10px] bg-accent outline-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-4"
    >
      <Image
        src={collection.image}
        alt=""
        fill
        sizes="(min-width: 1024px) 19vw, (min-width: 640px) 30vw, 43vw"
        className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.035] motion-reduce:transition-none"
      />
      <h3 className="absolute inset-x-3 bottom-4 rounded-[10px] bg-white px-2 py-2 text-center font-heading text-[clamp(1rem,4.3vw,1.25rem)] leading-tight font-bold text-foreground lg:inset-x-5 lg:text-[clamp(1.1rem,1.3vw,1.625rem)]">
        {collection.title}
      </h3>
    </a>
  );
}
