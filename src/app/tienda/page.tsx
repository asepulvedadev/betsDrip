import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-static";

const TiendaPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-[-0.02em]">Tienda</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Selecciona tu equipo con estilo BestDrip.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default TiendaPage;


