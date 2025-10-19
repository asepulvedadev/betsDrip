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
    <div className="min-h-screen w-full font-sans bg-black text-white flex flex-col items-center justify-center p-8 relative">
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <span className="text-2xl font-bold tracking-wider">01 ENERO 2026</span>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-2 rounded-full"></div>
        </div>
      </div>
      <main className="flex flex-col items-center justify-center gap-12 text-center">
        <Image
          className="dark:invert"
          src="/logo.webp"
          alt="Logo de BestDrip"
          width={300}
          height={63}
          priority
        />
        <div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Coming Soon
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl leading-relaxed">
            Estamos trabajando duro para traerte la mejor experiencia. ¡Mantente atento!
          </p>
          <div className="flex gap-8 text-center justify-center">
            <div className="flex flex-col items-center bg-gray-900 rounded-2xl p-6 min-w-[120px] shadow-2xl border border-gray-800">
              <span className="text-6xl font-bold animate-pulse transition-all duration-500 ease-in-out text-blue-400">{timeLeft.days}</span>
              <span className="text-sm text-gray-400 uppercase tracking-wider mt-2">Días</span>
            </div>
            <div className="flex flex-col items-center bg-gray-900 rounded-2xl p-6 min-w-[120px] shadow-2xl border border-gray-800">
              <span className="text-6xl font-bold animate-pulse transition-all duration-500 ease-in-out text-green-400">{timeLeft.hours}</span>
              <span className="text-sm text-gray-400 uppercase tracking-wider mt-2">Horas</span>
            </div>
            <div className="flex flex-col items-center bg-gray-900 rounded-2xl p-6 min-w-[120px] shadow-2xl border border-gray-800">
              <span className="text-6xl font-bold animate-pulse transition-all duration-500 ease-in-out text-yellow-400">{timeLeft.minutes}</span>
              <span className="text-sm text-gray-400 uppercase tracking-wider mt-2">Minutos</span>
            </div>
            <div className="flex flex-col items-center bg-gray-900 rounded-2xl p-6 min-w-[120px] shadow-2xl border border-gray-800">
              <span className="text-6xl font-bold animate-pulse transition-all duration-500 ease-in-out text-red-400">{timeLeft.seconds}</span>
              <span className="text-sm text-gray-400 uppercase tracking-wider mt-2">Segundos</span>
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
