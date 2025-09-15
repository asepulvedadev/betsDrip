import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Equipos Deportivos - BestDrip',
  description: 'Amplia gama de equipos deportivos en BestDrip. Todo lo que necesitas para tu actividad física.',
};

export default function EquiposDeportivosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Equipos Deportivos</h1>
      <p className="text-lg mb-4">
        Encuentra equipos deportivos de todas las disciplinas. Desde balones hasta accesorios,
        todo diseñado para mejorar tu rendimiento y disfrute del deporte.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Balones</h2>
          <p>Balones de alta calidad para diversos deportes.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Accesorios</h2>
          <p>Guantes, cintas y más para complementar tu equipo.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Entrenamiento</h2>
          <p>Herramientas para mejorar tu condición física.</p>
        </div>
      </div>
    </div>
  );
}