import { Search, Eye, Edit, Download } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { PageType } from '../../App';

interface BookingListProps {
  onNavigate: (page: PageType) => void;
}

interface Booking {
  id: string;
  bookingId: string;
  customerName: string;
  tourType: string;
  destination: string;
  startDate: string;
  travellers: number;
  totalAmount: string;
  paidAmount: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
}

export function BookingList({ onNavigate }: BookingListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const bookings: Booking[] = [
    {
      id: '1',
      bookingId: 'BK001',
      customerName: 'Rajesh Kumar',
      tourType: 'Local',
      destination: 'Mumbai City Tour',
      startDate: '2024-01-15',
      travellers: 4,
      totalAmount: '₹12,000',
      paidAmount: '₹12,000',
      status: 'Confirmed',
    },
    {
      id: '2',
      bookingId: 'BK002',
      customerName: 'Priya Sharma',
      tourType: 'Domestic',
      destination: 'Kerala Backwaters',
      startDate: '2024-01-20',
      travellers: 2,
      totalAmount: '₹45,000',
      paidAmount: '₹20,000',
      status: 'Pending',
    },
    {
      id: '3',
      bookingId: 'BK003',
      customerName: 'Vikram Singh',
      tourType: 'International',
      destination: 'Dubai Shopping Festival',
      startDate: '2024-02-10',
      travellers: 3,
      totalAmount: '₹1,85,000',
      paidAmount: '₹1,85,000',
      status: 'Confirmed',
    },
    {
      id: '4',
      bookingId: 'BK004',
      customerName: 'Anita Desai',
      tourType: 'Domestic',
      destination: 'Rajasthan Heritage',
      startDate: '2024-01-05',
      travellers: 5,
      totalAmount: '₹95,000',
      paidAmount: '₹95,000',
      status: 'Completed',
    },
  ];

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.bookingId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || booking.tourType === filterType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-orange-100 text-orange-700';
      case 'Completed':
        return 'bg-blue-100 text-blue-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search by booking ID or customer name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Tour Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Local">Local</SelectItem>
                <SelectItem value="Domestic">Domestic</SelectItem>
                <SelectItem value="International">International</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Booking Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Bookings ({filteredBookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-gray-600">Booking ID</th>
                  <th className="text-left py-4 px-4 text-gray-600">Customer</th>
                  <th className="text-left py-4 px-4 text-gray-600">Tour Type</th>
                  <th className="text-left py-4 px-4 text-gray-600">Destination</th>
                  <th className="text-left py-4 px-4 text-gray-600">Date</th>
                  <th className="text-left py-4 px-4 text-gray-600">Travellers</th>
                  <th className="text-left py-4 px-4 text-gray-600">Amount</th>
                  <th className="text-left py-4 px-4 text-gray-600">Status</th>
                  <th className="text-left py-4 px-4 text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-900">{booking.bookingId}</td>
                    <td className="py-4 px-4 text-gray-900">{booking.customerName}</td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">{booking.tourType}</Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{booking.destination}</td>
                    <td className="py-4 px-4 text-gray-600">{booking.startDate}</td>
                    <td className="py-4 px-4 text-gray-600">{booking.travellers}</td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="text-gray-900">{booking.totalAmount}</div>
                        <div className="text-xs text-gray-500">Paid: {booking.paidAmount}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
