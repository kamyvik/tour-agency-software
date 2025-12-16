import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface HeroProps {
  onBookNow: () => void;
}

export function Hero({ onBookNow }: HeroProps) {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1714412192114-61dca8f15f68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwcGFyYWRpc2V8ZW58MXx8fHwxNzY1MjAzMTcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="mb-6">
          Discover Your Next Adventure
        </h1>
        <p className="mb-8 text-xl max-w-2xl mx-auto">
          Experience unforgettable journeys to the world&apos;s most beautiful destinations. 
          Create memories that last a lifetime with our expertly curated tours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={onBookNow}
            size="lg"
            className="bg-[#8B1538] hover:bg-[#6B0F28]"
          >
            Start Your Journey
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-[#8B1538]"
          >
            View All Tours
          </Button>
        </div>
      </div>
    </section>
  );
}
