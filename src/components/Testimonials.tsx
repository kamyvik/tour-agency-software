import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  tour: string;
}

export function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: 'Sarah Johnson',
      location: 'New York, USA',
      rating: 5,
      text: 'The Maldives trip was absolutely incredible! Every detail was perfectly planned, and our guide was knowledgeable and friendly. This was truly a trip of a lifetime.',
      tour: 'Tropical Paradise Escape',
    },
    {
      name: 'Michael Chen',
      location: 'Singapore',
      rating: 5,
      text: 'Outstanding service from start to finish. The European Heritage Tour exceeded all expectations. The accommodations were excellent and the itinerary was well-paced.',
      tour: 'European Heritage Tour',
    },
    {
      name: 'Emma Williams',
      location: 'London, UK',
      rating: 5,
      text: 'The African Safari was a dream come true! Seeing wildlife in their natural habitat was magical. Our tour operator made everything seamless and stress-free.',
      tour: 'African Safari Experience',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-[#8B1538]">What Our Travelers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real stories from real travelers who have experienced our exceptional service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Quote className="w-10 h-10 text-[#8B1538]/20 mb-4" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 italic">
                  &quot;{testimonial.text}&quot;
                </p>

                <div className="border-t pt-4">
                  <p className="text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 mb-2">{testimonial.location}</p>
                  <p className="text-sm text-[#8B1538]">{testimonial.tour}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
