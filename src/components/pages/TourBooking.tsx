import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { LocalTourBooking } from '../tours/LocalTourBooking';
import { DomesticTourBooking } from '../tours/DomesticTourBooking';
import { InternationalTourBooking } from '../tours/InternationalTourBooking';
import { BookingList } from '../tours/BookingList';
import { PageType } from '../../App';

interface TourBookingProps {
  onNavigate: (page: PageType) => void;
}

export function TourBooking({ onNavigate }: TourBookingProps) {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[#8B1538] mb-2">Tour Bookings</h1>
        <p className="text-gray-600">Manage local, domestic, and international tour bookings</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="list">All Bookings</TabsTrigger>
          <TabsTrigger value="local">Local Tour</TabsTrigger>
          <TabsTrigger value="domestic">Domestic Tour</TabsTrigger>
          <TabsTrigger value="international">International Tour</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <BookingList onNavigate={onNavigate} />
        </TabsContent>

        <TabsContent value="local">
          <LocalTourBooking onNavigate={onNavigate} />
        </TabsContent>

        <TabsContent value="domestic">
          <DomesticTourBooking onNavigate={onNavigate} />
        </TabsContent>

        <TabsContent value="international">
          <InternationalTourBooking onNavigate={onNavigate} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
