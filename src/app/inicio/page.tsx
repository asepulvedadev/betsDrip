import ProductGrid from "@/components/ProductGrid";
import HeroSlider from "@/components/HeroSlider";
import DynamicCards from "@/components/DynamicCards";

const InicioPage = () => {
  return (
    <div className="w-full">
      <HeroSlider
        slides={[
          { src: "/hero/60-IMG_1709.jpg", alt: "Hero 1" },
          { src: "/hero/IMG_1985.jpg", alt: "Hero 2" },
          { src: "/hero/579A1396.JPG", alt: "Hero 3" },
        ]}
      />
      <DynamicCards />
      {/* Grid de productos debajo del hero */}
      <ProductGrid title="Lo nuevo" subtitle="Descubre las últimas novedades de BestDrip." />
    </div>
  );
};

export default InicioPage;


