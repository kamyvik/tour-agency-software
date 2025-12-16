import { useState } from 'react';
import { Save, Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { PageType } from '../../App';
import { toast } from 'sonner@2.0.3';
import { useData } from '../../context/DataContext';

interface InternationalTourBookingProps {
  onNavigate: (page: PageType) => void;
}

export function InternationalTourBooking({ onNavigate }: InternationalTourBookingProps) {
  const { addBooking } = useData();
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    destination: '',
    passportNumber: '',
    passportExpiry: '',
    visaStatus: '',
    startDate: '',
    endDate: '',
    travellers: '',
    flightDetails: '',
    hotelDetails: '',
    baseCost: '',
    currencyRate: '',
    advancePayment: '',
    notes: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const baseCost = parseFloat(formData.baseCost) || 0;
  const currencyRate = parseFloat(formData.currencyRate) || 1;
  const totalCostINR = baseCost * currencyRate;
  const advancePayment = parseFloat(formData.advancePayment) || 0;
  const balancePayment = totalCostINR - advancePayment;

  const handleSubmit = () => {
    addBooking({
      id: Date.now().toString(),
      customerId: 'temp-id',
      customerName: formData.customerName,
      tourType: 'International',
      destination: formData.destination,
      startDate: formData.startDate,
      status: 'Confirmed',
      totalAmount: totalCostINR,
      paidAmount: advancePayment,
      balanceAmount: balancePayment,
      details: {
        passportNumber: formData.passportNumber,
        visaStatus: formData.visaStatus,
        travellers: formData.travellers,
        flightDetails: formData.flightDetails,
        hotelDetails: formData.hotelDetails,
        notes: formData.notes
      }
    });

    toast.success('International tour booking created successfully!');
    onNavigate('tour-booking');
  };

  return (
    <div className="max-w-6xl space-y-6">
      {/* Customer Details */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
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
          </div>
        </CardContent>
      </Card>

      {/* Passport & Visa Details */}
      <Card>
        <CardHeader>
          <CardTitle>Passport & Visa Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="passportNumber">Passport Number *</Label>
              <Input
                id="passportNumber"
                value={formData.passportNumber}
                onChange={(e) => handleChange('passportNumber', e.target.value)}
                placeholder="Enter passport number"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="passportExpiry">Passport Expiry Date *</Label>
              <Input
                id="passportExpiry"
                type="date"
                value={formData.passportExpiry}
                onChange={(e) => handleChange('passportExpiry', e.target.value)}
                className="mt-2"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="visaStatus">Visa Status *</Label>
              <Select
                value={formData.visaStatus}
                onValueChange={(value) => handleChange('visaStatus', value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select visa status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="not-required">Not Required</SelectItem>
                  <SelectItem value="in-process">In Process</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tour Details */}
      <Card>
        <CardHeader>
          <CardTitle>Tour Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="destination">Destination *</Label>
              <Input
                id="destination"
                value={formData.destination}
                onChange={(e) => handleChange('destination', e.target.value)}
                placeholder="e.g., Dubai, Singapore, Europe"
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

            <div>
              <Label htmlFor="flightDetails">Flight Details</Label>
              <Input
                id="flightDetails"
                value={formData.flightDetails}
                onChange={(e) => handleChange('flightDetails', e.target.value)}
                placeholder="Flight number and details"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="hotelDetails">Hotel Details</Label>
              <Input
                id="hotelDetails"
                value={formData.hotelDetails}
                onChange={(e) => handleChange('hotelDetails', e.target.value)}
                placeholder="Hotel name and location"
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Flight Ticket & Document Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#8B1538] transition-colors cursor-pointer">
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-gray-600 mb-1">Upload flight tickets, visa, and other documents</p>
            <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
            <input type="file" className="hidden" multiple />
          </div>
        </CardContent>
      </Card>

      {/* Payment & Currency */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Details & Currency Conversion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="baseCost">Base Cost (Foreign Currency) *</Label>
              <Input
                id="baseCost"
                type="number"
                value={formData.baseCost}
                onChange={(e) => handleChange('baseCost', e.target.value)}
                placeholder="$ 0"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="currencyRate">Currency Rate (to INR) *</Label>
              <Input
                id="currencyRate"
                type="number"
                step="0.01"
                value={formData.currencyRate}
                onChange={(e) => handleChange('currencyRate', e.target.value)}
                placeholder="e.g., 83.50"
                className="mt-2"
              />
            </div>

            <div>
              <Label>Total Cost in INR</Label>
              <div className="mt-2 p-3 bg-blue-50 rounded-md border border-blue-200">
                <span className="text-lg text-blue-700">
                  ₹ {totalCostINR.toLocaleString()}
                </span>
              </div>
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

            <div className="md:col-span-2">
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
              placeholder="Any special requirements, medical conditions, or notes"
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
