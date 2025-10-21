'use client';

import { useState, useEffect, useRef } from 'react';

interface VideoPreloaderProps {
  onVideoEnd: () => void;
}

export default function VideoPreloader({ onVideoEnd }: VideoPreloaderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as unknown as { opera: string }).opera;
      const isMobileDevice = /android|avantgo|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(userAgent);
      setIsMobile(isMobileDevice);
    };

    checkMobile();
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {isMobile ? (
        // Mobile: show direct link to video
        <div className="text-center">
          <a
            href="https://player.cloudinary.com/embed/?cloud_name=dipoc90ti&public_id=BESTDRIP_adspfj&profile=cld-default&controls=true&autoplay=1&muted=false&loop=false"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              setTimeout(() => onVideoEnd(), 13000);
            }}
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl mb-4 no-underline"
          >
            ▶️ Ver Video BESTDRIP
          </a>
          <p className="text-white text-sm">Haz clic para ver el video</p>
        </div>
      ) : (
        // Desktop: autoplay video
        <iframe
          ref={videoRef}
          src="https://player.cloudinary.com/embed/?cloud_name=dipoc90ti&public_id=BESTDRIP_adspfj&profile=cld-default&controls=false&autoplay=1&muted=false&loop=false&show_jump_controls=false&show_logo=false&show_hd_button=false&show_volume_control=false"
          width="100%"
          height="100%"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
          frameBorder="0"
          style={{ border: 'none', pointerEvents: 'none' }}
          onLoad={() => {
            const videoDuration = 13000;
            setTimeout(() => {
              onVideoEnd();
            }, videoDuration);
          }}
        />
      )}
    </div>
  );
}