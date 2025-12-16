---
description: How to test the Tour Agency Software global state integration
---

# Testing Global State Integration

The application has been updated to use a global `DataContext`. Here is how you can verify the integration:

1.  **Start the Application**:
    Run `npm run dev` to start the development server.

2.  **Test Customer Management**:
    -   Navigate to **Customer List**.
    -   Click **Add Customer**. Fill in the details and save.
    -   Verify that the new customer appears in the **Customer List**.
    -   Edit an existing customer and verify the changes persist.

3.  **Test Booking Creation**:
    -   Create a **New Booking** (Local, Domestic, or International).
    -   Fill in the form and submit.
    -   Navigate to **Finance** -> **Inward Payment**.
    -   Verify that the new booking appears in the "Recent Payments" list and the "Total Revenue" includes the new amount.

4.  **Test Reports**:
    -   Navigate to **Reports**.
    -   Verify that "Total Created Bookings" and "Revenue" match the data you created.

5.  **Test Vehicle Management**:
    -   Navigate to **Vehicle Management**.
    -   Assign a vehicle to a booking.
    -   Verify the vehicle status updates to "Booked".
