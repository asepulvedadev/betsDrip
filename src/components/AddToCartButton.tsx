"use client";

import { useState } from "react";
import { useCart } from "@/app/providers/CartProvider";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/button";

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
    <Button
      onClick={handleClick}
      aria-label={`Agregar ${product.name} al carrito`}
      className="tracking-[-.01em] shadow-sm"
      disabled={isAdding}
    >
      {isAdding ? "Agregando..." : "Agregar al carrito"}
    </Button>
  );
};

export default AddToCartButton;


