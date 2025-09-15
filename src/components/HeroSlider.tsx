"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type Slide = {
  src: string;
  alt?: string;
};

type HeroSliderProps = {
  slides: Slide[];
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  watermarkSrc?: string;
  watermarkAlt?: string;
  watermarkWidth?: number;
  watermarkHeight?: number;
  watermarkOpacityClass?: string;
  intervalMs?: number;
};

const HeroSlider = ({
  slides,
  title = "LA EXPERIENCIA BESTDRIP",
  subtitle = "Visita nuestro punto de venta o compra en línea con envíos a todo México.",
  primaryHref = "/tienda",
  primaryLabel = "Agendar mi compra",
  secondaryHref = "/tienda",
  secondaryLabel = "Ver más",
  watermarkSrc = "/LogoLateral.webp",
  watermarkAlt = "Marca BestDrip",
  watermarkWidth = 120,
  watermarkHeight = 80,
  watermarkOpacityClass = "opacity-90",
  intervalMs = 3000,
}: HeroSliderProps) => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slideTo = (next: number) => {
    const count = slides.length;
    if (count === 0) return;
    const normalized = ((next % count) + count) % count;
    setIndex(normalized);
  };

  const handlePrev = () => slideTo(index - 1);
  const handleNext = () => slideTo(index + 1);

  useEffect(() => {
    if (slides.length <= 1) return;
    if (isPaused) return;
    const id = window.setInterval(() => {
      setIndex((prev) => ((prev + 1) % slides.length));
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [slides.length, intervalMs, isPaused]);

  // Pausa autoplay en hover o focus
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Swipe básico
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
    handleMouseEnter();
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    const end = e.changedTouches[0]?.clientX ?? null;
    touchStartX.current = null;
    handleMouseLeave();
    if (start == null || end == null) return;
    const delta = end - start;
    if (Math.abs(delta) < 40) return;
    if (delta > 0) handlePrev();
    else handleNext();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  return (
    <section className="relative" aria-roledescription="carousel">
      <div
        className="relative mb-10 h-[calc(100vh-140px)] min-h-[500px] w-full overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label="Slider de hero"
      >
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
            aria-hidden={i !== index}
          >
            <Image
              src={slide.src}
              alt={slide.alt ?? "Tienda BestDrip"}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

        {/* Marca de agua */}
        <div className="absolute top-4 right-4 select-none pointer-events-none">
          <Image
            src={watermarkSrc}
            alt={watermarkAlt}
            width={watermarkWidth}
            height={watermarkHeight}
            className={watermarkOpacityClass}
            aria-hidden
          />
        </div>

        {/* Texto y CTAs */}
        <div className="absolute inset-0 flex items-end md:items-center">
          <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pb-10 md:pb-0">
            <div className="max-w-xl">
              <h1 className="font-brand text-white text-3xl sm:text-4xl md:text-5xl leading-tight">{title}</h1>
              <p className="mt-3 text-white/90 text-sm md:text-base">{subtitle}</p>
              <div className="mt-6 flex items-center gap-3">
                {primaryHref && (
                  <Button asChild variant="default" className="bg-white text-black hover:bg-white/90 shadow">
                    <Link
                      href={primaryHref}
                      aria-label={primaryLabel}
                    >
                      {primaryLabel}
                    </Link>
                  </Button>
                )}
                {secondaryHref && (
                  <Button asChild variant="outline" className="border-white/60 text-white hover:bg-white/10">
                    <Link
                      href={secondaryHref}
                      aria-label={secondaryLabel}
                    >
                      {secondaryLabel}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Controles */}
        <button
          type="button"
          aria-label="Anterior"
          className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          onClick={() => {
            setIsPaused(true);
            handlePrev();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path fillRule="evenodd" d="M15.53 4.47a.75.75 0 0 1 0 1.06L9.56 11.5l5.97 5.97a.75.75 0 1 1-1.06 1.06l-6.5-6.5a.75.75 0 0 1 0-1.06l6.5-6.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd"/></svg>
        </button>
        <button
          type="button"
          aria-label="Siguiente"
          className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          onClick={() => {
            setIsPaused(true);
            handleNext();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path fillRule="evenodd" d="M8.47 4.47a.75.75 0 0 0 0 1.06l5.97 5.97-5.97 5.97a.75.75 0 0 0 1.06 1.06l6.5-6.5a.75.75 0 0 0 0-1.06l-6.5-6.5a.75.75 0 0 0-1.06 0Z" clipRule="evenodd"/></svg>
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir al slide ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full ${i === index ? "bg-white" : "bg-white/50 hover:bg-white/70"}`}
              onClick={() => {
                setIsPaused(true);
                slideTo(i);
              }}
            />
          ))}
        </div>

        {/* Botón flotante de WhatsApp */}
        <a
          href="https://wa.me/528113822991?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20BestDrip"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSlider;


