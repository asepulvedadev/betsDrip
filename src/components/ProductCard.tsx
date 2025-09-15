import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import AddToCartButton from "./AddToCartButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <Card className="group rounded-xl border-black/5 dark:border-white/10 overflow-hidden shadow-sm">
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
      <CardContent className="p-4 flex flex-col gap-3">
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
          <Button asChild variant="outline" size="sm" className="text-xs">
            <Link
              href={`/producto/${product.slug}`}
              aria-label={`Ver ${product.name}`}
            >
              Ver
            </Link>
          </Button>
          <AddToCartButton product={product} defaultSize={product.sizes?.[0]} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;


