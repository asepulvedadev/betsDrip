"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, useTexture } from "@react-three/drei";
import { useRef, useState } from "react";
import { Mesh } from "three";

function RotatingBox({ texture, rotationY }: { texture: string | null; rotationY: number }) {
  // Usar una textura transparente por defecto para evitar hooks condicionales
  const textureUrl = texture || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
  const textureMap = useTexture(textureUrl);

  return (
    <mesh position={[0, 0, 0]} rotation={[0, rotationY, 0]}>
      <planeGeometry args={[2, 3]} /> {/* Mockup de camiseta frontal */}
      <meshStandardMaterial map={texture ? textureMap : null} color={texture ? undefined : "#ffffff"} side={2} /> {/* Blanco por defecto, textura cuando subida */}
    </mesh>
  );
}


export default function Preview3D() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [rotationY, setRotationY] = useState(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const rotateLeft = () => setRotationY(prev => prev - 0.2);
  const rotateRight = () => setRotationY(prev => prev + 0.2);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <label
          htmlFor="image-upload"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Sube tu diseño (JPG/PNG)
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-700"
        />
      </div>
      <div className="relative aspect-square w-full bg-gray-900 rounded-lg overflow-hidden">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <RotatingBox texture={uploadedImage} rotationY={rotationY} />
          <OrbitControls enablePan={false} enableZoom={true} enableRotate={false} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
        </Canvas>
        {/* Controles de rotación */}
        <button
          onClick={rotateLeft}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded-lg hover:bg-black/70 transition-colors"
        >
          ← Izquierda
        </button>
        <button
          onClick={rotateRight}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded-lg hover:bg-black/70 transition-colors"
        >
          Derecha →
        </button>
      </div>
    </div>
  );
}