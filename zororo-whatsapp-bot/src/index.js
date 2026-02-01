/**
 * ==============================================================================
 * ZORORO PHUMULANI INSURANCE - WHATSAPP BOT
 * ==============================================================================
 * 
 * Main Express server for handling WhatsApp Business Cloud API webhooks
 * 
 * This bot automates:
 * - Plan inquiries (Funeral & Repatriation, Worldwide Funeral, Accidental Death)
 * - Customer onboarding flow
 * - Payment link distribution
 * 
 * ==============================================================================
 */

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { handleIncomingMessage } = require('./conversation');
const { sendMessage } = require('./whatsapp');

const app = express();
const PORT = process.env.PORT || 3000;

// ==============================================================================
// MIDDLEWARE
// ==============================================================================
app.use(bodyParser.json()); // Parse JSON payloads from Meta
app.use(bodyParser.urlencoded({ extended: true }));

// ==============================================================================
// WEBHOOK VERIFICATION ENDPOINT (GET /webhook)
// ==============================================================================
/**
 * ✅ Meta uses this endpoint to verify webhook ownership
 * 
 * When you configure webhooks in Meta Dashboard:
 * 1. Meta sends a GET request with query params: hub.mode, hub.verify_token, hub.challenge
 * 2. Your server must validate the verify_token matches your .env
 * 3. If valid, respond with the hub.challenge value
 * 
 * Setup: WhatsApp → Configuration → Webhooks
 * - Callback URL: https://your-domain.com/webhook (or ngrok URL)
 * - Verify Token: Must match VERIFY_TOKEN in .env
 */
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  console.log('📞 Webhook verification request received');
  console.log('Mode:', mode);
  console.log('Token:', token);

  // Check if verification token matches
  if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
    console.log('✅ Webhook verified successfully!');
    res.status(200).send(challenge); // Meta expects the challenge back
  } else {
    console.error('❌ Webhook verification failed - token mismatch');
    res.status(403).send('Forbidden');
  }
});

// ==============================================================================
// INCOMING MESSAGES ENDPOINT (POST /webhook)
// ==============================================================================
/**
 * ✅ This is where WhatsApp sends incoming messages after webhook setup
 * 
 * Flow:
 * 1. User sends WhatsApp message → Meta Cloud API receives it
 * 2. Meta sends POST request to this endpoint with message data
 * 3. We extract sender phone number and message text
 * 4. Pass to conversation handler for intelligent response
 * 5. Send reply back via WhatsApp API
 * 
 * Message Structure from Meta:
 * {
 *   "object": "whatsapp_business_account",
 *   "entry": [{
 *     "changes": [{
 *       "value": {
 *         "messages": [{
 *           "from": "263771234567",  ← Sender's phone (country code included)
 *           "text": { "body": "Hi" }  ← Message text
 *         }]
 *       }
 *     }]
 *   }]
 * }
 */
app.post('/webhook', async (req, res) => {
  console.log('📨 Incoming webhook data:');
  console.log(JSON.stringify(req.body, null, 2)); // Log full payload for debugging

  try {
    // Quick acknowledgment to Meta (must respond within 20 seconds)
    res.status(200).send('EVENT_RECEIVED');

    // Extract message data from Meta's nested structure
    const entry = req.body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const messages = value?.messages;

    // Check if this webhook contains a message
    if (!messages || messages.length === 0) {
      console.log('⚠️  Webhook received but no messages found (might be status update)');
      return;
    }

    const message = messages[0];
    const from = message.from; // Sender's WhatsApp number (e.g., "263771234567")
    const messageBody = message.text?.body; // Message text
    const messageId = message.id; // Unique message ID

    console.log(`\n📱 New message from: ${from}`);
    console.log(`💬 Message: "${messageBody}"`);
    console.log(`🆔 Message ID: ${messageId}\n`);

    // Ignore empty messages
    if (!messageBody) {
      console.log('⚠️  Empty message body - skipping');
      return;
    }

    // Process message through conversation handler
    const reply = await handleIncomingMessage(from, messageBody);

    // Send response back to user
    if (reply) {
      await sendMessage(from, reply);
      console.log(`✅ Reply sent to ${from}\n`);
    }

  } catch (error) {
    console.error('❌ Error processing webhook:', error.message);
    console.error('Stack trace:', error.stack);
  }
});

