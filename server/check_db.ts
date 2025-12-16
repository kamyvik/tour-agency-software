import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const bookings = await prisma.booking.findMany();
        console.log("--- BOOKING DATA IN CLOUD DATABASE ---");
        if (bookings.length === 0) {
            console.log("No bookings found yet.");
        } else {
            console.log(`Found ${bookings.length} booking(s):`);
            bookings.forEach((b, i) => {
                console.log(`\nBooking #${i + 1}:`);
                console.log(`ID: ${b.id}`);
                console.log(`Customer: ${b.customerName}`);
                console.log(`Destination: ${b.destination}`);
                console.log(`Total Amount: ${b.totalAmount}`);
                console.log(`Status: ${b.status}`);
            });
        }
        console.log("--------------------------------------");
    } catch (error) {
        console.error("Error connecting to database:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
