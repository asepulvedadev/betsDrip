"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Center } from "@react-three/drei";
import { useState } from "react";
import { TShirtWrapper } from "./TShirt";


export default function Preview3D() {
  const [frontTexture, setFrontTexture] = useState<string | null>(null);
  const [backTexture, setBackTexture] = useState<string | null>(null);

  const handleFileUpload = (setter: (value: string) => void) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setter(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
      {/* Sidebar con inputs */}
      <div className="lg:w-1/4 space-y-6">
        <div>
          <label htmlFor="front-upload" className="block text-sm font-medium text-gray-300 mb-2">
            Frente / Pecho
          </label>
          <input
            id="front-upload"
            type="file"
            accept="image/*"
            onChange={handleFileUpload(setFrontTexture)}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-700"
          />
        </div>
        <div>
          <label htmlFor="back-upload" className="block text-sm font-medium text-gray-300 mb-2">
            Espalda
          </label>
          <input
            id="back-upload"
            type="file"
            accept="image/*"
            onChange={handleFileUpload(setBackTexture)}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-700"
          />
        </div>
      </div>

      {/* Canvas 3D */}
      <div className="lg:w-3/4 flex flex-col items-center gap-4">
        <div className="aspect-square bg-gray-900 rounded-lg overflow-hidden w-full max-w-lg">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }} gl={{ antialias: true }}>
            <Environment preset="studio" />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Center>
              <TShirtWrapper frontTexture={frontTexture} backTexture={backTexture} />
            </Center>
            <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4.5} />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              enableRotate={true}
            />
          </Canvas>
        </div>
      </div>
    </div>
  );
}
