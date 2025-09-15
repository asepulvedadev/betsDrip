import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Equipo de Fútbol Americano - BestDrip',
  description: 'Encuentra el mejor equipo de fútbol americano en BestDrip. Productos de alta calidad para firstmobil.',
};

export default function FutbolAmericanoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Equipo de Fútbol Americano</h1>
      <p className="text-lg mb-4">
        Equípate con lo mejor para el fútbol americano. Cascos, hombreras, pantalones y más,
        diseñados para máxima protección y rendimiento en el campo.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Cascos</h2>
          <p>Protección avanzada para la cabeza.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Hombreras</h2>
          <p>Apoyo y protección para hombros y pecho.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Pantalones</h2>
          <p>Con acolchado para impactos.</p>
        </div>
      </div>
    </div>
  );
}