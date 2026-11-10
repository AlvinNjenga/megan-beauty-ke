import { notFound } from "next/navigation";
import { ProductDetail } from "../../../components/pages";
import { products } from "../../../data/catalogue";
export function generateStaticParams() {
  return products.map((p) => ({ productSlug: p.slug }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const { productSlug } = await params;
  const product = products.find((p) => p.slug === productSlug);
  if (!product) notFound();
  return <ProductDetail key={product.slug} product={product} />;
}
