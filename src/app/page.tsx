"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function SplashPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2026-01-01T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full font-sans bg-black text-white flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <div className="absolute top-4 md:top-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <span className="text-lg md:text-2xl font-bold tracking-wider">01 ENERO 2026</span>
          </div>
          <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-2 rounded-full"></div>
        </div>
      </div>
      <main className="flex flex-col items-center justify-center gap-8 md:gap-12 text-center w-full max-w-6xl">
        <Image
          className="dark:invert w-48 md:w-72 h-auto"
          src="/logo.webp"
          alt="Logo de BestDrip"
          width={300}
          height={63}
          priority
        />
        <div className="w-full">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Coming Soon
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
            Estamos trabajando duro para traerte la mejor experiencia. ¡Mantente atento!
          </p>
          <div className="flex flex-wrap gap-4 md:gap-6 text-center justify-center">
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold animate-pulse transition-all duration-500 ease-in-out">{timeLeft.days}</span>
              <span className="text-sm text-gray-400">Días</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold animate-pulse transition-all duration-500 ease-in-out">{timeLeft.hours}</span>
              <span className="text-sm text-gray-400">Horas</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold animate-pulse transition-all duration-500 ease-in-out">{timeLeft.minutes}</span>
              <span className="text-sm text-gray-400">Minutos</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold animate-pulse transition-all duration-500 ease-in-out">{timeLeft.seconds}</span>
              <span className="text-sm text-gray-400">Segundos</span>
            </div>
          </div>
        </div>
        {/* <Link
          href="/inicio"
          aria-label="Continuar al proyecto"
          tabIndex={0}
          className="inline-flex items-center justify-center rounded-md bg-black text-white dark:bg-white dark:text-black px-5 py-2.5 text-sm font-medium tracking-[-.01em] shadow-sm hover:bg-black/85 dark:hover:bg-white/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-white dark:focus-visible:ring-offset-black"
        >
          Continuar
        </Link> */}
      </main>
    </div>
  );
}
