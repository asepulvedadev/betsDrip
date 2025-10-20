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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-cyan-900 opacity-20" />

      {/* Scanlines overlay */}
      <div className="absolute inset-0 bg-repeat opacity-10"
           style={{
             backgroundImage: `repeating-linear-gradient(
               0deg,
               transparent,
               transparent 2px,
               rgba(0, 255, 255, 0.1) 2px,
               rgba(0, 255, 255, 0.1) 4px
             )`
           }} />

      {/* Main glitch text */}
      <div className="relative z-10">
        {/* RGB split layers */}
        <div className="relative inline-block">
          {/* Red layer */}
          <span className={`font-bold ${sizeClasses[size]} text-red-500 absolute top-0 left-0 animate-pulse`}
                style={{
                  animation: 'glitch-red 2s infinite linear',
                  clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)'
                }}>
            {text}
          </span>

          {/* Green layer */}
          <span className={`font-bold ${sizeClasses[size]} text-green-500 absolute top-0 left-0 animate-pulse`}
                style={{
                  animation: 'glitch-green 2s infinite linear',
                  clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)'
                }}>
            {text}
          </span>

          {/* Blue layer */}
          <span className={`font-bold ${sizeClasses[size]} text-blue-500 absolute top-0 left-0 animate-pulse`}
                style={{
                  animation: 'glitch-blue 2s infinite linear',
                  clipPath: 'polygon(0 45%, 100% 45%, 100% 55%, 0 55%)'
                }}>
            {text}
          </span>

          {/* Main white text */}
          <span className={`font-bold ${sizeClasses[size]} text-white relative z-10`}
                style={{
                  fontFamily: 'var(--font-nfl)',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                }}>
            {text}
          </span>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center mt-4 space-x-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
               style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
               style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
               style={{ animationDelay: '0.4s' }} />
        </div>
      </div>

      {/* Glitch effect keyframes */}
      <style jsx>{`
        @keyframes glitch-red {
          0%, 100% { transform: translateX(0); }
          10% { transform: translateX(-2px); }
          20% { transform: translateX(2px); }
          30% { transform: translateX(-1px); }
          40% { transform: translateX(1px); }
          50% { transform: translateX(0); }
          60% { transform: translateX(-2px); }
          70% { transform: translateX(2px); }
          80% { transform: translateX(-1px); }
          90% { transform: translateX(1px); }
        }

        @keyframes glitch-green {
          0%, 100% { transform: translateX(0); }
          10% { transform: translateX(2px); }
          20% { transform: translateX(-2px); }
          30% { transform: translateX(1px); }
          40% { transform: translateX(-1px); }
          50% { transform: translateX(0); }
          60% { transform: translateX(2px); }
          70% { transform: translateX(-2px); }
          80% { transform: translateX(1px); }
          90% { transform: translateX(-1px); }
        }

        @keyframes glitch-blue {
          0%, 100% { transform: translateY(0); }
          10% { transform: translateY(-1px); }
          20% { transform: translateY(1px); }
          30% { transform: translateY(-0.5px); }
          40% { transform: translateY(0.5px); }
          50% { transform: translateY(0); }
          60% { transform: translateY(-1px); }
          70% { transform: translateY(1px); }
          80% { transform: translateY(-0.5px); }
          90% { transform: translateY(0.5px); }
        }
      `}</style>
    </div>
  );
};

export default GlitchLoader;