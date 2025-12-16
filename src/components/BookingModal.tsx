import { useState } from 'react';
import { X, Calendar, Users, Mail, Phone, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour?: {
    title: string;
    location: string;
    price: number;
  } | null;
}

export function BookingModal({ isOpen, onClose, tour }: BookingModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    guests: '2',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate booking
    toast.success('Booking request submitted!', {
      description: 'Our team will contact you shortly to confirm your booking.',
    });
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      date: '',
      guests: '2',
    });
    
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#8B1538]">
            {tour ? `Book ${tour.title}` : 'Book Your Tour'}
          </DialogTitle>
          <DialogDescription>
            {tour ? `Explore ${tour.title} in ${tour.location} starting from $${tour.price}.` : 'Fill out the form to book your tour.'}
          </DialogDescription>
        </DialogHeader>

        {tour && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-gray-900">{tour.title}</h3>
                <p className="text-sm text-gray-600">{tour.location}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Starting from</p>
                <p className="text-2xl text-[#8B1538]">${tour.price}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <div className="relative mt-2">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <div className="relative mt-2">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <div className="relative mt-2">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Preferred Date *</Label>
              <div className="relative mt-2">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="guests">Number of Guests *</Label>
              <div className="relative mt-2">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                <Select value={formData.guests} onValueChange={(value) => handleChange('guests', value)}>
                  <SelectTrigger className="pl-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> This is a booking inquiry. Our team will contact you within 24 hours to confirm availability and finalize your booking details.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#8B1538] hover:bg-[#6B0F28]"
            >
              Submit Booking Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}