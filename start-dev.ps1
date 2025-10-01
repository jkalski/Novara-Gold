# PowerShell script to start Next.js dev server with cache clearing
Write-Host "Cleaning Next.js cache..." -ForegroundColor Yellow

# Remove .next directory if it exists
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "✓ Removed .next directory" -ForegroundColor Green
}

# Remove node_modules cache if it exists
if (Test-Path "node_modules\.cache") {
    Remove-Item -Recurse -Force "node_modules\.cache"
    Write-Host "✓ Removed node_modules cache" -ForegroundColor Green
}

Write-Host "Starting development server..." -ForegroundColor Yellow
npm run dev
