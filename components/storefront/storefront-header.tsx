import { StickyHeader } from "./sticky-header";
import Link from "next/link";
import { Menu, ChevronRight } from "lucide-react";
import type { Collection } from "@/lib/storefront/home-content";

export function StorefrontHeader({ collections }: { collections: Collection[] }) {
  return (
    <StickyHeader>
    <header className="relative flex h-full items-center justify-between rounded-xl bg-white px-4 text-foreground lg:px-9">
      <details className="group xl:hidden">
        <summary aria-label="Browse collections" className="flex size-11 cursor-pointer list-none items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
          <Menu className="size-6" strokeWidth={1.25} />
        </summary>
        <nav aria-label="Mobile collections" className="absolute inset-x-0 top-[calc(100%+8px)] rounded-xl border bg-white p-3 shadow-lg">
          {collections.map((collection) => (
            <a key={collection.slug} href={collection.href} className="block rounded-lg px-4 py-3 hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring">
              {collection.title}
            </a>
          ))}
        </nav>
      </details>
      <nav aria-label="Collections" className="hidden items-center gap-5 text-sm xl:gap-6 xl:text-base xl:flex">
        {collections.slice(0, 3).map((collection) => (
          <a key={collection.slug} href={collection.href} className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-ring">
            {collection.title}
          </a>
        ))}
      </nav>
      <Link href="/" aria-label="Megan Beauty home" className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-heading text-xl font-bold lg:text-2xl">
        megan beauty
      </Link>
      <a href="#collections" className="flex min-h-11 items-center gap-1 rounded-sm text-sm focus-visible:outline-2 focus-visible:outline-ring">
        <span className="hidden sm:inline">Shop collections</span>
        <ChevronRight className="size-5 sm:size-4" aria-hidden="true" />
        <span className="sr-only sm:hidden">Shop collections</span>
      </a>
    </header>
    </StickyHeader>
  );
}
