import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Camisas Personalizadas - BestDrip',
  description: 'Descubre nuestras camisas personalizadas para equipos deportivos. Diseño moderno y creativo para firstmobil.',
};

export default function CamisasPersonalizadasPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Camisas Personalizadas</h1>
      <p className="text-lg mb-4">
        En BestDrip, ofrecemos camisas personalizadas de alta calidad para equipos deportivos.
        Diseñadas con materiales duraderos y diseños modernos que reflejan el espíritu de firstmobil.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for product cards or details */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Camisa Básica</h2>
          <p>Camisa personalizable con tu logo y colores.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Camisa Premium</h2>
          <p>Materiales de alta calidad para máxima comodidad.</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Camisa Técnica</h2>
          <p>Diseño ergonómico para rendimiento deportivo.</p>
        </div>
      </div>
    </div>
  );
}