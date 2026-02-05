# host-local.ps1
# This script starts both the backend and frontend servers for ThriftX

Write-Host "Starting ThriftX Local Environment..." -ForegroundColor Cyan

# Check for .env file
if (-not (Test-Path ".env")) {
    Write-Host "Warning: .env file not found in root. Please create it based on .env.template" -ForegroundColor Yellow
}

# Start Backend
Write-Host "Starting Backend on port 5000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm install; npm run dev"

# Start Frontend
Write-Host "Starting Frontend (Vite)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm install; npm run dev"

Write-Host "Servers are starting in separate windows." -ForegroundColor Cyan
Write-Host "Backend: http://localhost:5000"
Write-Host "Frontend: http://localhost:5173"
