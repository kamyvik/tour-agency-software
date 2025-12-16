@echo off
setlocal
title Tour Agency Software - Auto Runner

echo ===================================================
echo   Tour Agency Software - One-Click Setup
echo ===================================================

:: 1. Check Node.js
echo.
echo [1/6] Checking System Requirements...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed.
    echo Please install it from https://nodejs.org/
    pause
    exit /b
)
echo [OK] Node.js is installed.

:: 2. Check Docker and Start DB
echo.
echo [2/6] Checking Database Configuration...
docker -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Docker is not installed or not in PATH.
    echo Assuming you have a local PostgreSQL server running manually.
    goto :SkipDocker
)

:CheckDockerRunning
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [ACTION REQUIRED] Docker is installed but NOT RUNNING.
    echo Please open 'Docker Desktop' from your Start Menu now.
    echo.
    echo Press any key once Docker is running to continue...
    pause >nul
    goto :CheckDockerRunning
)

echo [OK] Docker is running.
echo Starting Database Container...

:: Create/Start Container
docker run --name tour-agency-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=tour_agency_db -p 5432:5432 -d postgres >nul 2>&1
if %errorlevel% neq 0 (
    docker start tour-agency-postgres >nul 2>&1
)

echo Waiting for Database to initialize...
timeout /t 5 /nobreak >nul

:SkipDocker

:: 3. Backend Setup
echo.
echo [3/6] Installing Backend Dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Backend install failed.
    pause
    exit /b
)

:: 4. Database Schema Sync
echo.
echo [4/6] Syncing Database Schema...
call npx prisma db push
if %errorlevel% neq 0 (
    echo [ERROR] Database sync failed! 
    echo Please ensure PostgreSQL is running on port 5432.
    pause
    exit /b
)

:: 5. Start Backend
echo.
echo [5/6] Starting Backend Server...
start "Tour Agency Backend" npm run dev

:: 6. Frontend Setup & Run
echo.
echo [6/6] Starting Frontend Application...
cd ..
call npm install
npm run dev

pause
