import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { InwardPayment } from '../finance/InwardPayment';
import { OutwardExpense } from '../finance/OutwardExpense';
import { ProfitCalculation } from '../finance/ProfitCalculation';
import { PageType } from '../../App';

interface FinanceModuleProps {
  onNavigate: (page: PageType) => void;
}

export function FinanceModule({ onNavigate }: FinanceModuleProps) {
  const [activeTab, setActiveTab] = useState('inward');

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[#8B1538] mb-2">Finance Management</h1>
        <p className="text-gray-600">Track payments, expenses, and profit calculations</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="inward">Inward Payment</TabsTrigger>
          <TabsTrigger value="outward">Outward Expense</TabsTrigger>
          <TabsTrigger value="profit">Profit Calculation</TabsTrigger>
        </TabsList>

        <TabsContent value="inward">
          <InwardPayment />
        </TabsContent>

        <TabsContent value="outward">
          <OutwardExpense />
        </TabsContent>

        <TabsContent value="profit">
          <ProfitCalculation />
        </TabsContent>
      </Tabs>
    </div>
  );
}
