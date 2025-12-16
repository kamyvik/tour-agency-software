import { Menu, X, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import logo from 'figma:asset/429ba3818fc8d1f96e3341c087917144f9434b88.png';

interface HeaderProps {
  onBookNow: () => void;
}

export function Header({ onBookNow }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ['Home', 'Tours', 'Destinations', 'About', 'Contact'];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-[#8B1538] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex gap-6">
            <a href="tel:+1234567890" className="flex items-center gap-2 hover:opacity-80">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">+1 (234) 567-890</span>
            </a>
            <a href="mailto:info@touragency.com" className="flex items-center gap-2 hover:opacity-80">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">info@touragency.com</span>
            </a>
          </div>
          <div className="flex gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/20 h-7"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="Tour Agency Logo" className="h-12 w-12" />
            <div className="flex flex-col">
              <span className="text-[#8B1538]">Global Tours</span>
              <span className="text-xs text-gray-600">Explore the World</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-700 hover:text-[#8B1538] transition-colors"
              >
                {item}
              </a>
            ))}
            <Button 
              onClick={onBookNow}
              className="bg-[#8B1538] hover:bg-[#6B0F28]"
            >
              Book Now
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-700 hover:text-[#8B1538] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <Button 
              onClick={() => {
                onBookNow();
                setIsMenuOpen(false);
              }}
              className="bg-[#8B1538] hover:bg-[#6B0F28] w-full"
            >
              Book Now
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
