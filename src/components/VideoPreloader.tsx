'use client';

import { useEffect, useRef, useState } from 'react';

interface VideoPreloaderProps {
  onVideoEnd: () => void;
}

export default function VideoPreloader({ onVideoEnd }: VideoPreloaderProps) {
  const hasEndedRef = useRef(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Generar URL del video solo una vez en el cliente
  const videoSrcRef = useRef<string>('');
  const isMobileRef = useRef<boolean>(false);

  if (typeof window !== 'undefined' && !videoSrcRef.current) {
    const timestamp = Date.now();
    // Detectar si es móvil
    isMobileRef.current = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    // Iniciar con sonido en todos los dispositivos para mejor experiencia
    videoSrcRef.current = `https://player.cloudinary.com/embed/?cloud_name=dipoc90ti&public_id=BESTDRIP_adspfj&profile=cld-default&controls=false&autoplay=true&muted=false&loop=false&show_jump_controls=false&show_logo=false&preload=auto&hideContextMenu=true&posterOptions.transformation[startOffset]=0&playsinline=true&t=${timestamp}`;
  }

  // Marcar como montado para renderizar en el cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleVideoEnd = () => {
    if (hasEndedRef.current) return;
    hasEndedRef.current = true;

    // Activar fade out
    setFadeOut(true);

    // Llamar a onVideoEnd después de la animación (300ms)
    setTimeout(() => {
      onVideoEnd();
    }, 300);
  };

  useEffect(() => {
    // Establecer temporizador basado en duración del video (5 segundos)
    const timer = setTimeout(() => {
      handleVideoEnd();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!isMounted || !videoSrcRef.current) {
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
      <iframe
        ref={iframeRef}
        src={videoSrcRef.current}
        width="100%"
        height="100%"
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        loading="eager"
        title="BestDrip Video"
        style={{ border: 'none', pointerEvents: 'none', backgroundColor: 'black' }}
      />
    </div>
  );
}