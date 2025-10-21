'use client';

import { useEffect, useRef, useState } from 'react';

interface VideoPreloaderProps {
  onVideoEnd: () => void;
}

export default function VideoPreloader({ onVideoEnd }: VideoPreloaderProps) {
  const hasEndedRef = useRef(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [fadeOut, setFadeOut] = useState(false);

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
    // Intentar activar el sonido después de que el video empiece a reproducirse
    const unmuteTimer = setTimeout(() => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        // Enviar mensaje para activar el sonido
        iframeRef.current.contentWindow.postMessage({ type: 'setVolume', volume: 1 }, '*');
      }
    }, 100);

    // Establecer temporizador basado en duración del video (5 segundos)
    const timer = setTimeout(() => {
      handleVideoEnd();
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(unmuteTimer);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-300 ease-in-out ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <iframe
        ref={iframeRef}
        src="https://player.cloudinary.com/embed/?cloud_name=dipoc90ti&public_id=BESTDRIP_adspfj&profile=cld-default&controls=false&autoplay=true&muted=false&loop=false&show_jump_controls=false&show_logo=false&preload=auto&hideContextMenu=true&posterOptions.transformation[startOffset]=0"
        width="100%"
        height="100%"
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        allowFullScreen
        style={{ border: 'none', pointerEvents: 'none', backgroundColor: 'black' }}
      />
    </div>
  );
}