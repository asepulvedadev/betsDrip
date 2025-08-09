import Image from "next/image";
import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";

const InicioPage = () => {
  return (
    <div className="w-full">
      {/* Hero principal estilo referencia */}
      <section className="relative">
        <div className="relative h-[62vh] min-h-[420px] w-full overflow-hidden">
          <Image
            src="/hero/60-IMG_1709.jpg"
            alt="Tienda BestDrip"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          {/* Logo marca de agua en esquina */}
          <div className="absolute top-4 right-4 select-none pointer-events-none">
            <Image
              src="/logo.webp"
              alt="Marca BetsDrip"
              width={120}
              height={120}
              className="opacity-30"
              aria-hidden
            />
          </div>
          {/* Texto y CTA */}
          <div className="absolute inset-0 flex items-end md:items-center">
            <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pb-10 md:pb-0">
              <div className="max-w-xl">
                <h1 className="font-brand text-white text-3xl sm:text-4xl md:text-5xl leading-tight">
                  LA EXPERIENCIA BETSDRIP
                </h1>
                <p className="mt-3 text-white/90 text-sm md:text-base">
                  Visita nuestro punto de venta o compra en línea con envíos a todo México.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <Link
                    href="/tienda"
                    className="inline-flex items-center justify-center rounded-md bg-white text-black px-5 py-3 text-sm font-semibold shadow hover:bg-white/90"
                    aria-label="Ir a la tienda"
                  >
                    Agendar mi compra
                  </Link>
                  <Link
                    href="/tienda"
                    className="inline-flex items-center justify-center rounded-md border border-white/60 text-white px-5 py-3 text-sm font-medium hover:bg-white/10"
                    aria-label="Ver más"
                  >
                    Ver más
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Grid de productos debajo del hero */}
      <ProductGrid title="Lo nuevo" subtitle="Descubre las últimas novedades de BestDrip." />
    </div>
  );
};

export default InicioPage;


