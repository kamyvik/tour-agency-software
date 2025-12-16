---
description: How to setup and run the Node.js Backend with PostgreSQL
---

# Backend Setup & Run Instructions

The application now consists of a **Frontend (React)** and a **Backend (Node.js/Express + PostgreSQL)**. Follow these steps to get everything running.

## 1. Prerequisites
- **Node.js**: Ensure Node.js is installed.
- **PostgreSQL**: Ensure a PostgreSQL instance is running.

## 2. Backend Setup
1.  Open a terminal and navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install the required dependencies:
    ```bash
    npm install
    ```
3.  Configure your database connection:
    -   Open the file `server/.env`.
    -   Update the `DATABASE_URL` variable with your PostgreSQL connection string:
        ```
        DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/tour_agency_db?schema=public"
        ```
4.  Push the database schema (create tables):
    ```bash
    npx prisma db push
    ```
5.  Start the Backend Server:
    ```bash
    npm run dev
    ```
    *The server should now be running at `http://localhost:3000`.*

## 3. Frontend Setup
1.  Open a **new terminal** (keep the backend running).
2.  Navigate to the project root (if not already there).
3.  Start the Frontend:
    ```bash
    npm run dev
    ```

## 4. Verification
- Open your browser to the URL shown by the frontend (usually `http://localhost:5173`).
- Go to **Customer List** or **Finance**.
- If data loads (or shows empty lists without errors), the connection is successful!
- **Note**: The first time you run this, the lists will be empty as the database is new. Use the "Add Customer" or "Add Booking" forms to populate data.
