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
    <div className="min-h-screen w-full font-sans bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 text-black dark:text-white flex items-center justify-center p-8">
      <main className="flex flex-col items-center justify-center gap-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-12 max-w-md w-full">
        <Image
          className="dark:invert"
          src="/logo.webp"
          alt="Logo de BestDrip"
          width={200}
          height={42}
          priority
        />
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Estamos trabajando duro para traerte la mejor experiencia. ¡Mantente atento!
          </p>
          <div className="flex gap-4 text-center">
            <div className="flex flex-col">
              <span className="text-3xl font-bold">{timeLeft.days}</span>
              <span className="text-sm text-gray-500">Días</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold">{timeLeft.hours}</span>
              <span className="text-sm text-gray-500">Horas</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold">{timeLeft.minutes}</span>
              <span className="text-sm text-gray-500">Minutos</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold">{timeLeft.seconds}</span>
              <span className="text-sm text-gray-500">Segundos</span>
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
