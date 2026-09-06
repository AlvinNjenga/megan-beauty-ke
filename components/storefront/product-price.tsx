import { formatPrice, type Product } from "@/lib/storefront/products";

export function ProductPrice({ product }: { product: Product }) {
  const onSale = product.compareAt !== null && product.compareAt > product.price;
  return (
    <p className="flex flex-wrap items-baseline justify-center gap-x-1.5 text-[13px] leading-relaxed tracking-[0.025em] lg:text-base">
      <span>
        {onSale && <span className="sr-only">Sale price: </span>}
        {product.fromPrice && "From "}{formatPrice(product.price, product.currency)}
        <span className="ml-1">{product.currency}</span>
      </span>
      {onSale && (
        <span className="text-[10px] text-muted-foreground lg:text-xs">
          <span className="sr-only">Original price: </span>
          <del>{formatPrice(product.compareAt!, product.currency)}</del>
        </span>
      )}
    </p>
  );
}
