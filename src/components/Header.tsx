"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/app/providers/CartProvider";
import { nflVikings } from "@/app/fonts";
import { useEffect, useState } from "react";
import FreeShippingNotice from "@/components/FreeShippingNotice";

<FreeShippingNotice />
const Header = () => {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);



  
  // Evita scroll del contenido cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Detectar scroll para cambiar posición del header
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Si el scroll es mayor a 1px (altura del aviso), el header toma la posición superior
      setIsScrolled(scrollY > 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname === "/") return null;

  return (
    <header className={`w-full sticky z-30 transition-all duration-100 ease-out will-change-transform backface-visibility-hidden ${isScrolled ? 'top-0' : 'top-12'}`}>
      {/* Menú principal */}
      <div className="w-full bg-black text-white border-b border-white/10">
        <div className={`max-w-6xl mx-auto px-4 sm:px-6 h-24 flex items-center justify-between md:grid md:grid-cols-[auto_1fr_auto] md:gap-4 ${nflVikings.className}`}>
          {/* Izquierda: logo */}
          <Link href="/inicio" className="flex items-center gap-2 md:justify-self-start" aria-label="Ir al inicio">
            <Image
              src="/LogoLateral.webp"
              alt="Logo BestDrip"
              width={140}
              height={100}
              className="rounded-sm"
            />
          </Link>

          {/* Centro: navegación desktop centrada con fuente de marca */}
          <nav className="hidden md:flex items-center justify-center gap-8 font-brand uppercase tracking-wider text-sm" aria-label="Navegación principal">
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

          {/* Derecha: acciones (mobile-first) */}
          <div className="flex items-center gap-3 md:justify-self-end">
            {/* Buscar */}
            <button
              type="button"
              aria-label="Buscar"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              onClick={() => setIsSearchOpen((v) => !v)}
            >
              {/* Icono lupa */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 4.396 11.857l4.249 4.248a.75.75 0 1 0 1.06-1.06l-4.248-4.25A6.75 6.75 0 0 0 10.5 3.75Zm-5.25 6.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Carrito */}
            <Link href="/carrito" className="relative inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60" aria-label="Ir al carrito">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M2.25 3a.75.75 0 0 0 0 1.5h1.386c.27 0 .505.18.572.442l.7 2.79 1.149 8.042A2.25 2.25 0 0 0 8.278 18h7.444a2.25 2.25 0 0 0 2.221-1.886l.913-5.477a.75.75 0 0 0-.74-.887H6.52l-.34-2.385h12.57a.75.75 0 0 0 0-1.5H5.77a2.25 2.25 0 0 0-2.212 1.73L3.02 7.5H2.25Z" />
              </svg>
              <span aria-live="polite" className="absolute -top-1 -right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-white text-black px-1 text-[10px] font-semibold">{totalItems}</span>
            </Link>

            {/* Hamburguesa (mobile) */}
            <button
              type="button"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 md:hidden"
              onClick={() => setIsMenuOpen((v) => !v)}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 0 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M3.75 6.75h16.5a.75.75 0 0 0 0-1.5H3.75a.75.75 0 0 0 0 1.5Zm16.5 4.5H3.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5Zm0 6H3.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5Z"/></svg>
              )}
            </button>
          </div>
        </div>

        {/* Navegación desktop eliminada de la segunda fila; ahora va centrada entre logo e iconos */}

        {/* Menú móvil como overlay (no empuja el contenido) */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/70"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden
            />
            <nav
              role="dialog"
              aria-modal="true"
              aria-label="Navegación móvil"
              className="relative z-10 h-full w-full flex items-center justify-center"
            >
              {/* Botón cerrar */}
              <button
                type="button"
                aria-label="Cerrar menú"
                className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 0 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"/></svg>
              </button>
              <div className="mx-auto w-full max-w-sm px-6">
                <div className="font-brand uppercase tracking-wider text-lg text-white flex flex-col items-center gap-4">
                  <Link href="/tienda" className="py-2" onClick={() => setIsMenuOpen(false)}>HOMBRE</Link>
                  <Link href="/tienda" className="py-2" onClick={() => setIsMenuOpen(false)}>MUJER</Link>
                  <Link href="/tienda" className="py-2" onClick={() => setIsMenuOpen(false)}>NIÑO/A</Link>
                  <Link href="/tienda" className="py-2" onClick={() => setIsMenuOpen(false)}>ACCESORIOS</Link>
                  <Link href="/tienda" className="py-2" onClick={() => setIsMenuOpen(false)}>MOCHILAS</Link>
                  <Link href="/tienda" className="py-2" onClick={() => setIsMenuOpen(false)}>ZONA FAN</Link>
                </div>
              </div>
            </nav>
          </div>
        )}

        {/* Buscador desplegable (simple) */}
        {isSearchOpen && (
          <div className="border-t border-white/10 md:border-0">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
              <label className="sr-only" htmlFor="site-search">Buscar</label>
              <input
                id="site-search"
                type="search"
                placeholder="Buscar productos..."
                className="w-full rounded-md bg-white/10 placeholder-white/70 text-white px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;


