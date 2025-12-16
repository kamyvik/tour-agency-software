import { useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { PageType } from '../../App';
import { toast } from 'sonner@2.0.3';
import { useData } from '../../context/DataContext';

interface LocalTourBookingProps {
  onNavigate: (page: PageType) => void;
}

export function LocalTourBooking({ onNavigate }: LocalTourBookingProps) {
  const { addBooking } = useData();
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    tourPackage: '',
    vehicleType: '',
    driverAssignment: '',
    guestCount: '',
    startDate: '',
    endDate: '',
    totalAmount: '',
    paidAmount: '',
    paymentMode: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      // Auto-calculate balance
      if (field === 'totalAmount' || field === 'paidAmount') {
        const total = parseFloat(updated.totalAmount) || 0;
        const paid = parseFloat(updated.paidAmount) || 0;
        const balance = total - paid;
      }

      return updated;
    });
  };

  const totalAmount = parseFloat(formData.totalAmount) || 0;
  const paidAmount = parseFloat(formData.paidAmount) || 0;
  const balanceAmount = totalAmount - paidAmount;

  const handleSubmit = () => {
    addBooking({
      id: Date.now().toString(),
      customerId: 'temp-id', // In real flow we'd select a customer
      customerName: formData.customerName,
      tourType: 'Local',
      destination: formData.tourPackage,
      startDate: formData.startDate,
      status: 'Confirmed',
      totalAmount: totalAmount,
      paidAmount: paidAmount,
      balanceAmount: balanceAmount,
      details: {
        vehicleType: formData.vehicleType,
        driver: formData.driverAssignment,
        guestCount: formData.guestCount,
        paymentMode: formData.paymentMode
      }
    });

    toast.success('Local tour booking created successfully!');
    onNavigate('tour-booking');
  };

  return (
    <div className="max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Create Local Tour Booking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Customer Details */}
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

          {/* Tour Details */}
          <div className="border-t pt-6">
            <h3 className="mb-4 text-gray-900">Tour Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="tourPackage">Tour Package *</Label>
                <Select
                  value={formData.tourPackage}
                  onValueChange={(value) => handleChange('tourPackage', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select package" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mumbai-half">Mumbai Half Day</SelectItem>
                    <SelectItem value="mumbai-full">Mumbai Full Day</SelectItem>
                    <SelectItem value="pune-local">Pune Local Tour</SelectItem>
                    <SelectItem value="delhi-sight">Delhi Sightseeing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="vehicleType">Vehicle Type *</Label>
                <Select
                  value={formData.vehicleType}
                  onValueChange={(value) => handleChange('vehicleType', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">Sedan (4 seater)</SelectItem>
                    <SelectItem value="suv">SUV (7 seater)</SelectItem>
                    <SelectItem value="tempo">Tempo Traveller (12 seater)</SelectItem>
                    <SelectItem value="bus">Mini Bus (20 seater)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="driverAssignment">Driver Assignment *</Label>
                <Select
                  value={formData.driverAssignment}
                  onValueChange={(value) => handleChange('driverAssignment', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select driver" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ramesh">Ramesh Kumar</SelectItem>
                    <SelectItem value="suresh">Suresh Patel</SelectItem>
                    <SelectItem value="mahesh">Mahesh Singh</SelectItem>
                    <SelectItem value="dinesh">Dinesh Sharma</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="guestCount">Guest Count *</Label>
                <Input
                  id="guestCount"
                  type="number"
                  value={formData.guestCount}
                  onChange={(e) => handleChange('guestCount', e.target.value)}
                  placeholder="Number of guests"
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
          </div>

          {/* Payment Details */}
          <div className="border-t pt-6">
            <h3 className="mb-4 text-gray-900">Payment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="totalAmount">Total Amount *</Label>
                <Input
                  id="totalAmount"
                  type="number"
                  value={formData.totalAmount}
                  onChange={(e) => handleChange('totalAmount', e.target.value)}
                  placeholder="₹ 0"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="paidAmount">Paid Amount *</Label>
                <Input
                  id="paidAmount"
                  type="number"
                  value={formData.paidAmount}
                  onChange={(e) => handleChange('paidAmount', e.target.value)}
                  placeholder="₹ 0"
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Balance Amount</Label>
                <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                  <span className="text-lg text-[#8B1538]">
                    ₹ {balanceAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <Label htmlFor="paymentMode">Payment Mode *</Label>
                <Select
                  value={formData.paymentMode}
                  onValueChange={(value) => handleChange('paymentMode', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
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
