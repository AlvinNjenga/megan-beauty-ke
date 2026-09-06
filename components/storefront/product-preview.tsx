import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Product } from "@/lib/storefront/products";
import { ActionLink } from "./action-link";
import { ProductPrice } from "./product-price";

export function ProductPreview({ product }: { product: Product }) {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="ghost" className="h-11 w-full rounded-t-[10px] rounded-b-none bg-white hover:bg-accent" />} aria-label={`Preview ${product.title}`}>
        <Menu className="size-5" strokeWidth={1.4} aria-hidden="true" />
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] overflow-y-auto p-6 sm:max-w-xl motion-reduce:animate-none [&>[data-slot=dialog-close]]:size-11">
        <DialogHeader>
          <DialogTitle className="pr-8 font-heading text-3xl leading-tight font-bold">{product.title}</DialogTitle>
          <DialogDescription>Explore this product and its available options.</DialogDescription>
        </DialogHeader>
        <div className="relative mx-auto aspect-square w-full max-w-80 overflow-hidden rounded-xl bg-muted">
          <Image src={product.image} alt={product.title} fill sizes="320px" className="object-cover" />
        </div>
        <ProductPrice product={product} />
        <ActionLink href={product.href} className="justify-self-center">View product</ActionLink>
      </DialogContent>
    </Dialog>
  );
}
