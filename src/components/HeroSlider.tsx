"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
        className="relative h-[calc(100svh-6rem)] min-h-[520px] w-full overflow-hidden"
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
                  <Link
                    href={primaryHref}
                    className="inline-flex items-center justify-center rounded-md bg-white text-black px-5 py-3 text-sm font-semibold shadow hover:bg-white/90"
                    aria-label={primaryLabel}
                  >
                    {primaryLabel}
                  </Link>
                )}
                {secondaryHref && (
                  <Link
                    href={secondaryHref}
                    className="inline-flex items-center justify-center rounded-md border border-white/60 text-white px-5 py-3 text-sm font-medium hover:bg-white/10"
                    aria-label={secondaryLabel}
                  >
                    {secondaryLabel}
                  </Link>
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
      </div>
    </section>
  );
};

export default HeroSlider;


