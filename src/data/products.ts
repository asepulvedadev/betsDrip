export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  description: string;
  badges?: string[];
  sizes?: string[];
};

export const products: Product[] = [
  {
    id: "bd-tee-elite",
    name: "Playera Elite Dry-Fit",
    slug: "playera-elite-dry-fit",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1517343985841-fb67b9765159?q=80&w=1600&auto=format&fit=crop",
    description:
      "Tela transpirable de alto rendimiento con secado rápido. Ideal para entrenamientos intensos.",
    badges: ["Nuevo", "Top Ventas"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "bd-shorts-pro",
    name: "Shorts Pro Flex",
    slug: "shorts-pro-flex",
    price: 449,
    image:
      "https://images.unsplash.com/photo-1602810318383-7fff97d5c425?q=80&w=1600&auto=format&fit=crop",
    description:
      "Ajuste ergonómico con tejido elástico de 4 vías para libertad total de movimiento.",
    badges: ["Recomendado"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "bd-hoodie-core",
    name: "Sudadera Core Warm",
    slug: "sudadera-core-warm",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1600&auto=format&fit=crop",
    description:
      "Interior afelpado, capucha ajustable y bolsillos laterales. Perfecta para climas fríos.",
    sizes: ["S", "M", "L"]
  },
  {
    id: "bd-jersey-sublime",
    name: "Jersey Sublimado Custom",
    slug: "jersey-sublimado-custom",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=1600&auto=format&fit=crop",
    description:
      "Sublimación de alta definición con colores vivos y duraderos. Personalizable.",
    badges: ["Personalizable"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  {
    id: "bd-leggings-air",
    name: "Leggings AirMove",
    slug: "leggings-air-move",
    price: 549,
    image:
      "https://images.unsplash.com/photo-1599050751795-5b1f69f0b5b0?q=80&w=1600&auto=format&fit=crop",
    description:
      "Compresión ligera con paneles transpirables. Cintura alta para mayor soporte.",
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: "bd-cap-shield",
    name: "Gorra Shield UV",
    slug: "gorra-shield-uv",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=1600&auto=format&fit=crop",
    description:
      "Protección solar UPF con banda absorbente. Ajuste trasero regulable.",
    badges: ["Oferta"],
    sizes: ["Única"]
  }
];

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);


