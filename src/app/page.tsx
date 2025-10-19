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
  const [hasLiked, setHasLiked] = useState(false);

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

    // Check if user has already liked (using localStorage)
    const liked = localStorage.getItem('bestdrip-liked');
    if (liked === 'true') {
      setHasLiked(true);
    }

    return () => clearInterval(interval);
  }, []);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
      localStorage.setItem('bestdrip-liked', 'true');
    }
  };

  return (
    <div className="min-h-screen w-full font-sans bg-black text-white flex flex-col items-center justify-center p-2 md:p-4 relative overflow-hidden">
      <main className="flex flex-col items-center justify-center gap-4 md:gap-6 text-center w-full max-w-4xl py-4">
        <Image
          className="dark:invert w-32 md:w-48 h-auto"
          src="/logo.webp"
          alt="Logo de BestDrip"
          width={300}
          height={63}
          priority
        />
        <div className="w-full">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Coming Soon
          </h1>
          <p className="text-base md:text-lg text-gray-300 mb-6 md:mb-8 max-w-xl mx-auto leading-relaxed px-2">
            Estamos trabajando duro para traerte la mejor experiencia. ¡Mantente atento!
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4 text-center justify-center mb-6 md:mb-8">
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold animate-pulse transition-all duration-500 ease-in-out">{timeLeft.days}</span>
              <span className="text-xs md:text-sm text-gray-400">Días</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold animate-pulse transition-all duration-500 ease-in-out">{timeLeft.hours}</span>
              <span className="text-xs md:text-sm text-gray-400">Horas</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold animate-pulse transition-all duration-500 ease-in-out">{timeLeft.minutes}</span>
              <span className="text-xs md:text-sm text-gray-400">Minutos</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold animate-pulse transition-all duration-500 ease-in-out">{timeLeft.seconds}</span>
              <span className="text-xs md:text-sm text-gray-400">Segundos</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={handleLike}
              disabled={hasLiked}
              className={`flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-colors duration-200 shadow-lg text-sm md:text-base ${
                hasLiked
                  ? 'bg-gray-600 cursor-not-allowed text-gray-300'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              <span className="text-xl md:text-2xl">{hasLiked ? '💖' : '❤️'}</span>
              <span>{hasLiked ? '¡Gracias!' : 'Me gusta'}</span>
            </button>
            <div className="text-base md:text-lg font-semibold">
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
