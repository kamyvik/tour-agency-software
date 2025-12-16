import { useState } from 'react';
import { Save, Plus, Trash2, Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { PageType } from '../../App';
import { toast } from 'sonner@2.0.3';
import { useData } from '../../context/DataContext';

interface DomesticTourBookingProps {
  onNavigate: (page: PageType) => void;
}

interface ItineraryDay {
  id: string;
  day: number;
  activities: string;
  hotel: string;
}

export function DomesticTourBooking({ onNavigate }: DomesticTourBookingProps) {
  const { addBooking } = useData();
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    destination: '',
    startDate: '',
    endDate: '',
    travellers: '',
    transportDetails: '',
    totalCost: '',
    advancePayment: '',
    notes: '',
  });

  const [itinerary, setItinerary] = useState<ItineraryDay[]>([
    { id: '1', day: 1, activities: '', hotel: '' },
  ]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleItineraryChange = (id: string, field: string, value: string) => {
    setItinerary((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const addItineraryDay = () => {
    const newDay = {
      id: Date.now().toString(),
      day: itinerary.length + 1,
      activities: '',
      hotel: '',
    };
    setItinerary([...itinerary, newDay]);
  };

  const removeItineraryDay = (id: string) => {
    if (itinerary.length > 1) {
      setItinerary((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const totalCost = parseFloat(formData.totalCost) || 0;
  const advancePayment = parseFloat(formData.advancePayment) || 0;
  const balancePayment = totalCost - advancePayment;

  const handleSubmit = () => {
    addBooking({
      id: Date.now().toString(),
      customerId: 'temp-id',
      customerName: formData.customerName,
      tourType: 'Domestic',
      destination: formData.destination,
      startDate: formData.startDate,
      status: 'Confirmed',
      totalAmount: totalCost,
      paidAmount: advancePayment,
      balanceAmount: balancePayment,
      details: {
        travellers: formData.travellers,
        itinerary: itinerary,
        transport: formData.transportDetails,
        notes: formData.notes
      }
    });

    toast.success('Domestic tour booking created successfully!');
    onNavigate('tour-booking');
  };



  return (
    <div className="max-w-6xl space-y-6">
      {/* Customer & Tour Details */}
      <Card>
        <CardHeader>
          <CardTitle>Customer & Tour Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="customerName">Customer Name *</Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => handleChange('customerName', e.target.value)}
                placeholder="Enter customer name"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+91 98765 43210"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="destination">Destination *</Label>
              <Input
                id="destination"
                value={formData.destination}
                onChange={(e) => handleChange('destination', e.target.value)}
                placeholder="e.g., Kerala, Goa, Rajasthan"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="travellers">Number of Travellers *</Label>
              <Input
                id="travellers"
                type="number"
                value={formData.travellers}
                onChange={(e) => handleChange('travellers', e.target.value)}
                placeholder="Number of travellers"
                min="1"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange('endDate', e.target.value)}
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="transportDetails">Transport Details</Label>
            <Input
              id="transportDetails"
              value={formData.transportDetails}
              onChange={(e) => handleChange('transportDetails', e.target.value)}
              placeholder="Flight/Train/Bus details"
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Itinerary Builder */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Day-wise Itinerary</CardTitle>
          <Button
            onClick={addItineraryDay}
            size="sm"
            className="bg-[#8B1538] hover:bg-[#6B0F28]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Day
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {itinerary.map((day, index) => (
            <div key={day.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">Day {day.day}</h3>
                {itinerary.length > 1 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeItineraryDay(day.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Activities</Label>
                  <Textarea
                    value={day.activities}
                    onChange={(e) =>
                      handleItineraryChange(day.id, 'activities', e.target.value)
                    }
                    placeholder="Describe day activities"
                    rows={3}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Hotel</Label>
                  <Input
                    value={day.hotel}
                    onChange={(e) =>
                      handleItineraryChange(day.id, 'hotel', e.target.value)
                    }
                    placeholder="Hotel name"
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Tickets Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Ticket & Document Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#8B1538] transition-colors cursor-pointer">
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-gray-600 mb-1">Upload tickets, vouchers, or documents</p>
            <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
            <input type="file" className="hidden" multiple />
          </div>
        </CardContent>
      </Card>

      {/* Payment Details */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="totalCost">Total Tour Cost *</Label>
              <Input
                id="totalCost"
                type="number"
                value={formData.totalCost}
                onChange={(e) => handleChange('totalCost', e.target.value)}
                placeholder="₹ 0"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="advancePayment">Advance Payment *</Label>
              <Input
                id="advancePayment"
                type="number"
                value={formData.advancePayment}
                onChange={(e) => handleChange('advancePayment', e.target.value)}
                placeholder="₹ 0"
                className="mt-2"
              />
            </div>

            <div>
              <Label>Balance Payment</Label>
              <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                <span className="text-lg text-[#8B1538]">
                  ₹ {balancePayment.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Any special requirements or notes"
              rows={3}
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          className="flex-1 bg-[#8B1538] hover:bg-[#6B0F28]"
        >
          <Save className="w-5 h-5 mr-2" />
          Confirm Booking
        </Button>
      </div>
    </div>
  );
}
