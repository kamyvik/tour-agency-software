import { 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  AlertCircle,
  Plus,
  Users,
  Map,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { PageType } from '../../App';

interface DashboardProps {
  onNavigate: (page: PageType) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const summaryCards = [
    {
      title: 'Total Bookings Today',
      value: '12',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Pending Payments',
      value: '₹45,000',
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Total Tours This Month',
      value: '156',
      icon: Map,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Profit Summary',
      value: '₹2,45,000',
      icon: TrendingUp,
      color: 'text-[#8B1538]',
      bgColor: 'bg-red-50',
    },
  ];

  const quickLinks = [
    { label: 'New Booking', page: 'tour-booking' as PageType, icon: Plus },
    { label: 'Add Customer', page: 'add-customer' as PageType, icon: Users },
    { label: 'View Tours', page: 'tour-booking' as PageType, icon: Map },
    { label: 'Finance Overview', page: 'finance' as PageType, icon: DollarSign },
  ];

  const recentActivities = [
    {
      id: 1,
      customer: 'Rajesh Kumar',
      activity: 'New booking created',
      tour: 'Goa Beach Paradise',
      time: '10 minutes ago',
      status: 'success',
    },
    {
      id: 2,
      customer: 'Priya Sharma',
      activity: 'Payment received',
      tour: 'Kerala Backwaters',
      time: '25 minutes ago',
      status: 'success',
    },
    {
      id: 3,
      customer: 'Amit Patel',
      activity: 'Enquiry added',
      tour: 'Rajasthan Heritage',
      time: '1 hour ago',
      status: 'pending',
    },
    {
      id: 4,
      customer: 'Sneha Reddy',
      activity: 'Booking confirmed',
      tour: 'Himachal Adventure',
      time: '2 hours ago',
      status: 'success',
    },
    {
      id: 5,
      customer: 'Vikram Singh',
      activity: 'Payment pending',
      tour: 'Dubai Shopping Festival',
      time: '3 hours ago',
      status: 'warning',
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[#8B1538] mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${card.bgColor} ${card.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-1">{card.title}</p>
                <p className="text-3xl text-gray-900">{card.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Links */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Button
                  key={index}
                  onClick={() => onNavigate(link.page)}
                  className="h-auto py-6 flex flex-col gap-2 bg-white border-2 border-gray-200 text-gray-700 hover:border-[#8B1538] hover:text-[#8B1538] hover:bg-white"
                  variant="outline"
                >
                  <Icon className="w-6 h-6" />
                  <span>{link.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-gray-900">{activity.customer}</p>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        activity.status === 'success'
                          ? 'bg-green-100 text-green-700'
                          : activity.status === 'warning'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {activity.activity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{activity.tour}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-gray-500">{activity.time}</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onNavigate('customer-list')}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
