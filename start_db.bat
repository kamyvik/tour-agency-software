@echo off
echo Starting PostgreSQL via Docker...
echo Pulling latest postgres image (if missing)...
docker pull postgres:latest

echo Creating/Starting Database Container...
docker run --name tour-agency-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=tour_agency_db -p 5432:5432 -d postgres

if %errorlevel% neq 0 (
    echo Container might already exist. Trying to start existing container...
    docker start tour-agency-postgres
)

echo.
echo Database container 'tour-agency-postgres' is running on port 5432.
echo Please run 'start_app.bat' again or restart the backend.
pause
