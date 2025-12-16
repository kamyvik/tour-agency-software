import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Car, 
  DollarSign, 
  UserCog, 
  FileText, 
  User,
  LogOut
} from 'lucide-react';
import { PageType } from '../App';
import logo from 'figma:asset/429ba3818fc8d1f96e3341c087917144f9434b88.png';
import { Button } from './ui/button';

interface SidebarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as PageType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'customer-list' as PageType, label: 'Enquiries', icon: Users },
    { id: 'tour-booking' as PageType, label: 'Bookings', icon: Calendar },
    { id: 'vehicles' as PageType, label: 'Vehicles', icon: Car },
    { id: 'finance' as PageType, label: 'Finance', icon: DollarSign },
    { id: 'staff' as PageType, label: 'Staff', icon: UserCog },
    { id: 'reports' as PageType, label: 'Reports', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Global Tours" className="h-10 w-10" />
          <div>
            <div className="text-[#8B1538]">Global Tours</div>
            <div className="text-xs text-gray-600">Management System</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[#8B1538] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => onNavigate('profile')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
            currentPage === 'profile'
              ? 'bg-[#8B1538] text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </button>
        <Button
          variant="outline"
          className="w-full justify-start text-gray-700 hover:text-red-600"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
