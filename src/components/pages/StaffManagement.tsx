import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { StaffList } from '../staff/StaffList';
import { SalaryCalculation } from '../staff/SalaryCalculation';
import { PageType } from '../../App';

interface StaffManagementProps {
  onNavigate: (page: PageType) => void;
}

export function StaffManagement({ onNavigate }: StaffManagementProps) {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[#8B1538] mb-2">Staff Management</h1>
        <p className="text-gray-600">Manage staff members, salaries, and attendance</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="list">Staff List</TabsTrigger>
          <TabsTrigger value="salary">Salary Calculation</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <StaffList />
        </TabsContent>

        <TabsContent value="salary">
          <SalaryCalculation />
        </TabsContent>
      </Tabs>
    </div>
  );
}
