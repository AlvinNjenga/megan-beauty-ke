import Image from "next/image";
import { Eye, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Product } from "@/lib/storefront/products";
import { ActionLink } from "./action-link";
import { ProductPrice } from "./product-price";

export function ProductPreview({ product, compact = false, icon = "menu" }: { product: Product; compact?: boolean; icon?: "menu" | "eye" }) {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="ghost" className={compact ? "size-11 rounded-full bg-accent hover:bg-accent/70" : "h-11 w-full rounded-t-[10px] rounded-b-none bg-white hover:bg-accent"} />} aria-label={`Preview ${product.title}`}>
        {icon === "eye" ? <Eye className="size-5" strokeWidth={1.4} aria-hidden="true" /> : <Menu className="size-5" strokeWidth={1.4} aria-hidden="true" />}
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
