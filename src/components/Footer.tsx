import Link from "next/link";
import Image from "next/image";
import { nflVikings } from "@/app/fonts";

const Footer = () => {
  return (
    <footer className="w-full bg-zinc-900 text-white border-t border-white/10 mt-12">
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 py-10 ${nflVikings.className}`}>
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div className="flex items-center gap-3">
            <Image src="/logo.webp" alt="Logo BestDrip" width={40} height={40} className="rounded-sm" />
            <span className="font-brand uppercase tracking-wider text-base leading-none">BESTDRIP</span>
          </div>

          <nav aria-label="Enlaces del sitio" className="flex items-center gap-6 text-sm uppercase tracking-wider">
            <Link href="/tienda" className="hover:opacity-80">Tienda</Link>
            <Link href="/carrito" className="hover:opacity-80">Carrito</Link>
            <Link href="/inicio" className="hover:opacity-80">Inicio</Link>
          </nav>
        </div>

        <div className="mt-8 text-xs text-white/60 text-center md:text-left">
          © {new Date().getFullYear()} BestDrip. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;


