import { useState } from 'react';
import { Plus, Search, Edit, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { PageType } from '../../App';
import { toast } from 'sonner@2.0.3';
import { useData, Vehicle } from '../../context/DataContext';

interface VehicleManagementProps {
  onNavigate: (page: PageType) => void;
}

export function VehicleManagement({ onNavigate }: VehicleManagementProps) {
  const { vehicles, updateVehicle } = useData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    vehicleId: '',
    numberPlate: '',
    vehicleType: '',
    customerName: '',
    destination: '',
    driverName: '',
    fuelExpense: '',
    notes: '',
  });

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-700';
      case 'Booked':
        return 'bg-blue-100 text-blue-700';
      case 'Under Maintenance':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const [modalMode, setModalMode] = useState<'add-vehicle' | 'create-booking'>('create-booking');

  const handleSubmit = () => {
    if (modalMode === 'add-vehicle') {
      // Validate inputs for adding vehicle
      if (!formData.numberPlate || !formData.vehicleType || !formData.driverName) {
        toast.error("Please fill in Vehicle Number, Type and Driver");
        return;
      }

      // Add new vehicle to DB (using generic type since ID is generated)
      // We map form fields to Vehicle interface
      // Note: useData's addVehicle expects a Vehicle object
      // We'll mock the missing fields or add them to form
      addVehicle({
        id: Date.now().toString(), // Temp ID, backend should generate UUID
        vehicleNumber: formData.numberPlate,
        type: formData.vehicleType,
        status: 'Available',
        driver: formData.driverName,
        lastService: new Date().toISOString().split('T')[0] // Default to today
      });
      toast.success("New vehicle added to fleet!");
    } else {
      // Booking Logic (Update existing)
      if (formData.vehicleId) {
        updateVehicle(formData.vehicleId, {
          status: 'Booked',
          driver: formData.driverName
        });
        toast.success(`Vehicle assigned to ${formData.customerName} successfully!`);
      } else {
        toast.error("Please select a vehicle.");
        return;
      }
    }

    setIsAddModalOpen(false);
    setFormData({
      vehicleId: '',
      numberPlate: '',
      customerName: '',
      destination: '',
      driverName: '',
      fuelExpense: '',
      notes: '',
      vehicleType: '',
    });
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[#8B1538] mb-2">Vehicle Management</h1>
          <p className="text-gray-600">Manage vehicles, drivers, and bookings</p>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() => {
              setModalMode('add-vehicle');
              setIsAddModalOpen(true);
            }}
            variant="outline"
            className="border-[#8B1538] text-[#8B1538] hover:bg-[#8B1538]/10"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Vehicle
          </Button>
          <Button
            onClick={() => {
              setModalMode('create-booking');
              setIsAddModalOpen(true);
            }}
            className="bg-[#8B1538] hover:bg-[#6B0F28]"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Booking
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by vehicle number or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Vehicle List */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle List ({filteredVehicles.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-gray-600">Vehicle Number</th>
                  <th className="text-left py-4 px-4 text-gray-600">Type</th>
                  <th className="text-left py-4 px-4 text-gray-600">Status</th>
                  <th className="text-left py-4 px-4 text-gray-600">Driver</th>
                  <th className="text-left py-4 px-4 text-gray-600">Last Service</th>
                  <th className="text-left py-4 px-4 text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-900">{vehicle.vehicleNumber}</td>
                    <td className="py-4 px-4 text-gray-600">{vehicle.type}</td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(vehicle.status)}>
                        {vehicle.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{vehicle.driver}</td>
                    <td className="py-4 px-4 text-gray-600">{vehicle.lastService}</td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
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

      {/* Dynamic Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{modalMode === 'add-vehicle' ? 'Register New Vehicle' : 'Create Vehicle Booking'}</DialogTitle>
            <DialogDescription>
              {modalMode === 'add-vehicle' ? 'Add a new vehicle to your fleet' : 'Assign a vehicle to a customer booking'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Common Fields */}
              <div>
                <Label htmlFor="vehicleType">Vehicle Type *</Label>
                <Select
                  value={formData.vehicleType}
                  onValueChange={(value) => handleChange('vehicleType', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="tempo">Tempo Traveller</SelectItem>
                    <SelectItem value="bus">Mini Bus</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="driverName">Driver Name *</Label>
                <div className="mt-2">
                  {/* Assuming free text for now, should be select in real app */}
                  <Input
                    id="driverName"
                    value={formData.driverName}
                    onChange={(e) => handleChange('driverName', e.target.value)}
                    placeholder="Enter driver name"
                  />
                </div>
              </div>

              {/* Add Vehicle Specific Fields */}
              {modalMode === 'add-vehicle' && (
                <div>
                  <Label htmlFor="numberPlate">Vehicle Number Plate *</Label>
                  <Input
                    id="numberPlate"
                    value={formData.numberPlate}
                    onChange={(e) => handleChange('numberPlate', e.target.value)}
                    placeholder="e.g. MH 12 AB 1234"
                    className="mt-2"
                  />
                </div>
              )}

              {/* Booking Specific Fields */}
              {modalMode === 'create-booking' && (
                <>
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
                    <Label htmlFor="vehicleId">Select Available Vehicle *</Label>
                    <Select
                      value={formData.vehicleId}
                      onValueChange={(value) => handleChange('vehicleId', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Choose from fleet" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicles.filter(v => v.status === 'Available').map(v => (
                          <SelectItem key={v.id} value={v.id}>{v.vehicleNumber} ({v.type})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="destination">Destination *</Label>
                    <Input
                      id="destination"
                      value={formData.destination}
                      onChange={(e) => handleChange('destination', e.target.value)}
                      placeholder="Enter destination"
                      className="mt-2"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="fuelExpense">Fuel Expense</Label>
                    <Input
                      id="fuelExpense"
                      type="number"
                      value={formData.fuelExpense}
                      onChange={(e) => handleChange('fuelExpense', e.target.value)}
                      placeholder="₹ 0"
                      className="mt-2"
                    />
                  </div>
                </>
              )}

              <div className="md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="Any additional notes"
                  rows={3}
                  className="mt-2"
                />
              </div>
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
                {modalMode === 'add-vehicle' ? 'Register Vehicle' : 'Confirm Assignment'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
