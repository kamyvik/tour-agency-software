import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import logo from 'figma:asset/429ba3818fc8d1f96e3341c087917144f9434b88.png';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Global Tours" className="h-12 w-12" />
              <div>
                <div className="text-white">Global Tours</div>
                <div className="text-xs text-gray-400">Explore the World</div>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner for unforgettable travel experiences around the world.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#8B1538] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#8B1538] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#8B1538] transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#8B1538] transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#tours" className="hover:text-white transition-colors">Our Tours</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Destinations</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Travel Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Booking Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#8B1538] mt-0.5 flex-shrink-0" />
                <span>123 Travel Street, Suite 456<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#8B1538] flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-white transition-colors">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#8B1538] flex-shrink-0" />
                <a href="mailto:info@globaltours.com" className="hover:text-white transition-colors">info@globaltours.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Global Tours. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
