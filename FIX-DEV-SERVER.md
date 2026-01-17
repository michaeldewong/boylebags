# Fix Dev Server Lock/Port Issues

If you see these errors:
- "Unable to acquire lock at ...\.next\dev\lock"
- "EADDRINUSE / port 3001 already in use"
- "ERRCONNECTIONREFUSED"

## Quick Fix (PowerShell)

Run these commands in PowerShell from the project root:

```powershell
# Kill any process using port 3001
Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique | ForEach-Object { Stop-Process -Id $_ -Force }

# Remove Next.js lock file
Remove-Item .next\dev\lock -Force -ErrorAction SilentlyContinue

# Optional: Remove entire .next directory if issues persist
# Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# Now start dev server
npm run dev
```

## Alternative: Use the Script

```powershell
.\fix-dev-server.ps1
npm run dev
```

## Manual Steps

1. Close all terminal windows running `npm run dev`
2. Open Task Manager (Ctrl+Shift+Esc)
3. Find any Node.js processes and end them
4. Delete `.next` folder if it exists
5. Run `npm run dev` again
