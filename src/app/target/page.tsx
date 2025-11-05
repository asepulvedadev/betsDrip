'use client';

import Image from 'next/image';
import { FaMapMarkerAlt, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';
import { nflVikings } from '../fonts';

export default function TargetPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      setMousePosition({ x: rotateX, y: rotateY });
    }
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen bg-black flex items-start justify-center pt-8 pb-4 px-4 relative overflow-hidden">
      {/* Collage Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
          <div className="relative">
            <Image
              src="/BgTarget/delfines.JPG"
              alt="Delfines"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative">
            <Image
              src="/BgTarget/fujiens.JPG"
              alt="Fujiens"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative">
            <Image
              src="/BgTarget/jaguares.JPG"
              alt="Jaguares"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative">
            <Image
              src="/BgTarget/leones.JPG"
              alt="Leones"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50 animate-pulse">
          <div className="bg-black rounded-2xl h-full w-full"></div>
        </div>

        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} hover:scale-105 hover:shadow-3xl border border-gray-700 relative z-10`}
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.x}deg) rotateY(${mousePosition.y}deg)`,
          }}
        >
        {/* Background Image for Card */}
        <div className="absolute inset-0 opacity-10 rounded-2xl overflow-hidden">
          <Image
            src="/targeet.JPG"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Image
              src="/LogoLateral.webp"
              alt="Logo BestDrip"
              width={200}
              height={100}
              className="object-contain filter brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-xl opacity-50 animate-pulse"></div>
          </div>
        </div>

        {/* Dirección */}
        <div className="mb-6">
          <a
            href="https://www.google.com/maps/place/Narciso+Mendoza+4112,+Ni%C3%B1o+Artillero,+64280+Monterrey,+N.L./@25.7143103,-100.3295167,17z/data=!3m1!4b1!4m6!3m5!1s0x866295b664793b71:0xfa335a768eb181de!8m2!3d25.7143055!4d-100.3249033!16s%2Fg%2F11c70bzc2h?entry=ttu&g_ep=EgoyMDI1MTEwMi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 transform hover:scale-105"
          >
            <FaMapMarkerAlt className="text-red-400 mr-2 animate-bounce" />
            <span>Narciso Mendoza 4112, Niño Artillero, Monterrey, NL, México</span>
          </a>
        </div>

        {/* Texto con fuente especial */}
        <div className="mb-6 text-center">
          <p className={`text-3xl text-gray-300 ${nflVikings.className}`}>
            Los mejores articulos sublimados
          </p>
        </div>

        {/* Redes Sociales */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Síguenos</h3>
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.facebook.com/bestdripuniformesmonterrey"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-500 transform hover:scale-110 hover:rotate-6 shadow-lg hover:shadow-blue-500/50"
            >
              <FaFacebook size={24} className="text-white group-hover:animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-20 animate-ping"></div>
            </a>
            <a
              href="https://www.instagram.com/bestdrip_mty/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 transition-all duration-500 transform hover:scale-110 hover:-rotate-6 shadow-lg hover:shadow-pink-500/50"
            >
              <FaInstagram size={24} className="text-white group-hover:animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-pink-400 opacity-0 group-hover:opacity-20 animate-ping"></div>
            </a>
            <a
              href="https://wa.me/+528113822991"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 rounded-full bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-500 transform hover:scale-110 hover:rotate-12 shadow-lg hover:shadow-green-500/50"
            >
              <FaWhatsapp size={24} className="text-white group-hover:animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-green-400 opacity-0 group-hover:opacity-20 animate-ping"></div>
            </a>
          </div>
        </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center">
        <a
          href="https://www.bestdrip.com.mx"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors duration-300 text-lg"
        >
          www.bestdrip.com.mx
        </a>
        <p className={`text-lg text-white mt-2 ${nflVikings.className}`}>
          Muy pronto
        </p>
      </footer>
    </div>
  );
}