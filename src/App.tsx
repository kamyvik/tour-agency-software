import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/pages/Dashboard';
import { CustomerList } from './components/pages/CustomerList';
import { AddCustomer } from './components/pages/AddCustomer';
import { TourBooking } from './components/pages/TourBooking';
import { VehicleManagement } from './components/pages/VehicleManagement';
import { FinanceModule } from './components/pages/FinanceModule';
import { StaffManagement } from './components/pages/StaffManagement';
import { Reports } from './components/pages/Reports';
import { UserProfile } from './components/pages/UserProfile';
import { Toaster } from './components/ui/sonner';
import { DataProvider } from './context/DataContext';

export type PageType =
  | 'dashboard'
  | 'customer-list'
  | 'add-customer'
  | 'tour-booking'
  | 'vehicles'
  | 'finance'
  | 'staff'
  | 'reports'
  | 'profile';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'customer-list':
        return <CustomerList onNavigate={setCurrentPage} onSelectCustomer={setSelectedCustomerId} />;
      case 'add-customer':
        return <AddCustomer onNavigate={setCurrentPage} customerId={selectedCustomerId} />;
      case 'tour-booking':
        return <TourBooking onNavigate={setCurrentPage} />;
      case 'vehicles':
        return <VehicleManagement onNavigate={setCurrentPage} />;
      case 'finance':
        return <FinanceModule onNavigate={setCurrentPage} />;
      case 'staff':
        return <StaffManagement onNavigate={setCurrentPage} />;
      case 'reports':
        return <Reports onNavigate={setCurrentPage} />;
      case 'profile':
        return <UserProfile onNavigate={setCurrentPage} />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <DataProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className="flex-1 overflow-auto">
          {renderPage()}
        </main>
        <Toaster />
      </div>
    </DataProvider>
  );
}
