'use client';

import { useEffect, useRef, useState, useMemo } from 'react';

interface VideoPreloaderProps {
  onVideoEnd: () => void;
}

export default function VideoPreloader({ onVideoEnd }: VideoPreloaderProps) {
  const hasEndedRef = useRef(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Generar URL del video - useMemo para que solo se genere una vez
  const videoSrc = useMemo(() => {
    if (typeof window === 'undefined') return '';

    const timestamp = Date.now();
    // Detectar si es móvil
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    // En móviles, iniciar silenciado para asegurar autoplay
    const mutedParam = isMobileDevice ? 'true' : 'false';
    return `https://player.cloudinary.com/embed/?cloud_name=dipoc90ti&public_id=BESTDRIP_adspfj&profile=cld-default&controls=false&autoplay=true&muted=${mutedParam}&loop=false&show_jump_controls=false&show_logo=false&preload=auto&hideContextMenu=true&posterOptions.transformation[startOffset]=0&t=${timestamp}`;
  }, []);

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
    // Solo intentar activar el sonido en desktop (el video ya tiene sonido en la URL)
    // En móviles el video inicia silenciado para asegurar autoplay
    const isMobileDevice = typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    let unmuteTimer: NodeJS.Timeout | undefined;
    if (!isMobileDevice) {
      unmuteTimer = setTimeout(() => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
          // Enviar mensaje para activar el sonido en desktop
          iframeRef.current.contentWindow.postMessage({ type: 'setVolume', volume: 1 }, '*');
        }
      }, 100);
    }

    // Establecer temporizador basado en duración del video (5 segundos)
    const timer = setTimeout(() => {
      handleVideoEnd();
    }, 5000);

    return () => {
      clearTimeout(timer);
      if (unmuteTimer) clearTimeout(unmuteTimer);
    };
  }, []);

  if (!isMounted) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <div className="animate-pulse text-white text-sm">Cargando...</div>
      </div>
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
        src={videoSrc}
        width="100%"
        height="100%"
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        style={{ border: 'none', pointerEvents: 'none', backgroundColor: 'black' }}
      />
    </div>
  );
}