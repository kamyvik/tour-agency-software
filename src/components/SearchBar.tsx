import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function SearchBar() {
  return (
    <section className="bg-white py-8 -mt-16 relative z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Destination */}
            <div className="relative">
              <label className="block text-sm text-gray-600 mb-2">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input 
                  placeholder="Where to?"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Date */}
            <div className="relative">
              <label className="block text-sm text-gray-600 mb-2">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input 
                  type="date"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="relative">
              <label className="block text-sm text-gray-600 mb-2">Guests</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input 
                  type="number"
                  placeholder="2 guests"
                  className="pl-10"
                  min="1"
                  defaultValue="2"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <Button className="w-full bg-[#8B1538] hover:bg-[#6B0F28]">
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
