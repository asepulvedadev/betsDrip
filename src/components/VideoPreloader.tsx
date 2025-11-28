'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface VideoPreloaderProps {
  onVideoEnd: () => void;
}

export default function VideoPreloader({ onVideoEnd }: VideoPreloaderProps) {
  const hasEndedRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Marcar como montado para renderizar en el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleVideoEnd = useCallback(() => {
    if (hasEndedRef.current) return;
    hasEndedRef.current = true;

    // Activar fade out
    setFadeOut(true);

    // Llamar a onVideoEnd después de la animación (300ms)
    setTimeout(() => {
      onVideoEnd();
    }, 300);
  }, [onVideoEnd]);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    // Intentar reproducir el video
    const playVideo = async () => {
      try {
        // El video se reproduce completamente sin sonido para cumplir con las políticas de autoplay
        await video.play();
      } catch (error) {
        console.error('Error playing video:', error);
      }
    };

    playVideo();

    // Listener para cuando el video termine
    const handleEnded = () => {
      handleVideoEnd();
    };

    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, [isMounted, handleVideoEnd]);

  if (!isMounted) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center" />
    );
  }

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-300 ease-in-out ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        muted
        playsInline
        preload="auto"
        style={{ backgroundColor: 'black' }}
      >
        <source
          src="https://res.cloudinary.com/dipoc90ti/video/upload/BESTDRIP_adspfj.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}