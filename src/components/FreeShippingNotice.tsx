"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FreeShippingNotice = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      <div className="w-full bg-white text-gray-500 text-[14px] sm:text-xs tracking-wide h-8 min-h-[36px] flex items-center justify-center py-2">
        ENVÍO GRATIS A TODO MÉXICO{" "}
        <button
          onClick={() => setIsModalOpen((open) => !open)}
          className="text-gray-500 ml-1 underline underline-offset-4 hover:text-gray-700 transition-colors font-semibold flex items-center gap-1"
        >
          {isModalOpen ? "Ver menos" : "Ver más"}
        </button>
      </div>

      {/* Modal - positioned below the notice */}
      {(isModalOpen || isAnimating) && (
        <div className="absolute top-full left-0 right-0 z-50 bg-black/50 backdrop-blur-sm">
          <div
            className={`w-full bg-white shadow-2xl transform transition-all duration-300 ease-out ${
              isModalOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-4 opacity-0"
            }`}
          >
            <div className="w-full h-96 flex overflow-hidden">
              {/* Left side - Information */}
              <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-white">
                <Card className="w-full max-w-sm border-0 shadow-none bg-transparent">
                  <CardHeader className="pb-8">
                    <CardTitle className="text-xl font-bold text-center text-gray-900 leading-tight">
                      Envío Gratis a Todo México
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-base mb-2 text-gray-900">
                        Políticas de Envío
                      </h3>
                      <ul className="space-y-1.5 text-xs text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 text-sm">✓</span>
                          <span>Envío gratis {'>'} $999 MXN</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 text-sm">🚚</span>
                          <span>3-5 días hábiles en CDMX</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-500 text-sm">📦</span>
                          <span>5-7 días en resto del país</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-500 text-sm">📍</span>
                          <span>Seguimiento incluido</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-base mb-2 text-gray-900">
                        Modalidades
                      </h3>
                      <ul className="space-y-1.5 text-xs text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-gray-600 text-sm">🚚</span>
                          <span><strong>Estándar:</strong> 3-7 días</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-600 text-sm">⚡</span>
                          <span><strong>Express:</strong> 1-2 días</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-indigo-600 text-sm">🏪</span>
                          <span><strong>Recogida en tienda</strong></span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right side - Image */}
              <div className="flex-1 relative overflow-hidden">
                <Image
                  src="/hero/579A1396.JPG"
                  alt="Envío BestDrip"
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-l from-white/40 via-transparent to-white/20" />
              </div>

              {/* Close button */}
              <Button
                onClick={handleClose}
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-white/90 hover:bg-white shadow-lg group"
                aria-label="Cerrar modal"
              >
                <svg
                  className="w-7 h-7 text-gray-700 group-hover:text-red-500 transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="11"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="#fff"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 8l8 8M16 8l-8 8"
                    stroke="currentColor"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreeShippingNotice;