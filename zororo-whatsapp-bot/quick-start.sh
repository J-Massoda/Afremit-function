#!/bin/bash
# ==============================================================================
# QUICK START SCRIPT - Zororo Phumulani WhatsApp Bot
# ==============================================================================
# Run this script to quickly set up and start the bot
# ==============================================================================

echo "🤖 Zororo Phumulani WhatsApp Bot - Quick Start"
echo "=============================================="
echo ""

# Step 1: Check if Node.js is installed
echo "1️⃣  Checking Node.js installation..."
if ! command -v node &> /dev/null
then
    echo "❌ Node.js not found. Please install Node.js first:"
    echo "   https://nodejs.org/"
    exit 1
fi
echo "✅ Node.js found: $(node --version)"
echo ""

# Step 2: Install dependencies
echo "2️⃣  Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Step 3: Check for .env file
echo "3️⃣  Checking environment variables..."
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp .env.example .env
    echo "📝 Please edit .env file and add your Meta credentials:"
    echo "   - ACCESS_TOKEN (from Meta Dashboard)"
    echo "   - PHONE_NUMBER_ID (from Meta Dashboard)"
    echo "   - VERIFY_TOKEN (create your own secret)"
    echo ""
    echo "After editing .env, run: npm run dev"
    exit 0
fi
echo "✅ .env file found"
echo ""

# Step 4: Verify credentials
echo "4️⃣  Verifying credentials..."
if grep -q "PASTE_META_ACCESS_TOKEN_HERE" .env; then
    echo "⚠️  Please update ACCESS_TOKEN in .env file"
    exit 0
fi
echo "✅ Credentials configured"
echo ""

# Step 5: Start server
echo "5️⃣  Starting server..."
echo "🚀 Server will start on http://localhost:3000"
echo ""
echo "Next steps:"
echo "1. Open new terminal and run: ngrok http 3000"
echo "2. Copy ngrok HTTPS URL"
echo "3. Go to Meta Dashboard → WhatsApp → Webhooks"
echo "4. Paste: https://xxxx.ngrok.io/webhook"
echo ""
echo "Starting server in 3 seconds..."
sleep 3

npm run dev
