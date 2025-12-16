import { useState } from 'react';
import { Search, Filter, Plus, Edit, Eye, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { PageType } from '../../App';

import { useData, Customer } from '../../context/DataContext';

interface CustomerListProps {
  onNavigate: (page: PageType) => void;
  onSelectCustomer: (id: string | null) => void;
}

export function CustomerList({ onNavigate, onSelectCustomer }: CustomerListProps) {
  const { customers } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.mobile.includes(searchQuery);
    const matchesType = filterType === 'all' || customer.tourType === filterType;
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleEdit = (customer: Customer) => {
    onSelectCustomer(customer.id);
    onNavigate('add-customer');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Converted':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-orange-100 text-orange-700';
      case 'Follow-up':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[#8B1538] mb-2">Customer Enquiries</h1>
          <p className="text-gray-600">Manage all customer enquiries and leads</p>
        </div>
        <Button
          onClick={() => {
            onSelectCustomer(null);
            onNavigate('add-customer');
          }}
          className="bg-[#8B1538] hover:bg-[#6B0F28]"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Enquiry
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search by name or mobile..."
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

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Converted">Converted</SelectItem>
                <SelectItem value="Follow-up">Follow-up</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customer Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer List ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-gray-600">Customer Name</th>
                  <th className="text-left py-4 px-4 text-gray-600">Mobile</th>
                  <th className="text-left py-4 px-4 text-gray-600">Tour Type</th>
                  <th className="text-left py-4 px-4 text-gray-600">Travel Date</th>
                  <th className="text-left py-4 px-4 text-gray-600">Status</th>
                  <th className="text-left py-4 px-4 text-gray-600">Assigned Staff</th>
                  <th className="text-left py-4 px-4 text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-900">{customer.name}</td>
                    <td className="py-4 px-4 text-gray-600">{customer.mobile}</td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">{customer.tourType}</Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{customer.travelDate}</td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(customer.status)}>
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{customer.assignedStaff}</td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(customer)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {customer.status === 'Pending' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-green-600 hover:text-green-700"
                            onClick={() => onNavigate('tour-booking')}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
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
