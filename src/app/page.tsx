import Image from "next/image";
import Link from "next/link";

export default function SplashPage() {
  return (
    <div className="min-h-screen w-full font-sans bg-white dark:bg-black text-black dark:text-white flex items-center justify-center p-8">
      <main className="flex flex-col items-center justify-center gap-8">
        <Image
          className="dark:invert"
          src="/logo.webp"
          alt="Logo de BetsDrip"
          width={200}
          height={42}
          priority
        />
        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300" aria-live="polite" aria-busy="true">
          <span
            aria-hidden="true"
            className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"
          />
          <span className="text-sm tracking-[-.01em]">Cargando...</span>
        </div>
        <Link
          href="/inicio"
          aria-label="Continuar al proyecto"
          tabIndex={0}
          className="inline-flex items-center justify-center rounded-md bg-black text-white dark:bg-white dark:text-black px-5 py-2.5 text-sm font-medium tracking-[-.01em] shadow-sm hover:bg-black/85 dark:hover:bg-white/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-white dark:focus-visible:ring-offset-black"
        >
          Continuar
        </Link>
      </main>
    </div>
  );
}
