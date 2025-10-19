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

  const [likes, setLikes] = useState(0);

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

  const handleLike = () => {
    setLikes(prev => prev + 1);
  };

  return (
    <div className="h-screen w-full font-sans bg-black text-white flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <main className="flex flex-col items-center justify-center gap-8 md:gap-12 text-center w-full max-w-6xl">
        <Image
          className="dark:invert w-72 h-auto"
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
          <div className="flex flex-wrap gap-4 md:gap-6 text-center justify-center mb-8 md:mb-12">
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
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleLike}
              className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200 shadow-lg"
            >
              <span className="text-2xl">❤️</span>
              <span>Me gusta</span>
            </button>
            <div className="text-lg font-semibold">
              {likes} {likes === 1 ? 'like' : 'likes'}
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
