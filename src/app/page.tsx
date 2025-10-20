"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function SplashPage() {
  const [showVideo, setShowVideo] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [deviceId, setDeviceId] = useState('');

  useEffect(() => {
    // Detect if device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileDevice = /android|avantgo|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(userAgent);
      setIsMobile(isMobileDevice);
    };

    checkMobile();

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

    // Generate or get device ID
    let device = localStorage.getItem('bestdrip-device-id');
    if (!device) {
      device = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('bestdrip-device-id', device);
    }
    setDeviceId(device);

    // Load likes data
    loadLikesData();

    return () => clearInterval(interval);
  }, []);

  const loadLikesData = async () => {
    try {
      const response = await fetch('/api/likes');
      const data = await response.json();
      setLikes(data.totalLikes);

      // Check if this device has liked
      const device = localStorage.getItem('bestdrip-device-id');
      const hasLikedBefore = data.devices.includes(device);
      setHasLiked(hasLikedBefore);
    } catch (error) {
      console.error('Error loading likes:', error);
    }
  };

  const handleLike = async () => {
    if (!hasLiked && deviceId) {
      try {
        const response = await fetch('/api/likes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ deviceId }),
        });

        if (response.ok) {
          const data = await response.json();
          setLikes(data.totalLikes);
          setHasLiked(true);
        }
      } catch (error) {
        console.error('Error liking:', error);
      }
    }
  };

  if (showVideo) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        {isMobile ? (
          // For mobile: show play button first
          <div className="text-center">
            <button
              onClick={() => {
                  // For mobile: simulate video playback and transition
                  const playVideo = () => {
                    setTimeout(() => setShowVideo(false), 14000); // 14 seconds to account for button press delay
                  };
                  playVideo();
                }}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl mb-4"
            >
              ▶️ Reproducir Video
            </button>
            <p className="text-white text-sm">Toca para ver el video de BESTDRIP</p>
          </div>
        ) : (
          // For desktop: autoplay video
          <iframe
            ref={videoRef}
            src="https://player.cloudinary.com/embed/?cloud_name=dipoc90ti&public_id=BESTDRIP_adspfj&profile=cld-default&controls=false&autoplay=true&muted=false&loop=false"
            width="100%"
            height="100%"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            style={{ border: 'none' }}
            onLoad={() => {
              // Auto-transition after video duration
              const videoDuration = 14000; // 14 seconds for smoother transition
              setTimeout(() => {
                setShowVideo(false);
              }, videoDuration);
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="h-screen w-full font-sans bg-black text-white flex flex-col items-center justify-center p-2 md:p-4 relative overflow-hidden">
      <main className="flex flex-col items-center justify-center gap-4 md:gap-6 text-center w-full max-w-4xl">
        <Image
          className="w-32 md:w-48 h-auto animate-pulse"
          src="/globe-darkmode.svg"
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
            Estamos trabajando duro para traerte tu mejor Drip!
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
              className={`flex items-center justify-center w-16 h-16 md:w-20 md:h-20 border-2 rounded-lg font-semibold transition-all duration-200 text-sm md:text-base ${
                hasLiked
                  ? 'border-gray-600 text-gray-400 cursor-not-allowed shadow-gray-600/50 shadow-lg'
                  : 'border-red-500 text-red-500 hover:border-red-400 hover:text-red-400 hover:shadow-red-500/50 shadow-lg hover:shadow-xl'
              }`}
            >
              <span className="text-2xl md:text-3xl">{hasLiked ? '💖' : '❤️'}</span>
            </button>
            <div className="text-base md:text-lg font-semibold text-gray-300">
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
