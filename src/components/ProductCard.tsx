import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import AddToCartButton from "./AddToCartButton";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <div className="group rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
      <Link href={`/producto/${product.slug}`} aria-label={`Ver detalles de ${product.name}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold truncate" title={product.name}>
              {product.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate" title={product.description}>
              {product.description}
            </p>
          </div>
          <span className="shrink-0 rounded-md bg-black text-white dark:bg-white dark:text-black px-2 py-1 text-xs font-semibold">
            ${product.price}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/producto/${product.slug}`}
            className="inline-flex items-center justify-center rounded-md border border-black/10 dark:border-white/15 px-3 py-2 text-xs font-medium hover:bg-black/5 dark:hover:bg-white/5"
            aria-label={`Ver ${product.name}`}
          >
            Ver
          </Link>
          <AddToCartButton product={product} defaultSize={product.sizes?.[0]} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;


