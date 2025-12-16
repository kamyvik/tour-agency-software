import { useState } from 'react';
import { Plus, Search, Edit, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { toast } from 'sonner@2.0.3';

interface Staff {
  id: string;
  name: string;
  role: string;
  salary: string;
  contact: string;
  status: 'Active' | 'Inactive';
}

export function StaffList() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    salary: '',
    contact: '',
    email: '',
  });

  const staff: Staff[] = [
    {
      id: '1',
      name: 'Amit Kumar',
      role: 'Tour Manager',
      salary: '₹35,000',
      contact: '+91 98765 43210',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Sneha Sharma',
      role: 'Sales Executive',
      salary: '₹28,000',
      contact: '+91 87654 32109',
      status: 'Active',
    },
    {
      id: '3',
      name: 'Rahul Verma',
      role: 'Operations Head',
      salary: '₹45,000',
      contact: '+91 76543 21098',
      status: 'Active',
    },
    {
      id: '4',
      name: 'Priya Singh',
      role: 'Customer Support',
      salary: '₹22,000',
      contact: '+91 65432 10987',
      status: 'Active',
    },
  ];

  const filteredStaff = staff.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    toast.success('Staff member added successfully!');
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      role: '',
      salary: '',
      contact: '',
      email: '',
    });
  };

  return (
    <div>
      {/* Search and Add */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by name or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#8B1538] hover:bg-[#6B0F28]"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Staff
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Members ({filteredStaff.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-gray-600">Name</th>
                  <th className="text-left py-4 px-4 text-gray-600">Role</th>
                  <th className="text-left py-4 px-4 text-gray-600">Salary</th>
                  <th className="text-left py-4 px-4 text-gray-600">Contact</th>
                  <th className="text-left py-4 px-4 text-gray-600">Status</th>
                  <th className="text-left py-4 px-4 text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((member) => (
                  <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-900">{member.name}</td>
                    <td className="py-4 px-4 text-gray-600">{member.role}</td>
                    <td className="py-4 px-4 text-gray-900">{member.salary}</td>
                    <td className="py-4 px-4 text-gray-600">{member.contact}</td>
                    <td className="py-4 px-4">
                      <Badge className="bg-green-100 text-green-700">
                        {member.status}
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
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Staff Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Staff Member</DialogTitle>
            <DialogDescription>
              Enter details of the new staff member
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter full name"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="role">Role *</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => handleChange('role', value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">Tour Manager</SelectItem>
                  <SelectItem value="sales">Sales Executive</SelectItem>
                  <SelectItem value="operations">Operations Head</SelectItem>
                  <SelectItem value="support">Customer Support</SelectItem>
                  <SelectItem value="driver">Driver</SelectItem>
                  <SelectItem value="accountant">Accountant</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="salary">Monthly Salary *</Label>
              <Input
                id="salary"
                type="number"
                value={formData.salary}
                onChange={(e) => handleChange('salary', e.target.value)}
                placeholder="₹ 0"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="contact">Contact Number *</Label>
              <Input
                id="contact"
                type="tel"
                value={formData.contact}
                onChange={(e) => handleChange('contact', e.target.value)}
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
                Add Staff Member
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
