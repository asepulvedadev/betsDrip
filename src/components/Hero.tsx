import Image from "next/image";
import Link from "next/link";

type HeroProps = {
  backgroundSrc?: string;
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
};

const Hero = ({
  backgroundSrc = "/hero/60-IMG_1709.jpg",
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
  watermarkOpacityClass = "opacity-80",
}: HeroProps) => {
  return (
    <section className="relative">
      <div className="relative h-[calc(100svh-6rem)] min-h-[520px] w-full overflow-hidden">
        <Image
          src={backgroundSrc}
          alt="Tienda BestDrip"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
        {/* Logo marca de agua en esquina */}
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
        {/* Texto y CTA */}
        <div className="absolute inset-0 flex items-end md:items-center">
          <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pb-10 md:pb-0">
            <div className="max-w-xl">
              <h1 className="font-brand text-white text-3xl sm:text-4xl md:text-5xl leading-tight">
                {title}
              </h1>
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
      </div>
    </section>
  );
};

export default Hero;


