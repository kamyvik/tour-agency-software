# Tour Agency Software - Full Setup

This project now includes a Node.js/PostgreSQL backend and a React frontend.

## 🚀 Quick Start
Double-click the `start_app.bat` file in this directory.

It will automatically:
1.  Check for Node.js.
2.  Install backend dependencies.
3.  Sync the database (Prisma to PostgreSQL).
4.  Start the Backend Server (Port 3000).
5.  Install frontend dependencies.
6.  Start the Frontend (Port 5173).

## ⚠️ Requirements
1.  **Node.js**: Must be installed.
2.  **PostgreSQL**: Must be running on `localhost:5432`.
    -   Default credentials used: `postgres` / `postgres`.
    -   To change this, edit `server/.env`.

## Manual Start
If the batch file fails, run these commands in two separate terminals:

**Terminal 1 (Backend):**
```bash
cd server
npm install
npx prisma db push
npm run dev
```

**Terminal 2 (Frontend):**
```bash
# (in root folder)
npm install
npm run dev
```
