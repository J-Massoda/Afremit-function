# 🚀 Installation & Setup Guide

Complete step-by-step guide to get the Zororo Phumulani WhatsApp Bot running.

---

## ⚡ Quick Start (3 commands)

```bash
cd zororo-whatsapp-bot
npm install
npm run dev
```

Then follow the webhook setup instructions below.

---

## 📝 Detailed Setup

### 1. Install Node.js Dependencies

Navigate to project directory:
```bash
cd zororo-whatsapp-bot
```

Install all packages:
```bash
npm install
```

This installs:
- ✅ express (v4.18.2)
- ✅ axios (v1.6.2)
- ✅ body-parser (v1.20.2)
- ✅ dotenv (v16.3.1)
- ✅ nodemon (v3.0.2) [dev only]

Verify installation:
```bash
npm list
```

---

### 2. Configure Environment Variables

#### Option A: Use Quick Start Script (Recommended)

**Windows (PowerShell):**
```powershell
.\quick-start.ps1
```

**Mac/Linux:**
```bash
chmod +x quick-start.sh
./quick-start.sh
```

#### Option B: Manual Setup

Create `.env` file from template:
```bash
cp .env.example .env
```

**Edit `.env` file with your Meta credentials:**

```env
# Get from: Meta Dashboard → WhatsApp → Getting Started
ACCESS_TOKEN=EAAxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Get from: Meta Dashboard → WhatsApp → Getting Started → Phone Number ID
PHONE_NUMBER_ID=123456789012345

# Create your own secret (any random string)
VERIFY_TOKEN=my_super_secret_verify_token_12345

PORT=3000
NODE_ENV=development
```

**Where to find these values:**

1. **ACCESS_TOKEN:**
   - Go to: https://developers.facebook.com/apps
   - Select your app
   - Click **WhatsApp** in left sidebar
   - Click **Getting Started**
   - Find "Temporary access token" (valid 24 hours)
   - Click **Copy**

2. **PHONE_NUMBER_ID:**
   - Same page as above
   - Find "Phone number ID" (below the access token)
   - This is NOT your phone number - it's a unique ID from Meta
   - Click **Copy**

3. **VERIFY_TOKEN:**
   - YOU create this
   - Can be any string (e.g., `zororo_secret_123`)
   - Must be same in `.env` and Meta Dashboard

---

### 3. Start the Server

**Development mode (auto-restart on changes):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

You should see:
```
🚀 ============================================
   ZORORO PHUMULANI WHATSAPP BOT STARTED
============================================
📡 Server running on: http://localhost:3000
```

✅ Server is running! But it's only accessible locally...

---

### 4. Expose Server with ngrok

WhatsApp needs a public HTTPS URL to send messages to your server.

**Open a NEW terminal window** (keep server running in first terminal)

**Install ngrok:**

Windows (PowerShell as Administrator):
```powershell
choco install ngrok
```

Mac:
```bash
brew install ngrok
```

Linux:
```bash
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz
tar xvzf ngrok-v3-stable-linux-amd64.tgz
sudo mv ngrok /usr/local/bin
```

Or download from: https://ngrok.com/download

**Run ngrok:**
```bash
ngrok http 3000
```

Output:
```
Session Status   online
Forwarding       https://a1b2-xx-xxx-xxx-xx.ngrok-free.app -> http://localhost:3000
```

✅ **Copy the HTTPS URL** (not HTTP!)

Example: `https://a1b2-xx-xxx-xxx-xx.ngrok-free.app`

⚠️ **Important notes:**
- Free ngrok URLs change every time you restart
- Keep ngrok terminal open while testing
- For production, deploy to Render/AWS (see README.md)

---

### 5. Configure Meta Webhook

Now connect Meta to your server:

1. **Go to Meta Dashboard:**
   - https://developers.facebook.com/apps
   - Select your app
   - Click **WhatsApp** → **Configuration**

2. **Find Webhooks section:**
   - Click **Edit** button

3. **Callback URL:**
   - Paste your ngrok URL
   - Add `/webhook` at the end
   - Example: `https://a1b2-xx-xxx-xxx-xx.ngrok-free.app/webhook`
   - ⚠️ Must be HTTPS!

4. **Verify Token:**
   - Paste the `VERIFY_TOKEN` from your `.env` file
   - Must match exactly!

5. **Click "Verify and Save"**
   - Meta will send GET request to your server
   - Your server responds with challenge
   - You should see: ✅ "Webhook verified"

6. **Subscribe to Webhooks:**
   - Check the box: ☑️ **messages**
   - Click **Save**

