import { useState, useEffect } from 'react';
import { ArrowLeft, Upload, Save, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { PageType } from '../../App';
import { toast } from 'sonner@2.0.3';
import { useData } from '../../context/DataContext';

interface AddCustomerProps {
  onNavigate: (page: PageType) => void;
  customerId?: string | null;
}

export function AddCustomer({ onNavigate, customerId }: AddCustomerProps) {
  const { customers, addCustomer, updateCustomer } = useData();

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    destination: '',
    travelType: '',
    travelDate: '',
    travellers: '',
    requirements: '',
    assignedStaff: '',
  });

  useEffect(() => {
    if (customerId) {
      const customer = customers.find((c) => c.id === customerId);
      if (customer) {
        setFormData({
          customerName: customer.name,
          phone: customer.mobile,
          email: customer.email || '',
          destination: customer.destination || '',
          travelType: customer.tourType.toLowerCase(), // Ensure lowercase for select
          travelDate: customer.travelDate,
          travellers: customer.travellers || '',
          requirements: customer.requirements || '',
          assignedStaff: customer.assignedStaff.toLowerCase().split(' ')[0], // simple heuristic for matching value
        });
      }
    }
  }, [customerId, customers]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const customerData = {
      name: formData.customerName,
      mobile: formData.phone,
      email: formData.email,
      tourType: formData.travelType.charAt(0).toUpperCase() + formData.travelType.slice(1), // Capitalize
      travelDate: formData.travelDate,
      status: 'Pending' as const,
      assignedStaff: formData.assignedStaff,
      destination: formData.destination,
      travellers: formData.travellers,
      requirements: formData.requirements,
    };

    if (customerId) {
      updateCustomer(customerId, customerData);
      toast.success('Customer enquiry updated successfully!');
    } else {
      addCustomer({
        id: Date.now().toString(),
        ...customerData,
      });
      toast.success('Customer enquiry saved successfully!');
    }
    onNavigate('customer-list');
  };

  const handleSaveAndConvert = () => {
    handleSave();
    // In a real app we might pass the newly created ID to the booking page
    setTimeout(() => onNavigate('tour-booking'), 100);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('customer-list')}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-[#8B1538] mb-1">
            {customerId ? 'Edit Customer Enquiry' : 'Add New Customer Enquiry'}
          </h1>
          <p className="text-gray-600">Fill in the customer details below</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="customerName">Customer Name *</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => handleChange('customerName', e.target.value)}
                  placeholder="Enter full name"
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
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="email@example.com"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="assignedStaff">Assigned Staff *</Label>
                <Select
                  value={formData.assignedStaff}
                  onValueChange={(value) => handleChange('assignedStaff', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select staff member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="amit">Amit Kumar</SelectItem>
                    <SelectItem value="sneha">Sneha Sharma</SelectItem>
                    <SelectItem value="rahul">Rahul Verma</SelectItem>
                    <SelectItem value="priya">Priya Singh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Travel Details */}
            <div className="border-t pt-6">
              <h3 className="mb-4 text-gray-900">Travel Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="destination">Destination *</Label>
                  <Input
                    id="destination"
                    value={formData.destination}
                    onChange={(e) => handleChange('destination', e.target.value)}
                    placeholder="e.g., Goa, Dubai, Kerala"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="travelType">Travel Type *</Label>
                  <Select
                    value={formData.travelType}
                    onValueChange={(value) => handleChange('travelType', value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select travel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local</SelectItem>
                      <SelectItem value="domestic">Domestic</SelectItem>
                      <SelectItem value="international">International</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="travelDate">Travel Date *</Label>
                  <Input
                    id="travelDate"
                    type="date"
                    value={formData.travelDate}
                    onChange={(e) => handleChange('travelDate', e.target.value)}
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
                    placeholder="e.g., 2"
                    min="1"
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="border-t pt-6">
              <Label htmlFor="requirements">Requirement Notes</Label>
              <Textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) => handleChange('requirements', e.target.value)}
                placeholder="Enter any special requirements, preferences, or notes..."
                rows={4}
                className="mt-2"
              />
            </div>

            {/* Document Upload */}
            <div className="border-t pt-6">
              <Label>Document Upload</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#8B1538] transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-600 mb-1">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">
                  Passport, ID Proof, or any other documents
                </p>
                <input type="file" className="hidden" multiple />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <Button
            variant="outline"
            onClick={() => onNavigate('customer-list')}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-gray-600 hover:bg-gray-700"
          >
            <Save className="w-5 h-5 mr-2" />
            Save
          </Button>
          <Button
            onClick={handleSaveAndConvert}
            className="flex-1 bg-[#8B1538] hover:bg-[#6B0F28]"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Save & Convert to Booking
          </Button>
        </div>
      </div>
    </div>
  );
}
