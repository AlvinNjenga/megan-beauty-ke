import Image from "next/image";
import { discountPercent, type Product } from "@/lib/storefront/products";
import { ProductPrice } from "./product-price";
import { ProductPreview } from "./product-preview";

export function ProductCard({ product }: { product: Product }) {
  const discount = discountPercent(product);
  return (
    <article className="h-full rounded-[10px] bg-white p-2.5 pb-7 lg:p-3 lg:pb-7">
      <div className="relative">
        <a href={product.href} aria-label={product.title} className="group relative block aspect-square overflow-hidden rounded-lg focus-visible:outline-3 focus-visible:outline-ring focus-visible:outline-offset-2">
          <Image
            src={product.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 23vw, (min-width: 640px) 43vw, 82vw"
            className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.025] motion-reduce:transition-none"
          />
        </a>
        {product.isNew && <span className="pointer-events-none absolute top-0 left-0 bg-accent px-1.5 py-1 text-[9px] tracking-wide uppercase lg:text-[11px]">New</span>}
        {discount !== null && <span className="pointer-events-none absolute top-0 right-0 bg-white/90 px-1.5 py-1 text-[9px] lg:text-[11px]"><span className="sr-only">Save </span>-{discount}%</span>}
      </div>
      <div className="relative mx-auto -mt-6 w-[82%]">
        <ProductPreview product={product} />
      </div>
      <div className="px-2 pt-4 text-center lg:pt-4">
        <h3 className="font-heading text-lg leading-tight font-bold lg:text-[22px]">
          <a href={product.href} className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-ring">{product.title}</a>
        </h3>
        <ProductPrice product={product} />
      </div>
    </article>
  );
}
