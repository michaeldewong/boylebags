# PowerShell script to fix Next.js dev server lock/port issues on Windows
# Run this if you see "Unable to acquire lock" or "EADDRINUSE" errors

Write-Host "Checking for processes on port 3001..." -ForegroundColor Yellow

# Kill any process using port 3001
$processes = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($processes) {
    foreach ($pid in $processes) {
        Write-Host "Killing process $pid on port 3001..." -ForegroundColor Red
        Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
    }
}

# Remove Next.js lock file
$lockFile = ".next\dev\lock"
if (Test-Path $lockFile) {
    Write-Host "Removing lock file..." -ForegroundColor Yellow
    Remove-Item $lockFile -Force -ErrorAction SilentlyContinue
}

# Remove .next directory if needed (uncomment if issues persist)
# Write-Host "Removing .next directory..." -ForegroundColor Yellow
# Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

Write-Host "Done! You can now run: npm run dev" -ForegroundColor Green
