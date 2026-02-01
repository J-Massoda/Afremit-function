# ==============================================================================
# QUICK START SCRIPT - Zororo Phumulani WhatsApp Bot (Windows PowerShell)
# ==============================================================================
# Run this script to quickly set up and start the bot
# Usage: .\quick-start.ps1
# ==============================================================================

Write-Host "🤖 Zororo Phumulani WhatsApp Bot - Quick Start" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if Node.js is installed
Write-Host "1️⃣  Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js first:" -ForegroundColor Red
    Write-Host "   https://nodejs.org/" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 2: Install dependencies
Write-Host "2️⃣  Installing dependencies..." -ForegroundColor Yellow
npm install
Write-Host "✅ Dependencies installed" -ForegroundColor Green
Write-Host ""

# Step 3: Check for .env file
Write-Host "3️⃣  Checking environment variables..." -ForegroundColor Yellow
if (-not (Test-Path .env)) {
    Write-Host "⚠️  .env file not found. Creating from template..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "📝 Please edit .env file and add your Meta credentials:" -ForegroundColor Cyan
    Write-Host "   - ACCESS_TOKEN (from Meta Dashboard)" -ForegroundColor Cyan
    Write-Host "   - PHONE_NUMBER_ID (from Meta Dashboard)" -ForegroundColor Cyan
    Write-Host "   - VERIFY_TOKEN (create your own secret)" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "After editing .env, run: npm run dev" -ForegroundColor Yellow
    exit 0
}
Write-Host "✅ .env file found" -ForegroundColor Green
Write-Host ""

# Step 4: Verify credentials
Write-Host "4️⃣  Verifying credentials..." -ForegroundColor Yellow
$envContent = Get-Content .env -Raw
if ($envContent -match "PASTE_META_ACCESS_TOKEN_HERE") {
    Write-Host "⚠️  Please update ACCESS_TOKEN in .env file" -ForegroundColor Yellow
    exit 0
}
Write-Host "✅ Credentials configured" -ForegroundColor Green
Write-Host ""

# Step 5: Start server
Write-Host "5️⃣  Starting server..." -ForegroundColor Yellow
Write-Host "🚀 Server will start on http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Open new terminal and run: ngrok http 3000" -ForegroundColor White
Write-Host "2. Copy ngrok HTTPS URL" -ForegroundColor White
Write-Host "3. Go to Meta Dashboard → WhatsApp → Webhooks" -ForegroundColor White
Write-Host "4. Paste: https://xxxx.ngrok.io/webhook" -ForegroundColor White
Write-Host ""
Write-Host "Starting server in 3 seconds..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

npm run dev
