import { notFound } from "next/navigation";
import { content } from "@/content";
import { ProductDetail } from "@/components/ProductDetail";

export async function generateStaticParams() {
  return content.products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = content.products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
