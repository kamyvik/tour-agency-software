import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';

export function SalaryCalculation() {
  const [formData, setFormData] = useState({
    staffName: '',
    baseSalary: '',
    workingDays: '',
    totalDays: '30',
    bonus: '0',
    deductions: '0',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const baseSalary = parseFloat(formData.baseSalary) || 0;
  const workingDays = parseFloat(formData.workingDays) || 0;
  const totalDays = parseFloat(formData.totalDays) || 30;
  const bonus = parseFloat(formData.bonus) || 0;
  const deductions = parseFloat(formData.deductions) || 0;

  const perDaySalary = baseSalary / totalDays;
  const earnedSalary = perDaySalary * workingDays;
  const finalSalary = earnedSalary + bonus - deductions;

  const handleCalculate = () => {
    toast.success('Salary calculated successfully!');
  };

  return (
    <div className="max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Calculate Monthly Salary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Staff Selection */}
          <div>
            <Label htmlFor="staffName">Select Staff Member *</Label>
            <Select
              value={formData.staffName}
              onValueChange={(value) => handleChange('staffName', value)}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select staff member" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="amit">Amit Kumar - Tour Manager</SelectItem>
                <SelectItem value="sneha">Sneha Sharma - Sales Executive</SelectItem>
                <SelectItem value="rahul">Rahul Verma - Operations Head</SelectItem>
                <SelectItem value="priya">Priya Singh - Customer Support</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Salary Details */}
          <div className="border-t pt-6">
            <h3 className="mb-4 text-gray-900">Salary Calculation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="baseSalary">Base Salary *</Label>
                <Input
                  id="baseSalary"
                  type="number"
                  value={formData.baseSalary}
                  onChange={(e) => handleChange('baseSalary', e.target.value)}
                  placeholder="₹ 0"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="totalDays">Total Days in Month</Label>
                <Input
                  id="totalDays"
                  type="number"
                  value={formData.totalDays}
                  onChange={(e) => handleChange('totalDays', e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="workingDays">Working Days *</Label>
                <Input
                  id="workingDays"
                  type="number"
                  value={formData.workingDays}
                  onChange={(e) => handleChange('workingDays', e.target.value)}
                  placeholder="e.g., 26"
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Per Day Salary</Label>
                <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                  <span className="text-lg text-gray-900">
                    ₹ {perDaySalary.toFixed(2)}
                  </span>
                </div>
              </div>

              <div>
                <Label htmlFor="bonus">Bonus/Incentive</Label>
                <Input
                  id="bonus"
                  type="number"
                  value={formData.bonus}
                  onChange={(e) => handleChange('bonus', e.target.value)}
                  placeholder="₹ 0"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="deductions">Deductions (Leaves/Advance)</Label>
                <Input
                  id="deductions"
                  type="number"
                  value={formData.deductions}
                  onChange={(e) => handleChange('deductions', e.target.value)}
                  placeholder="₹ 0"
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          {/* Salary Breakdown */}
          <div className="border-t pt-6">
            <h3 className="mb-4 text-gray-900">Salary Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Base Salary</span>
                <span className="text-gray-900">₹ {baseSalary.toLocaleString()}</span>
              </div>

              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Per Day Rate</span>
                <span className="text-gray-900">₹ {perDaySalary.toFixed(2)}</span>
              </div>

              <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Working Days</span>
                <span className="text-gray-900">{workingDays} / {totalDays} days</span>
              </div>

              <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-900">Earned Salary</span>
                <span className="text-blue-700">₹ {earnedSalary.toFixed(2)}</span>
              </div>

              <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-gray-700">+ Bonus/Incentive</span>
                <span className="text-green-700">₹ {bonus.toLocaleString()}</span>
              </div>

              <div className="flex justify-between p-3 bg-red-50 rounded-lg">
                <span className="text-gray-700">- Deductions</span>
                <span className="text-red-700">₹ {deductions.toLocaleString()}</span>
              </div>

              <div className="flex justify-between p-4 bg-[#8B1538] rounded-lg mt-4">
                <span className="text-white text-lg">Final Salary</span>
                <span className="text-white text-2xl">₹ {finalSalary.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1">
              Reset
            </Button>
            <Button
              onClick={handleCalculate}
              className="flex-1 bg-[#8B1538] hover:bg-[#6B0F28]"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Process Salary
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