// ==============================================================================
// HEALTH CHECK ENDPOINT
// ==============================================================================
/**
 * Simple endpoint to verify server is running
 * Visit: http://localhost:3000/health
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Zororo Phumulani WhatsApp Bot',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ==============================================================================
// ROOT ENDPOINT
// ==============================================================================
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Zororo Phumulani WhatsApp Bot</title></head>
      <body style="font-family: Arial; padding: 40px; max-width: 800px; margin: 0 auto;">
        <h1>🤖 Zororo Phumulani Insurance Bot</h1>
        <p>WhatsApp Business Cloud API integration is active.</p>
        <h2>Setup Checklist:</h2>
        <ul>
          <li>✅ Server is running on port ${PORT}</li>
          <li>⚙️ Configure webhook: <code>GET /webhook</code></li>
          <li>📨 Receive messages: <code>POST /webhook</code></li>
          <li>🔍 Health check: <code>GET /health</code></li>
        </ul>
        <h3>Next Steps:</h3>
        <ol>
          <li>Expose this server using <strong>ngrok</strong>: <code>ngrok http ${PORT}</code></li>
          <li>Copy ngrok HTTPS URL (e.g., https://xxxx.ngrok.io)</li>
          <li>Go to Meta Dashboard → WhatsApp → Configuration → Webhooks</li>
          <li>Paste: <code>https://xxxx.ngrok.io/webhook</code></li>
          <li>Verify Token: Use value from .env VERIFY_TOKEN</li>
          <li>Subscribe to: <strong>messages</strong></li>
        </ol>
        <p><a href="/health">Check Health Status</a></p>
      </body>
    </html>
  `);
});

// ==============================================================================
// START SERVER
// ==============================================================================
app.listen(PORT, () => {
  console.log('\n🚀 ============================================');
  console.log('   ZORORO PHUMULANI WHATSAPP BOT STARTED');
  console.log('============================================');
  console.log(`📡 Server running on: http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('\n📋 Next Steps for Testing:');
  console.log('1. Run: npx ngrok http 3000');
  console.log('2. Copy ngrok HTTPS URL');
  console.log('3. Paste in Meta Dashboard → Webhooks → Callback URL');
  console.log('4. Add "/webhook" to the end of URL');
  console.log('5. Verify webhook using VERIFY_TOKEN from .env');
  console.log('6. Send test message from WhatsApp!');
  console.log('\n💡 Visit http://localhost:3000 for setup guide');
  console.log('============================================\n');
});

// ==============================================================================
// PRODUCTION DEPLOYMENT NOTES
// ==============================================================================
/**
 * TODO: Before deploying to production (Render, AWS, Vercel, etc.)
 * 
 * 1. Replace temporary Meta access token with System User Token:
 *    - Go to Meta Business Settings → System Users
 *    - Create new system user → Generate token
 *    - Select app → Grant WhatsApp permissions
 * 
 * 2. Add database for user state persistence:
 *    - MongoDB for user sessions (who's in onboarding step 1, 2, etc.)
 *    - Store: user phone, current step, collected data (name, ID)
 * 
 * 3. Add Redis for caching (optional but recommended):
 *    - Cache user conversation state
 *    - Improve response time
 * 
 * 4. Integrate payment gateway:
 *    - EcoCash API
 *    - Paynow Zimbabwe
 *    - Card processing (Stripe/Paystack)
 * 
 * 5. Add logging service:
 *    - Winston for file logging
 *    - Sentry for error tracking
 * 
 * 6. Environment variables for production:
 *    - Set NODE_ENV=production
 *    - Use strong VERIFY_TOKEN
 *    - Add DATABASE_URL
 *    - Add PAYMENT_API_KEY
 */
