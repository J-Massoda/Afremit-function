/**
 * 🧪 TEST WEBHOOK LOCALLY
 * 
 * This script simulates a WhatsApp webhook payload to test your bot locally.
 * Run this to verify your message processing works before deploying.
 * 
 * Usage:
 *   node test-webhook.js
 */

const axios = require('axios');

// Your webhook URL (change if testing deployed version) - can be overridden with env WEBHOOK_URL
const WEBHOOK_URL = process.env.WEBHOOK_URL || 'http://localhost:3000/webhook';
// Example: WEBHOOK_URL=http://localhost:4000/webhook node test-webhook.js

// Sample WhatsApp webhook payload (matches Meta's structure exactly)
const samplePayload = {
  object: 'whatsapp_business_account',
  entry: [
    {
      id: '123456789',
      changes: [
        {
          value: {
            messaging_product: 'whatsapp',
            metadata: {
              display_phone_number: '15550100',
              phone_number_id: '123456789'
            },
            contacts: [
              {
                profile: {
                  name: 'Test User'
                },
                wa_id: '263771234567'
              }
            ],
            messages: [
              {
                from: '263771234567',
                id: 'wamid.test123',
                timestamp: Math.floor(Date.now() / 1000).toString(),
                text: {
                  body: 'Hi'
                },
                type: 'text'
              }
            ]
          },
          field: 'messages'
        }
      ]
    }
  ]
};

// Test scenarios
const testMessages = [
  'Hi',
  '1',
  'SUBSCRIBE',
  'John Doe',
  '63-1234567-A-12',
  'info',
  'help',
  'invalid command'
];

async function testWebhook(message) {
  console.log('\n🧪 ========================================');
  console.log(`   TESTING MESSAGE: "${message}"`);
  console.log('========================================\n');
  
  // Update payload with test message
  const payload = JSON.parse(JSON.stringify(samplePayload)); // Deep copy
  payload.entry[0].changes[0].value.messages[0].text.body = message;
  payload.entry[0].changes[0].value.messages[0].timestamp = Math.floor(Date.now() / 1000).toString();
  
  try {
    const response = await axios.post(WEBHOOK_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'WhatsApp/Test'
      },
      timeout: 10000 // 10 second timeout
    });
    
    console.log('✅ Webhook Response:');
    console.log('   Status:', response.status);
    console.log('   Data:', response.data);
    console.log('');
    
    // Wait a bit for processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
  } catch (error) {
    console.log('❌ Webhook Error:');
    if (error.response) {
      console.log('   Status:', error.response.status);
      console.log('   Data:', error.response.data);
    } else if (error.request) {
      console.log('   No response received');
      console.log('   Error:', error.message);
      console.log('');
      console.log('⚠️  Is your server running?');
      console.log('   Start with: npm run dev');
    } else {
      console.log('   Error:', error.message);
    }
    console.log('');
  }
}

async function runTests() {
  console.log('🚀 ========================================');
  console.log('   WEBHOOK TEST SCRIPT');
  console.log('========================================');
  console.log('');
  console.log('📡 Testing webhook at:', WEBHOOK_URL);
  console.log('');
  console.log('⚠️  IMPORTANT:');
  console.log('   1. Make sure your server is running (npm run dev)');
  console.log('   2. Make sure .env file has ACCESS_TOKEN and PHONE_NUMBER_ID');
  console.log('   3. Check console logs in your server terminal');
  console.log('');
  console.log('Starting tests in 3 seconds...');
  console.log('');
  
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Test each message
  for (const message of testMessages) {
    await testWebhook(message);
  }
  
  console.log('========================================');
  console.log('✅ ALL TESTS COMPLETE');
  console.log('========================================');
  console.log('');
  console.log('Check your server logs to see:');
  console.log('  - "📨 INCOMING WEBHOOK REQUEST"');
  console.log('  - "📱 NEW MESSAGE"');
  console.log('  - "🤖 Processing message"');
  console.log('  - "📤 Sending reply"');
  console.log('  - "✅ Reply sent successfully"');
  console.log('');
  console.log('If you don\'t see these, check:');
  console.log('  - Is server running?');
  console.log('  - Is WEBHOOK_URL correct?');
  console.log('  - Are environment variables set?');
  console.log('');
}

// Run tests
runTests().catch(error => {
  console.error('❌ Test script failed:', error.message);
  process.exit(1);
});
