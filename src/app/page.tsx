"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import VideoPreloader from "@/components/VideoPreloader";

export default function SplashPage() {
  const [showVideo, setShowVideo] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [videoKey] = useState(Date.now()); // Key única para esta carga
  const [showHome, setShowHome] = useState(false);

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
    const interval = setInterval(updateCountdown, 500);

    // Generate or get device ID
    let device = localStorage.getItem('bestdrip-device-id');
    if (!device) {
      device = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('bestdrip-device-id', device);
    }
    setDeviceId(device);

    // Load likes data
    loadLikesData();

    // Initialize audio
    const initAudio = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.3; // 30% volume
          audioRef.current.muted = isMuted; // Set initial mute state
          await audioRef.current.play();
        } catch (error) {
          console.log('Audio autoplay blocked, waiting for user interaction');
        }
      }
    };

    // Start audio after a short delay to ensure DOM is ready
    setTimeout(initAudio, 1000);

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

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      if (!isMuted) {
        // If unmuting, try to play
        audioRef.current.play().catch(error => {
          console.log('Audio play failed:', error);
        });
      }
    }
  };

  if (showVideo) {
    return <VideoPreloader key={videoKey} onVideoEnd={() => {
      setShowVideo(false);
      // Activar fade in del home
      setTimeout(() => setShowHome(true), 50);
    }} />;
  }

  return (
    <div className={`h-screen w-full font-sans bg-black text-white flex flex-col items-center justify-center p-2 md:p-4 relative overflow-hidden transition-opacity duration-500 ${showHome ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background Audio */}
      <audio
        ref={audioRef}
        src="/We Ready.mp3"
        loop
        autoPlay
        muted={isMuted}
        preload="auto"
      />

      {/* Floating Mute Button */}
      <button
        onClick={toggleMute}
        className="fixed top-4 right-4 z-40 bg-white hover:bg-gray-300 text-black p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
      >
        {isMuted ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
      <main className="flex flex-col items-center justify-center gap-4 md:gap-6 text-center w-full max-w-2xl">
        <Image
          className="w-24 md:w-32 h-auto animate-pulse"
          src="/globe-darkmode.svg"
          alt="Logo de BestDrip"
          width={300}
          height={63}
          priority
        />
        <div className="w-full">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Coming Soon
          </h1>
          <p className="text-sm md:text-base text-gray-300 mb-6 md:mb-8 max-w-lg mx-auto leading-relaxed px-2">
            Estamos trabajando duro para traerte tu mejor Drip!
          </p>
          <div className="flex flex-wrap gap-2 md:gap-3 text-center justify-center mb-6 md:mb-8">
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold animate-pulse transition-all duration-500 ease-in-out">{timeLeft.days}</span>
              <span className="text-xs md:text-sm text-gray-400">Días</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold animate-pulse transition-all duration-500 ease-in-out">{timeLeft.hours}</span>
              <span className="text-xs md:text-sm text-gray-400">Horas</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold animate-pulse transition-all duration-500 ease-in-out">{timeLeft.minutes}</span>
              <span className="text-xs md:text-sm text-gray-400">Minutos</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold animate-pulse transition-all duration-500 ease-in-out">{timeLeft.seconds}</span>
              <span className="text-xs md:text-sm text-gray-400">Segundos</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={handleLike}
              disabled={hasLiked}
              className={`flex items-center justify-center w-12 h-12 md:w-16 md:h-16 border-2 rounded-lg font-semibold transition-all duration-200 text-sm md:text-base ${
                hasLiked
                  ? 'border-gray-600 text-gray-400 cursor-not-allowed shadow-gray-600/50 shadow-lg'
                  : 'border-white text-white hover:border-gray-300 hover:text-gray-300 hover:shadow-white/50 shadow-lg hover:shadow-xl'
              }`}
            >
              <span className="text-xl md:text-2xl">{hasLiked ? '💖' : '❤️'}</span>
            </button>
            <div className="text-sm md:text-base font-semibold text-gray-300">
              {likes} {likes === 1 ? 'like' : 'likes'}
            </div>
          </div>
          <Link
            href="/preview"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-700"
          >
            Diseña tu Drip
          </Link>
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
