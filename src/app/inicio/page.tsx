import ProductGrid from "@/components/ProductGrid";
import Hero from "@/components/Hero";

const InicioPage = () => {
  return (
    <div className="w-full">
      <Hero />
      {/* Grid de productos debajo del hero */}
      <ProductGrid title="Lo nuevo" subtitle="Descubre las últimas novedades de BestDrip." />
    </div>
  );
};

export default InicioPage;


