import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function ProfitCalculation() {
  // Mock data
  const totalInward = 2170000;
  const totalOutward = 885000;
  const salaries = 250000;
  const miscExpenses = 45000;

  const grossProfit = totalInward - totalOutward;
  const netProfit = grossProfit - salaries - miscExpenses;
  const profitMargin = ((netProfit / totalInward) * 100).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Main Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Total Inward</p>
              <div className="bg-green-50 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-3xl text-green-600">₹ {totalInward.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Total Outward</p>
              <div className="bg-red-50 p-2 rounded-lg">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <p className="text-3xl text-red-600">₹ {totalOutward.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Gross Profit</p>
              <div className="bg-blue-50 p-2 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl text-blue-600">₹ {grossProfit.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Profit Calculation Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Total Inward (Revenue)</span>
              <span className="text-green-600">+ ₹ {totalInward.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Total Outward (Direct Expenses)</span>
              <span className="text-red-600">- ₹ {totalOutward.toLocaleString()}</span>
            </div>

            <div className="border-t-2 border-gray-300 pt-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <span className="text-gray-900">Gross Profit</span>
                <span className="text-blue-700 text-xl">₹ {grossProfit.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Staff Salaries</span>
              <span className="text-red-600">- ₹ {salaries.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Miscellaneous Expenses</span>
              <span className="text-red-600">- ₹ {miscExpenses.toLocaleString()}</span>
            </div>

            <div className="border-t-2 border-[#8B1538] pt-4">
              <div className="flex items-center justify-between p-6 bg-[#8B1538] rounded-lg">
                <div>
                  <span className="text-white text-lg">Net Profit</span>
                  <p className="text-white/80 text-sm mt-1">
                    Profit Margin: {profitMargin}%
                  </p>
                </div>
                <span className="text-white text-3xl">₹ {netProfit.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Revenue</span>
                <span className="text-green-600">₹ 2,17,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expenses</span>
                <span className="text-red-600">₹ 8,85,000</span>
              </div>
              <div className="flex justify-between pt-3 border-t">
                <span className="text-gray-900">Net Profit</span>
                <span className="text-[#8B1538]">₹ 9,90,000</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Last Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Revenue</span>
                <span className="text-green-600">₹ 1,85,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expenses</span>
                <span className="text-red-600">₹ 7,20,000</span>
              </div>
              <div className="flex justify-between pt-3 border-t">
                <span className="text-gray-900">Net Profit</span>
                <span className="text-[#8B1538]">₹ 7,70,000</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