✅ Webhook is now connected!

---

### 6. Test the Bot

**Send a WhatsApp message:**

1. In Meta Dashboard → **WhatsApp** → **Getting Started**

2. Find "Send and receive messages" section

3. You'll see a test phone number (e.g., `+1 555-0100`)

4. **Open WhatsApp on your phone**

5. **Send message to test number:**
   ```
   Hi
   ```

6. **Check your terminal** - you should see:
   ```
   📨 Incoming webhook data: {...}
   📱 New message from: 263771234567
   💬 Message: "Hi"
   🤖 Processing message...
   📤 Sending message...
   ✅ Message sent successfully
   ```

7. **Check your WhatsApp** - you should receive:
   ```
   Welcome to *Zororo Phumulani Insurance*! 🛡️
   
   Your trusted partner for peace of mind.
   
   *Choose a plan to learn more:*
   
   1️⃣ Funeral & Repatriation Cover
      💰 From $10/month
   ...
   ```

🎉 **It works!** You can now interact with the bot.

---

### 7. Test the Full Flow

**Try these commands:**

1. **View plans:**
   ```
   1
   ```
   (Shows Funeral & Repatriation details)

2. **Subscribe:**
   ```
   SUBSCRIBE
   ```
   (Starts onboarding flow)

3. **Provide name:**
   ```
   John Doe
   ```

4. **Provide ID:**
   ```
   63-1234567-A-12
   ```

5. **Confirm payment:**
   ```
   PAID ECO123456789
   ```

✅ You'll receive policy confirmation!

---

## 🔧 Troubleshooting

### Issue: "npm: command not found"

**Solution:** Install Node.js
- Windows: Download from https://nodejs.org/
- Mac: `brew install node`
- Linux: `sudo apt install nodejs npm`

### Issue: "Cannot find module 'express'"

**Solution:** Install dependencies
```bash
npm install
```

### Issue: "Webhook verification failed"

**Checklist:**
- ✅ Server is running (`npm run dev`)
- ✅ ngrok is running (`ngrok http 3000`)
- ✅ Using HTTPS ngrok URL (not HTTP)
- ✅ Added `/webhook` to end of URL
- ✅ VERIFY_TOKEN matches in .env and Meta Dashboard

**Debug:**
```bash
# Test webhook manually
curl "http://localhost:3000/webhook?hub.mode=subscribe&hub.verify_token=YOUR_TOKEN&hub.challenge=test123"
# Should return: test123
```

### Issue: "Not receiving messages"

**Checklist:**
- ✅ Webhook verified successfully
- ✅ Subscribed to "messages" webhook
- ✅ ACCESS_TOKEN is valid (not expired)
- ✅ Sending message to correct test number
- ✅ ngrok session not expired

**Check server logs:**
```bash
npm run dev
# Watch for: 📨 Incoming webhook data
```

### Issue: "Cannot send messages"

**Check:**
- ✅ ACCESS_TOKEN is correct and not expired
- ✅ PHONE_NUMBER_ID is correct
- ✅ Recipient opted-in (first 24 hours only)

**Test API directly:**
```bash
curl -X POST \
  'https://graph.facebook.com/v19.0/YOUR_PHONE_NUMBER_ID/messages' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "messaging_product": "whatsapp",
    "to": "YOUR_PHONE",
    "type": "text",
    "text": { "body": "Test" }
  }'
```

---

## 📊 Verify Everything is Working

### Health Check Endpoint

Visit in browser:
```
http://localhost:3000/health
```

Should return:
```json
{
  "status": "ok",
  "service": "Zororo Phumulani WhatsApp Bot",
  "timestamp": "2026-02-01T10:30:00.000Z",
  "environment": "development"
}
```

### Server Dashboard

Visit:
```
http://localhost:3000
```

Shows setup checklist and status.

---

## 🎯 Next Steps

✅ Bot is working locally!

**For Production:**
1. Deploy to Render/AWS/Vercel (see README.md)
2. Get permanent System User Token
3. Add database (MongoDB)
4. Integrate payment gateway (EcoCash)
5. Add monitoring (Sentry)

**For Development:**
1. Customize conversation flow in `src/conversation.js`
2. Add more insurance plans
3. Improve onboarding questions
4. Add rich content (images, PDFs)

---

## 📞 Need Help?

- **Check logs:** Terminal shows detailed error messages
- **Test endpoints:** Use curl or Postman
- **Read README.md:** Comprehensive documentation
- **Contact support:** dev@afremit.com

---

**🎉 Congratulations! Your WhatsApp bot is ready!**
