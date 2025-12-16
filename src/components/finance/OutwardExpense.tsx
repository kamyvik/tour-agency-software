import { useState } from 'react';
import { Plus, Download, Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';

interface Expense {
  id: string;
  expenseType: string;
  amount: string;
  vendorName: string;
  date: string;
}

export function OutwardExpense() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    expenseType: '',
    amount: '',
    vendorName: '',
    date: '',
    description: '',
  });

  const expenses: Expense[] = [
    {
      id: '1',
      expenseType: 'Hotel',
      amount: '₹15,000',
      vendorName: 'Taj Hotels',
      date: '2024-01-10',
    },
    {
      id: '2',
      expenseType: 'Flight',
      amount: '₹45,000',
      vendorName: 'Air India',
      date: '2024-01-08',
    },
    {
      id: '3',
      expenseType: 'Fuel',
      amount: '₹3,500',
      vendorName: 'HP Petrol Pump',
      date: '2024-01-07',
    },
    {
      id: '4',
      expenseType: 'Staff Salary',
      amount: '₹25,000',
      vendorName: 'Monthly Salary',
      date: '2024-01-01',
    },
  ];

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    toast.success('Expense entry added successfully!');
    setIsAddModalOpen(false);
    setFormData({
      expenseType: '',
      amount: '',
      vendorName: '',
      date: '',
      description: '',
    });
  };

  const totalOutward = expenses.reduce((sum, expense) => {
    const amount = parseFloat(expense.amount.replace(/[₹,]/g, ''));
    return sum + amount;
  }, 0);

  const getExpenseColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Hotel': 'bg-purple-100 text-purple-700',
      'Flight': 'bg-blue-100 text-blue-700',
      'Fuel': 'bg-orange-100 text-orange-700',
      'Staff Salary': 'bg-green-100 text-green-700',
      'Food': 'bg-yellow-100 text-yellow-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div>
      {/* Summary Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-1">Total Outward Expense</p>
              <p className="text-3xl text-red-600">₹ {totalOutward.toLocaleString()}</p>
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#8B1538] hover:bg-[#6B0F28]"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Expense
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Expense List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Expense History</CardTitle>
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
                  <th className="text-left py-4 px-4 text-gray-600">Expense Type</th>
                  <th className="text-left py-4 px-4 text-gray-600">Vendor Name</th>
                  <th className="text-left py-4 px-4 text-gray-600">Amount</th>
                  <th className="text-left py-4 px-4 text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <Badge className={getExpenseColor(expense.expenseType)}>
                        {expense.expenseType}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{expense.vendorName}</td>
                    <td className="py-4 px-4 text-red-600">{expense.amount}</td>
                    <td className="py-4 px-4 text-gray-600">{expense.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Expense Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Outward Expense</DialogTitle>
            <DialogDescription>
              Record a new business expense
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label htmlFor="expenseType">Expense Type *</Label>
              <Select
                value={formData.expenseType}
                onValueChange={(value) => handleChange('expenseType', value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select expense type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hotel">Hotel</SelectItem>
                  <SelectItem value="flight">Flight</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="fuel">Fuel</SelectItem>
                  <SelectItem value="staff">Staff Salary</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
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
              <Label htmlFor="vendorName">Vendor Name *</Label>
              <Input
                id="vendorName"
                value={formData.vendorName}
                onChange={(e) => handleChange('vendorName', e.target.value)}
                placeholder="Enter vendor/supplier name"
                className="mt-2"
              />
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

            <div>
              <Label>Receipt Upload</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#8B1538] transition-colors cursor-pointer">
                <Upload className="w-6 h-6 mx-auto mb-1 text-gray-400" />
                <p className="text-sm text-gray-600">Upload receipt</p>
                <input type="file" className="hidden" />
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
                Add Expense
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
