import { Shield, Award, Headphones, DollarSign, Globe, Heart } from 'lucide-react';

export function WhyChooseUs() {
  const features = [
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Travel with confidence knowing your safety is our top priority with comprehensive insurance coverage.',
    },
    {
      icon: Award,
      title: 'Best Price Guarantee',
      description: 'We offer competitive prices and match any lower price you find for the same tour package.',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Our dedicated support team is available around the clock to assist you throughout your journey.',
    },
    {
      icon: DollarSign,
      title: 'Easy Booking',
      description: 'Simple and secure booking process with flexible payment options and instant confirmation.',
    },
    {
      icon: Globe,
      title: 'Global Destinations',
      description: 'Access to over 100 countries worldwide with expertly curated itineraries and local guides.',
    },
    {
      icon: Heart,
      title: 'Trusted by Thousands',
      description: 'Join our community of happy travelers with over 50,000 successful trips organized.',
    },
  ];

  return (
    <section className="py-16 bg-gray-50" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-[#8B1538]">Why Choose Global Tours</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the difference with our commitment to excellence and customer satisfaction
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-[#8B1538]/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-[#8B1538]" />
                </div>
                <h3 className="mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
