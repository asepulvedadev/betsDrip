import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Camisas Personalizadas - BestDrip',
  description: 'Descubre nuestras camisas personalizadas para equipos deportivos. Diseño moderno y creativo para firstmobil.',
};

export default function CamisasPersonalizadasPage() {
  return (
    <div className="min-h-screen w-full font-sans bg-black text-white flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
        <p className="text-lg text-gray-300">
          Estamos trabajando duro para traerte la mejor experiencia. ¡Mantente atento!
        </p>
      </div>
    </div>
  );
}