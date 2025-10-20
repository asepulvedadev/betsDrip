'use client';

import React from 'react';

interface GlitchLoaderProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

const GlitchLoader: React.FC<GlitchLoaderProps> = ({
  text = "BESTDRIP",
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl'
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden">
      {/* Main static noise background */}
      <div className="absolute inset-0"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
             animation: 'noise-flicker 0.15s infinite linear alternate'
           }} />

      {/* Horizontal rolling scanlines */}
      <div className="absolute inset-0 opacity-60"
           style={{
             backgroundImage: `repeating-linear-gradient(
               0deg,
               transparent 0px,
               rgba(0, 255, 0, 0.15) 1px,
               rgba(0, 255, 0, 0.15) 2px,
               transparent 3px,
               transparent 4px,
               rgba(0, 255, 0, 0.1) 5px,
               rgba(0, 255, 0, 0.1) 6px
             )`,
             animation: 'scanlines-roll 0.1s infinite linear'
           }} />

      {/* Vertical sync interference */}
      <div className="absolute inset-0 opacity-40"
           style={{
             backgroundImage: `repeating-linear-gradient(
               90deg,
               transparent 0px,
               rgba(255, 255, 255, 0.2) 1px,
               rgba(255, 255, 255, 0.2) 2px,
               transparent 3px
             )`,
             animation: 'vertical-sync 0.08s infinite linear'
           }} />

      {/* Color bleeding effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-red-600/20 to-transparent"
             style={{ animation: 'color-bleed-red 2.5s infinite ease-in-out' }} />
        <div className="absolute top-1/3 left-0 w-full h-1/3 bg-gradient-to-b from-blue-600/15 to-transparent"
             style={{ animation: 'color-bleed-blue 3.2s infinite ease-in-out', animationDelay: '0.8s' }} />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-green-600/10 to-transparent"
             style={{ animation: 'color-bleed-green 4.1s infinite ease-in-out', animationDelay: '1.5s' }} />
      </div>

      {/* Digital artifacts and blocks */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-24 h-12 bg-white/40"
             style={{ animation: 'digital-glitch 1.8s infinite ease-in-out' }} />
        <div className="absolute top-1/2 right-1/4 w-16 h-8 bg-cyan-400/30"
             style={{ animation: 'digital-glitch 2.3s infinite ease-in-out', animationDelay: '0.6s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-20 h-6 bg-magenta-400/25"
             style={{ animation: 'digital-glitch 1.5s infinite ease-in-out', animationDelay: '1.2s' }} />
        <div className="absolute top-3/4 right-1/5 w-14 h-10 bg-yellow-400/20"
             style={{ animation: 'digital-glitch 2.7s infinite ease-in-out', animationDelay: '0.3s' }} />
      </div>

      {/* Signal loss flicker */}
      <div className="absolute inset-0 bg-black opacity-0 pointer-events-none"
           style={{ animation: 'signal-loss 0.3s infinite ease-in-out' }} />

      {/* Horizontal line distortions */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/6 left-0 w-full h-px bg-white/60"
             style={{ animation: 'horizontal-distort 1.2s infinite ease-in-out' }} />
        <div className="absolute top-2/6 left-0 w-full h-px bg-white/40"
             style={{ animation: 'horizontal-distort 1.7s infinite ease-in-out', animationDelay: '0.4s' }} />
        <div className="absolute top-4/6 left-0 w-full h-px bg-white/50"
             style={{ animation: 'horizontal-distort 2.1s infinite ease-in-out', animationDelay: '0.8s' }} />
        <div className="absolute bottom-1/6 left-0 w-full h-px bg-white/45"
             style={{ animation: 'horizontal-distort 1.9s infinite ease-in-out', animationDelay: '1.1s' }} />
      </div>

      {/* Glitch effect keyframes */}
      <style jsx>{`
        @keyframes noise-flicker {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.6; }
        }

        @keyframes scanlines-roll {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }

        @keyframes vertical-sync {
          0% { transform: translateX(0); }
          100% { transform: translateX(2px); }
        }

        @keyframes color-bleed-red {
          0%, 100% { transform: translateY(0) scaleY(1); opacity: 0.2; }
          25% { transform: translateY(-20px) scaleY(0.8); opacity: 0.4; }
          50% { transform: translateY(10px) scaleY(1.3); opacity: 0.1; }
          75% { transform: translateY(-10px) scaleY(0.9); opacity: 0.3; }
        }

        @keyframes color-bleed-blue {
          0%, 100% { transform: translateY(0) scaleY(1); opacity: 0.15; }
          30% { transform: translateY(15px) scaleY(1.2); opacity: 0.35; }
          60% { transform: translateY(-8px) scaleY(0.7); opacity: 0.05; }
          90% { transform: translateY(5px) scaleY(1.4); opacity: 0.25; }
        }

        @keyframes color-bleed-green {
          0%, 100% { transform: translateY(0) scaleY(1); opacity: 0.1; }
          20% { transform: translateY(-12px) scaleY(0.8); opacity: 0.3; }
          40% { transform: translateY(25px) scaleY(1.5); opacity: 0.05; }
          80% { transform: translateY(-15px) scaleY(0.6); opacity: 0.2; }
        }

        @keyframes digital-glitch {
          0%, 100% { transform: translateX(0) translateY(0) scale(1); opacity: 0.4; }
          10% { transform: translateX(-30px) translateY(-15px) scale(1.2); opacity: 0.7; }
          20% { transform: translateX(20px) translateY(8px) scale(0.8); opacity: 0.2; }
          30% { transform: translateX(-15px) translateY(20px) scale(1.3); opacity: 0.6; }
          40% { transform: translateX(35px) translateY(-10px) scale(0.7); opacity: 0.1; }
          50% { transform: translateX(0) translateY(0) scale(1); opacity: 0.5; }
          60% { transform: translateX(-25px) translateY(12px) scale(1.4); opacity: 0.8; }
          70% { transform: translateX(15px) translateY(-20px) scale(0.6); opacity: 0.15; }
          80% { transform: translateX(-35px) translateY(8px) scale(1.1); opacity: 0.65; }
          90% { transform: translateX(28px) translateY(-12px) scale(0.9); opacity: 0.3; }
        }

        @keyframes signal-loss {
          0%, 100% { opacity: 0; }
          5% { opacity: 0.15; }
          10% { opacity: 0; }
          15% { opacity: 0.08; }
          20% { opacity: 0; }
          25% { opacity: 0.12; }
          30% { opacity: 0; }
          35% { opacity: 0.06; }
          40% { opacity: 0; }
          45% { opacity: 0.1; }
          50% { opacity: 0; }
          55% { opacity: 0.04; }
          60% { opacity: 0; }
          65% { opacity: 0.09; }
          70% { opacity: 0; }
          75% { opacity: 0.07; }
          80% { opacity: 0; }
          85% { opacity: 0.11; }
          90% { opacity: 0; }
          95% { opacity: 0.05; }
        }

        @keyframes horizontal-distort {
          0%, 100% { transform: translateX(0) scaleX(1); opacity: 0.6; }
          25% { transform: translateX(-10px) scaleX(0.95); opacity: 0.8; }
          50% { transform: translateX(15px) scaleX(1.05); opacity: 0.4; }
          75% { transform: translateX(-5px) scaleX(0.98); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default GlitchLoader;