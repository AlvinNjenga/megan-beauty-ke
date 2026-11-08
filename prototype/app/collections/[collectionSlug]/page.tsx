import { notFound } from "next/navigation";
import { Collection } from "../../../components/pages";
import { collections } from "../../../data/catalogue";
export function generateStaticParams() {
  return collections.map((c) => ({ collectionSlug: c.slug }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ collectionSlug: string }>;
}) {
  const { collectionSlug } = await params;
  if (!collections.some((c) => c.slug === collectionSlug)) notFound();
  return <Collection key={collectionSlug} slug={collectionSlug} />;
}
