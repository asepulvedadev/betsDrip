"use client";

import { useState } from "react";
import { useCart } from "@/app/providers/CartProvider";
import type { Product } from "@/data/products";

type Props = {
  product: Product;
  defaultSize?: string;
};

const AddToCartButton = ({ product, defaultSize }: Props) => {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleClick = () => {
    if (isAdding) return;
    setIsAdding(true);
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: defaultSize,
    });
    setTimeout(() => setIsAdding(false), 350);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Agregar ${product.name} al carrito`}
      className="inline-flex items-center justify-center rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium tracking-[-.01em] shadow-sm hover:bg-black/85 dark:hover:bg-white/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-white dark:focus-visible:ring-offset-black disabled:opacity-60"
      disabled={isAdding}
    >
      {isAdding ? "Agregando..." : "Agregar al carrito"}
    </button>
  );
};

export default AddToCartButton;


