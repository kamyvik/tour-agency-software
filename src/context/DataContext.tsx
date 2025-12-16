import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner@2.0.3';

// --- Types ---
export interface Customer {
    id: string;
    name: string;
    mobile: string;
    email?: string;
    tourType: string;
    travelDate: string;
    status: string; // 'Pending' | 'Converted' | 'Follow-up'
    assignedStaff: string;
    destination: string;
    travellers: string;
    requirements?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Booking {
    id: string;
    customerId: string;
    customerName: string;
    tourType: string;
    destination: string;
    startDate: string;
    status: string; // 'Confirmed' | 'Completed' | 'Cancelled'
    totalAmount: number;
    paidAmount: number;
    balanceAmount: number;
    details?: any;
    createdAt?: string;
    updatedAt?: string;
}

export interface Vehicle {
    id: string;
    vehicleNumber: string;
    type: string;
    status: string; // 'Available' | 'Booked' | 'Under Maintenance'
    driver: string;
    lastService: string;
    createdAt?: string;
    updatedAt?: string;
}

interface DataContextType {
    customers: Customer[];
    addCustomer: (customer: Customer) => Promise<void>;
    updateCustomer: (id: string, updates: Partial<Customer>) => Promise<void>;

    bookings: Booking[];
    addBooking: (booking: Booking) => Promise<void>;
    updateBooking: (id: string, updates: Partial<Booking>) => Promise<void>;

    vehicles: Vehicle[];
    addVehicle: (vehicle: Vehicle) => Promise<void>;
    updateVehicle: (id: string, updates: Partial<Vehicle>) => Promise<void>;

    isLoading: boolean;
    refreshData: () => Promise<void>;

    // Helpers
    getMetrics: () => {
        totalBookingsToday: number;
        pendingPayments: number;
        totalToursMonth: number;
        profit: number;
    };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const API_BASE_URL = 'http://localhost:3000/api';

// --- Provider ---
export function DataProvider({ children }: { children: ReactNode }) {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [custRes, bookRes, vehRes] = await Promise.all([
                fetch(`${API_BASE_URL}/customers`),
                fetch(`${API_BASE_URL}/bookings`),
                fetch(`${API_BASE_URL}/vehicles`)
            ]);

            if (custRes.ok) setCustomers(await custRes.json());
            if (bookRes.ok) setBookings(await bookRes.json());
            if (vehRes.ok) setVehicles(await vehRes.json());
        } catch (error) {
            console.error("Failed to fetch data:", error);
            // toast.error("Could not connect to backend server. Ensure it is running.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addCustomer = async (customer: Customer) => {
        try {
            // Remove ID if empty to let DB generate it, or handle in backend
            const { id, ...data } = customer;
            const res = await fetch(`${API_BASE_URL}/customers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                const newCustomer = await res.json();
                setCustomers((prev) => [newCustomer, ...prev]);
            } else {
                throw new Error('Failed to add customer');
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to save customer");
        }
    };

    const updateCustomer = async (id: string, updates: Partial<Customer>) => {
        try {
            const res = await fetch(`${API_BASE_URL}/customers/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });
            if (res.ok) {
                const updated = await res.json();
                setCustomers((prev) => prev.map((c) => c.id === id ? updated : c));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const addBooking = async (booking: Booking) => {
        try {
            const { id, ...data } = booking;
            const res = await fetch(`${API_BASE_URL}/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                const newBooking = await res.json();
                setBookings((prev) => [newBooking, ...prev]);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to save booking");
        }
    };

    const updateBooking = async (id: string, updates: Partial<Booking>) => {
        try {
            const res = await fetch(`${API_BASE_URL}/bookings/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });
            if (res.ok) {
                const updated = await res.json();
                setBookings((prev) => prev.map((b) => b.id === id ? updated : b));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const addVehicle = async (vehicle: Vehicle) => {
        try {
            const { id, ...data } = vehicle;
            const res = await fetch(`${API_BASE_URL}/vehicles`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                const newVehicle = await res.json();
                setVehicles((prev) => [newVehicle, ...prev]);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to add vehicle");
        }
    };

    const updateVehicle = async (id: string, updates: Partial<Vehicle>) => {
        try {
            const res = await fetch(`${API_BASE_URL}/vehicles/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });
            if (res.ok) {
                const updated = await res.json();
                setVehicles((prev) => prev.map((v) => v.id === id ? updated : v));
            } else {
                throw new Error(`Failed to update vehicle: ${res.statusText}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update vehicle details.");
        }
    };

    const getMetrics = () => {
        const pendingPayments = bookings.reduce((sum: number, b: Booking) => sum + (b.balanceAmount || 0), 0);
        // Ensure b.startDate exists before calling split
        const today = new Date().toISOString().split('T')[0];
        const totalBookingsToday = bookings.filter((b: Booking) => b.startDate && b.startDate.includes(today)).length;
        const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

        return {
            totalBookingsToday,
            pendingPayments,
            totalToursMonth: bookings.length,
            profit: totalRevenue * 0.20
        };
    };

    return (
        <DataContext.Provider value={{
            customers,
            addCustomer,
            updateCustomer,
            bookings,
            addBooking,
            updateBooking,
            vehicles,
            addVehicle,
            updateVehicle,
            getMetrics,
            isLoading,
            refreshData: fetchData
        }}>
            {children}
            {isLoading && (
                <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-[9999]">
                    <div className="bg-white p-4 rounded-lg shadow-lg">Loading data...</div>
                </div>
            )}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}
