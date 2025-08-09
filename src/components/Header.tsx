"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/app/providers/CartProvider";
import { nflVikings } from "@/app/fonts";

const Header = () => {
  const pathname = usePathname();
  const { totalItems } = useCart();

  if (pathname === "/") return null;

  return (
    <header className="w-full sticky top-0 z-30">
      {/* Barra superior de aviso */}
      <div className="w-full bg-black text-white text-[11px] sm:text-xs tracking-wide text-center py-2">
        ENVÍO GRATIS A TODO MÉXICO <a href="https://www.bestdrip.com.mx" className="text-white"> Ver Mas </a>
      </div>
      {/* Menú principal */}
      <div className="w-full bg-zinc-900 text-white border-b border-white/10">
        <div className={`max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between ${nflVikings.className}`}>
          <Link href="/inicio" className="flex items-center gap-2" aria-label="Ir al inicio">
            <Image
              src="/LogoLateral.webp"
              alt="Logo BestDrip"
              width={150}
              height={120}
              className="rounded-sm"
            />
            
          </Link>
          <nav className="hidden md:flex items-center gap-8 font-brand uppercase tracking-wider text-sm" aria-label="Navegación principal">
            <Link href="/tienda" className="hover:opacity-80" aria-label="Ir a la tienda">
              HOMBRE
            </Link>
            <Link href="/tienda" className="hover:opacity-80" aria-label="Ir a la tienda mujer">
              MUJER
            </Link>
            <Link href="/tienda" className="hover:opacity-80" aria-label="Ir a la tienda niño">
              NIÑO/A
            </Link>
            <Link href="/tienda" className="hover:opacity-80" aria-label="Ir a accesorios">
              ACCESORIOS
            </Link>
            <Link href="/tienda" className="hover:opacity-80" aria-label="Ir a mochilas">
              MOCHILAS
            </Link>
            <Link href="/tienda" className="hover:opacity-80" aria-label="Ir a zona fan">
              ZONA FAN
            </Link>
          </nav>
          <Link href="/carrito" className="relative text-sm" aria-label="Ir al carrito">
            Carrito
            <span
              aria-live="polite"
              className="absolute -top-2 -right-3 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white text-black px-1 text-[11px] font-semibold"
            >
              {totalItems}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;


