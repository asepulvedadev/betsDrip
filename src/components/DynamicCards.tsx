import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const cardsData = [
  {
    title: 'Camisas Personalizadas',
    description: 'Diseña camisas únicas para tu equipo con materiales de alta calidad.',
    image: '/logo.webp', // Placeholder, replace with actual image
    link: '/accesorios/camisas-personalizadas',
  },
  {
    title: 'Equipo de Fútbol Americano',
    description: 'Protege y equipa a tus jugadores con el mejor equipo profesional.',
    image: '/logo.webp', // Placeholder
    link: '/accesorios/futbol-americano',
  },
  {
    title: 'Equipos Deportivos',
    description: 'Todo lo necesario para practicar tus deportes favoritos.',
    image: '/logo.webp', // Placeholder
    link: '/accesorios/equipos-deportivos',
  },
];

export default function DynamicCards() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Accesorios Deportivos FirstMobil</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardsData.map((card, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <img src={card.image} alt={card.title} className="w-full h-48 object-cover rounded-t-lg" />
              <CardTitle className="text-xl">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{card.description}</CardDescription>
              <Link href={card.link}>
                <Button className="w-full">Ver Más</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}