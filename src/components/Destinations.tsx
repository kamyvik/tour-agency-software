import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface Destination {
  name: string;
  tours: number;
  image: string;
}

export function Destinations() {
  const destinations: Destination[] = [
    {
      name: 'Tropical Beaches',
      tours: 28,
      image: 'https://images.unsplash.com/photo-1714412192114-61dca8f15f68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwcGFyYWRpc2V8ZW58MXx8fHwxNzY1MjAzMTcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Mountain Adventures',
      tours: 35,
      image: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NjUxNjM1Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'European Cities',
      tours: 42,
      image: 'https://images.unsplash.com/photo-1725806760874-96040618865c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldXJvcGVhbiUyMGNpdHklMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY1MTg3NTc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Wildlife Safaris',
      tours: 18,
      image: 'https://images.unsplash.com/photo-1543716778-1b10caf74fb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleG90aWMlMjBzYWZhcmklMjB3aWxkbGlmZXxlbnwxfHx8fDE3NjUyNzExMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Ocean Cruises',
      tours: 22,
      image: 'https://images.unsplash.com/photo-1744872905781-26779af9ab52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnVpc2UlMjBzaGlwJTIwb2NlYW58ZW58MXx8fHwxNzY1MjYyNzgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Cultural Experiences',
      tours: 31,
      image: 'https://images.unsplash.com/photo-1585797972613-45e1ece55d98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHRlbXBsZSUyMGN1bHR1cmV8ZW58MXx8fHwxNzY1MjI2MTMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  return (
    <section className="py-16 bg-white" id="destinations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-[#8B1538]">Popular Destinations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the most sought-after travel destinations from around the globe
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <div 
              key={index}
              className="relative h-80 rounded-xl overflow-hidden group cursor-pointer"
            >
              <img 
                src={destination.image} 
                alt={destination.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="mb-2">{destination.name}</h3>
                <p className="text-white/90 mb-4">{destination.tours} Tours Available</p>
                <Button 
                  variant="ghost" 
                  className="text-white hover:bg-white/20 p-0 h-auto group-hover:gap-2 transition-all"
                >
                  Explore <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
