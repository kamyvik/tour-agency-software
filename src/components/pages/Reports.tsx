import { useState } from 'react';
import { Download, FileText, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { PageType } from '../../App';
import { toast } from 'sonner@2.0.3';
import { useData } from '../../context/DataContext';

interface ReportsProps {
  onNavigate: (page: PageType) => void;
}

export function Reports({ onNavigate }: ReportsProps) {
  const { bookings } = useData();
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [tourType, setTourType] = useState('all');

  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const pendingPayments = bookings.reduce((sum, b) => sum + b.balanceAmount, 0);
  // specific logic for profit could be complex, assuming 20% margin for demo
  const netProfit = totalRevenue * 0.20;

  const reportTypes = [
    {
      id: 'booking',
      title: 'Booking Summary Report',
      description: 'Complete summary of all bookings with customer details',
      icon: FileText,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      id: 'payment',
      title: 'Payment Pending Report',
      description: 'List of all pending payments and outstanding balances',
      icon: FileText,
      color: 'bg-orange-50 text-orange-600',
    },
    {
      id: 'profit',
      title: 'Profit/Loss Report',
      description: 'Detailed profit and loss statement with breakdowns',
      icon: FileText,
      color: 'bg-green-50 text-green-600',
    },
    {
      id: 'vehicle',
      title: 'Vehicle Utilization Report',
      description: 'Vehicle usage statistics and availability report',
      icon: FileText,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      id: 'salary',
      title: 'Salary Report',
      description: 'Staff salary breakdown and payment history',
      icon: FileText,
      color: 'bg-pink-50 text-pink-600',
    },
    {
      id: 'customer',
      title: 'Customer Analytics',
      description: 'Customer demographics and booking patterns',
      icon: FileText,
      color: 'bg-indigo-50 text-indigo-600',
    },
  ];

  const handleDownloadPDF = (reportId: string) => {
    toast.success(`Downloading ${reportId} report as PDF...`);
  };

  const handleDownloadExcel = (reportId: string) => {
    toast.success(`Downloading ${reportId} report as Excel...`);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[#8B1538] mb-2">Reports & Analytics</h1>
        <p className="text-gray-600">Generate and export various business reports</p>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Report Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="dateFrom">From Date</Label>
              <Input
                id="dateFrom"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="dateTo">To Date</Label>
              <Input
                id="dateTo"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="tourType">Tour Type</Label>
              <Select value={tourType} onValueChange={setTourType}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="local">Local</SelectItem>
                  <SelectItem value="domestic">Domestic</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="w-full bg-[#8B1538] hover:bg-[#6B0F28]">
                <Calendar className="w-5 h-5 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`w-12 h-12 ${report.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="mb-2 text-gray-900">{report.title}</h3>
                <p className="text-gray-600 text-sm mb-6">{report.description}</p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleDownloadPDF(report.id)}
                    size="sm"
                    variant="outline"
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </Button>
                  <Button
                    onClick={() => handleDownloadExcel(report.id)}
                    size="sm"
                    className="flex-1 bg-[#8B1538] hover:bg-[#6B0F28]"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Excel
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-600 mb-1">Total Bookings</p>
            <p className="text-2xl text-gray-900">{totalBookings}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-gray-600 mb-1">Total Revenue</p>
            <p className="text-2xl text-green-600">₹ {totalRevenue.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-gray-600 mb-1">Pending Payments</p>
            <p className="text-2xl text-orange-600">₹ {pendingPayments.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-gray-600 mb-1">Net Profit (Est.)</p>
            <p className="text-2xl text-[#8B1538]">₹ {netProfit.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
