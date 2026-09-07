import { Plus } from "lucide-react";
import Image from "next/image";
import { discountPercent, type Product } from "@/lib/storefront/products";
import { cn } from "@/lib/utils";
import { ProductPrice } from "./product-price";
import { ProductPreview } from "./product-preview";

type ProductCardProps = {
  product: Product;
  variant?: "boxed" | "bare" | "set";
};

export function ProductCard({ product, variant = "boxed" }: ProductCardProps) {
  const discount = discountPercent(product);
  const bare = variant === "bare";

  return (
    <article className={cn("h-full", !bare && "rounded-[10px] bg-white p-2.5 pb-7 lg:p-3 lg:pb-7", variant === "set" && "bg-muted")}>
      <div className="relative">
        <a href={product.href} aria-label={product.title} className="group relative block aspect-square overflow-hidden rounded-lg focus-visible:outline-3 focus-visible:outline-ring focus-visible:outline-offset-2">
          <Image
            src={product.image}
            alt=""
            fill
            sizes={bare ? "(min-width: 1576px) 369px, (min-width: 1024px) 24vw, (min-width: 640px) 45vw, 85vw" : "(min-width: 1024px) 23vw, (min-width: 640px) 43vw, 82vw"}
            className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.025] motion-reduce:transition-none"
          />
        </a>
        {product.isNew && <span className="pointer-events-none absolute top-0 left-0 bg-accent px-1.5 py-1 text-[9px] tracking-wide uppercase lg:text-[11px]">New</span>}
        {discount !== null && <span className="pointer-events-none absolute top-0 right-0 bg-white/90 px-1.5 py-1 text-[9px] lg:text-[11px]"><span className="sr-only">Save </span>-{discount}%</span>}
        {bare && (
          <div className="absolute right-0 bottom-0 rounded-tl-[28px] bg-background pt-3 pl-3">
            <ProductPreview product={product} compact />
          </div>
        )}
      </div>
      {!bare && (
        <div className="relative mx-auto -mt-6 w-[82%]">
          {variant === "set" ? (
            <div className="grid grid-cols-2 overflow-hidden rounded-[10px] bg-white">
              <ProductPreview product={product} icon="eye" />
              <a href={product.href} aria-label={`View options for ${product.title}`} className="flex min-h-11 items-center justify-center hover:bg-accent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring">
                <Plus className="size-6" strokeWidth={1.4} aria-hidden="true" />
              </a>
            </div>
          ) : <ProductPreview product={product} />}
        </div>
      )}
      <div className={cn("px-2 pt-4 text-center", bare && "pt-5 [&>p]:text-[13px]")}>
        <h3 className={cn("font-heading text-lg leading-tight font-bold", !bare && "lg:text-[22px]")}>
          <a href={product.href} className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-ring">{product.title}</a>
        </h3>
        <ProductPrice product={product} />
      </div>
    </article>
  );
}
