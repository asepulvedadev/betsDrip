import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/data/products";
import AddToCartButton from "@/components/AddToCartButton";

type Props = {
  params: { slug: string };
};

export default function ProductDetailPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) return notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square rounded-xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-zinc-900">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold tracking-[-0.02em]">{product.name}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">{product.description}</p>
          <div className="flex items-center gap-2">
            {product.badges?.map((b) => (
              <span key={b} className="rounded-full bg-black text-white dark:bg-white dark:text-black px-2 py-1 text-xs font-semibold">
                {b}
              </span>
            ))}
          </div>
          <div className="text-lg font-semibold">${product.price}</div>
          <div className="flex items-center gap-3 pt-2">
            <AddToCartButton product={product} defaultSize={product.sizes?.[0]} />
          </div>
          {product.sizes && (
            <p className="text-xs text-gray-500 dark:text-gray-400">Tallas disponibles: {product.sizes.join(", ")}</p>
          )}
        </div>
      </div>
    </div>
  );
}


