import { useState } from 'react';
import { Plus, Download } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';
import { useData } from '../../context/DataContext';

export function InwardPayment() {
  const { bookings } = useData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    bookingId: '',
    customerName: '',
    amount: '',
    mode: '',
    date: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    toast.success('Payment entry added successfully!');
    setIsAddModalOpen(false);
    setFormData({
      bookingId: '',
      customerName: '',
      amount: '',
      mode: '',
      date: '',
    });
  };

  const totalInward = bookings.reduce((sum, booking) => sum + booking.paidAmount, 0);

  return (
    <div>
      {/* Summary Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Total Inward Payment</p>
              <p className="text-3xl text-green-600">₹ {totalInward.toLocaleString()}</p>
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#8B1538] hover:bg-[#6B0F28]"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Payment
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Payments (Bookings)</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-gray-600">Booking ID</th>
                  <th className="text-left py-4 px-4 text-gray-600">Customer Name</th>
                  <th className="text-left py-4 px-4 text-gray-600">Paid Amount</th>
                  <th className="text-left py-4 px-4 text-gray-600">Status</th>
                  <th className="text-left py-4 px-4 text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-900">#{booking.id}</td>
                    <td className="py-4 px-4 text-gray-900">{booking.customerName}</td>
                    <td className="py-4 px-4 text-green-600">₹ {booking.paidAmount.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">{booking.status}</Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{booking.startDate}</td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">
                      No payments/bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Payment Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Inward Payment</DialogTitle>
            <DialogDescription>
              Record a new payment received from customer
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label htmlFor="bookingId">Booking ID *</Label>
              <Input
                id="bookingId"
                value={formData.bookingId}
                onChange={(e) => handleChange('bookingId', e.target.value)}
                placeholder="e.g., BK001"
                className="mt-2"
              />
            </div>

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
              <Label htmlFor="amount">Amount *</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                placeholder="₹ 0"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="mode">Payment Mode *</Label>
              <Select
                value={formData.mode}
                onValueChange={(value) => handleChange('mode', value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select payment mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className="mt-2"
              />
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setIsAddModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-[#8B1538] hover:bg-[#6B0F28]"
              >
                Add Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
