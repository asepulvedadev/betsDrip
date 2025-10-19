import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Equipos Deportivos - BestDrip',
  description: 'Amplia gama de equipos deportivos en BestDrip. Todo lo que necesitas para tu actividad física.',
};

export default function EquiposDeportivosPage() {
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