import { Star, Clock, Users, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface Tour {
  id: number;
  title: string;
  location: string;
  duration: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  groupSize: string;
  featured?: boolean;
}

interface FeaturedToursProps {
  onBookNow: (tour: Tour) => void;
}

export function FeaturedTours({ onBookNow }: FeaturedToursProps) {
  const tours: Tour[] = [
    {
      id: 1,
      title: 'Tropical Paradise Escape',
      location: 'Maldives',
      duration: '7 Days',
      price: 2499,
      rating: 4.9,
      reviews: 245,
      image: 'https://images.unsplash.com/photo-1714412192114-61dca8f15f68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwcGFyYWRpc2V8ZW58MXx8fHwxNzY1MjAzMTcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      groupSize: '2-10',
      featured: true,
    },
    {
      id: 2,
      title: 'Mountain Adventure Trek',
      location: 'Swiss Alps',
      duration: '10 Days',
      price: 3299,
      rating: 4.8,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NjUxNjM1Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      groupSize: '4-12',
    },
    {
      id: 3,
      title: 'European Heritage Tour',
      location: 'Prague, Vienna, Budapest',
      duration: '12 Days',
      price: 2899,
      rating: 4.9,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1725806760874-96040618865c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldXJvcGVhbiUyMGNpdHklMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY1MTg3NTc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      groupSize: '6-15',
      featured: true,
    },
    {
      id: 4,
      title: 'African Safari Experience',
      location: 'Kenya & Tanzania',
      duration: '8 Days',
      price: 3799,
      rating: 5.0,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1543716778-1b10caf74fb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleG90aWMlMjBzYWZhcmklMjB3aWxkbGlmZXxlbnwxfHx8fDE3NjUyNzExMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      groupSize: '4-8',
    },
    {
      id: 5,
      title: 'Luxury Mediterranean Cruise',
      location: 'Greece & Italy',
      duration: '14 Days',
      price: 4599,
      rating: 4.9,
      reviews: 287,
      image: 'https://images.unsplash.com/photo-1744872905781-26779af9ab52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnVpc2UlMjBzaGlwJTIwb2NlYW58ZW58MXx8fHwxNzY1MjYyNzgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      groupSize: '2-20',
      featured: true,
    },
    {
      id: 6,
      title: 'Asian Cultural Journey',
      location: 'Thailand & Cambodia',
      duration: '9 Days',
      price: 2199,
      rating: 4.7,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1585797972613-45e1ece55d98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHRlbXBsZSUyMGN1bHR1cmV8ZW58MXx8fHwxNzY1MjI2MTMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      groupSize: '5-12',
    },
  ];

  return (
    <section className="py-16 bg-gray-50" id="tours">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-[#8B1538]">Featured Tours</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our handpicked selection of extraordinary travel experiences designed to create unforgettable memories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <Card key={tour.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={tour.image} 
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {tour.featured && (
                  <Badge className="absolute top-4 right-4 bg-[#8B1538]">
                    Featured
                  </Badge>
                )}
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-[#8B1538]" />
                  <span className="text-sm text-gray-600">{tour.location}</span>
                </div>
                <h3 className="mb-3">{tour.title}</h3>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{tour.groupSize}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{tour.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({tour.reviews} reviews)</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <span className="text-gray-600">From </span>
                    <span className="text-[#8B1538]">${tour.price}</span>
                  </div>
                  <Button 
                    onClick={() => onBookNow(tour)}
                    className="bg-[#8B1538] hover:bg-[#6B0F28]"
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-[#8B1538] text-[#8B1538] hover:bg-[#8B1538] hover:text-white">
            View All Tours
          </Button>
        </div>
      </div>
    </section>
  );
}
