import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

type Props = {
  title?: string;
  subtitle?: string;
};

const ProductGrid = ({ title = "Tienda", subtitle = "Selecciona tu equipo con estilo BestDrip." }: Props) => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.02em]">{title}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">{subtitle}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;


