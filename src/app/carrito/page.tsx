"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/providers/CartProvider";

const CartPage = () => {
  const { items, subtotal, updateQuantity, removeItem, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] mb-3">Tu carrito está vacío</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Explora nuestros productos y agrega tus favoritos.</p>
        <Link
          href="/tienda"
          className="inline-flex items-center justify-center rounded-md bg-black text-white dark:bg-white dark:text-black px-5 py-2.5 text-sm font-medium tracking-[-.01em] shadow-sm hover:bg-black/85 dark:hover:bg-white/85"
        >
          Ir a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] mb-6">Carrito</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map((item) => (
            <div key={`${item.productId}-${item.size ?? "_"}`} className="flex items-center gap-4 rounded-lg border border-black/5 dark:border-white/10 p-3">
              <div className="relative h-20 w-20 overflow-hidden rounded-md bg-white dark:bg-zinc-900">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" title={item.name}>{item.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">${item.price} {item.size ? `· Talla ${item.size}` : ""}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5"
                    aria-label="Disminuir cantidad"
                    onClick={() => updateQuantity(item.productId, item.size, Math.max(0, item.quantity - 1))}
                  >
                    −
                  </button>
                  <span className="text-sm w-6 text-center" aria-live="polite">{item.quantity}</span>
                  <button
                    type="button"
                    className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5"
                    aria-label="Aumentar cantidad"
                    onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs border border-red-300 text-red-700 dark:border-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30"
                    aria-label="Eliminar del carrito"
                    onClick={() => removeItem(item.productId, item.size)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
              <div className="shrink-0 text-sm font-medium">${item.price * item.quantity}</div>
            </div>
          ))}
        </div>
        <aside className="rounded-lg border border-black/5 dark:border-white/10 p-4 h-fit">
          <h2 className="text-lg font-semibold mb-2">Resumen</h2>
          <div className="flex items-center justify-between text-sm mb-4">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <button
            type="button"
            className="w-full inline-flex items-center justify-center rounded-md bg-black text-white dark:bg-white dark:text-black px-5 py-2 text-sm font-medium tracking-[-.01em] shadow-sm hover:bg-black/85 dark:hover:bg-white/85 mb-2"
            aria-label="Proceder al pago"
          >
            Checkout (demo)
          </button>
          <button
            type="button"
            className="w-full inline-flex items-center justify-center rounded-md border border-black/10 dark:border-white/15 px-5 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5"
            aria-label="Vaciar carrito"
            onClick={clear}
          >
            Vaciar carrito
          </button>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;


