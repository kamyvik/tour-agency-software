import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- Customers ---

app.get('/api/customers', async (req, res) => {
    try {
        const customers = await prisma.customer.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
});

app.post('/api/customers', async (req, res) => {
    try {
        const customer = await prisma.customer.create({
            data: req.body
        });
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create customer' });
    }
});

app.put('/api/customers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await prisma.customer.update({
            where: { id },
            data: req.body
        });
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update customer' });
    }
});

// --- Bookings ---

app.get('/api/bookings', async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany({
            orderBy: { createdAt: 'desc' },
            include: { customer: true } // optional join
        });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
});

app.post('/api/bookings', async (req, res) => {
    try {
        const booking = await prisma.booking.create({
            data: req.body
        });
        res.json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create booking' });
    }
});

app.put('/api/bookings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await prisma.booking.update({
            where: { id },
            data: req.body
        });
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update booking' });
    }
});

// --- Vehicles ---

app.get('/api/vehicles', async (req, res) => {
    try {
        const vehicles = await prisma.vehicle.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch vehicles' });
    }
});

app.post('/api/vehicles', async (req, res) => {
    try {
        const vehicle = await prisma.vehicle.create({
            data: req.body
        });
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create vehicle' });
    }
});

app.put('/api/vehicles/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const vehicle = await prisma.vehicle.update({
            where: { id },
            data: req.body
        });
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update vehicle' });
    }
});

// --- Metrics ---

app.get('/api/metrics', async (req, res) => {
    try {
        const totalBookings = await prisma.booking.count();

        const bookings = await prisma.booking.findMany();
        const pendingPayments = bookings.reduce((sum, b) => sum + b.balanceAmount, 0);
        const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);

        // Simple profit calc (mock 20%)
        const profit = totalRevenue * 0.2;

        const today = new Date().toISOString().split('T')[0];
        // This is a string comparison for '2024-01-01' style dates in this demo
        // Ideally use real Date objects in DB
        const totalBookingsToday = bookings.filter(b => b.startDate === today).length;

        res.json({
            totalBookingsToday,
            pendingPayments,
            totalToursMonth: totalBookings, // simplifying for demo
            profit
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch metrics' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
