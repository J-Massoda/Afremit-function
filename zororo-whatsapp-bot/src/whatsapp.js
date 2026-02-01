/**
 * ==============================================================================
 * WHATSAPP BUSINESS CLOUD API - MESSAGE SENDER
 * ==============================================================================
 * 
 * This module handles outgoing messages to WhatsApp users via Meta's Cloud API
 * 
 * API Documentation:
 * https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages
 * 
 * ==============================================================================
 */

const axios = require('axios');

// Meta WhatsApp Cloud API configuration
const GRAPH_API_VERSION = 'v19.0'; // Update to latest version as needed
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

/**
 * ==============================================================================
 * SEND TEXT MESSAGE
 * ==============================================================================
 * ✅ This is the main outgoing message API
 * 
 * Sends a text message to a WhatsApp user via Meta Cloud API
 * 
 * @param {string} to - Recipient's WhatsApp number (with country code, no +)
 *                      Example: "263771234567" (Zimbabwe)
 * @param {string} text - Message text to send
 * @returns {Promise<Object>} - API response with message ID
 * 
 * Usage:
 *   await sendMessage("263771234567", "Welcome to Zororo Phumulani Insurance!");
 */
async function sendMessage(to, text) {
  // Validate inputs
  if (!to || !text) {
    console.error('❌ sendMessage error: Missing recipient or message text');
    return null;
  }

  if (!PHONE_NUMBER_ID || !ACCESS_TOKEN) {
    console.error('❌ Missing WhatsApp credentials in .env file');
    console.error('   Required: PHONE_NUMBER_ID and ACCESS_TOKEN');
    return null;
  }

  // Build API endpoint
  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${PHONE_NUMBER_ID}/messages`;

  // Message payload structure (Meta's required format)
  const data = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: to,
    type: 'text',
    text: {
      preview_url: false, // Set true if message contains URLs you want previewed
      body: text
    }
  };

  console.log(`📤 Sending message to ${to}...`);
  console.log(`💬 Message: "${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"`);

  try {
    const response = await axios({
      method: 'POST',
      url: url,
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: data
    });

    console.log('✅ Message sent successfully');
    console.log('📬 Message ID:', response.data.messages[0].id);
    return response.data;

  } catch (error) {
    console.error('❌ Failed to send message');
    
    if (error.response) {
      // Meta API returned an error
      console.error('Status:', error.response.status);
      console.error('Error:', error.response.data);
      
      // Common errors and solutions
      if (error.response.status === 401) {
        console.error('\n🔑 AUTHENTICATION ERROR:');
        console.error('   - Your ACCESS_TOKEN may be expired (temporary tokens last 24 hours)');
        console.error('   - Generate new token: Meta Dashboard → WhatsApp → Getting Started');
        console.error('   - For production, use System User Token (never expires)');
      } else if (error.response.status === 400) {
        console.error('\n⚠️  BAD REQUEST:');
        console.error('   - Check PHONE_NUMBER_ID is correct');
        console.error('   - Ensure recipient number format is correct (country code, no +)');
        console.error('   - Verify message content is valid');
      }
    } else {
      console.error('Network error:', error.message);
    }
    
    return null;
  }
}

/**
 * ==============================================================================
 * SEND INTERACTIVE BUTTON MESSAGE (Advanced Feature)
 * ==============================================================================
 * 
 * Sends a message with clickable buttons
 * Useful for menu selections (e.g., "Choose Plan: [Funeral] [Accidental Death]")
 * 
 * @param {string} to - Recipient's WhatsApp number
 * @param {string} bodyText - Main message text
 * @param {Array} buttons - Array of button objects [{ id: "1", title: "Option 1" }]
 * @returns {Promise<Object>} - API response
 * 
 * Example:
 *   await sendButtonMessage("263771234567", "Choose your plan:", [
 *     { id: "funeral", title: "Funeral Cover" },
 *     { id: "accidental", title: "Accidental Death" }
 *   ]);
 * 
 * TODO: Implement when needed for better UX
 */
async function sendButtonMessage(to, bodyText, buttons) {
  // Implementation placeholder
  console.log('⚠️  Button messages not yet implemented');
  console.log('   For now, using text-based menus with number selection');
  
  // TODO: Implement interactive buttons
  // API docs: https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages#interactive-messages
  
  return null;
}

/**
 * ==============================================================================
 * SEND IMAGE MESSAGE (For sending policy documents, receipts, etc.)
 * ==============================================================================
 * 
 * @param {string} to - Recipient's WhatsApp number
 * @param {string} imageUrl - Public URL of image to send
 * @param {string} caption - Optional caption text
 * 
 * TODO: Implement when needed for sending:
 * - Insurance certificates
 * - Payment receipts
 * - Policy documents
 */
async function sendImageMessage(to, imageUrl, caption = '') {
  console.log('⚠️  Image messages not yet implemented');
  // TODO: Implement image sending
  return null;
}

/**
 * ==============================================================================
 * SEND DOCUMENT MESSAGE (For sending PDF policy documents)
 * ==============================================================================
 * 
 * @param {string} to - Recipient's WhatsApp number
 * @param {string} documentUrl - Public URL of PDF/document
 * @param {string} filename - Name of file
 * @param {string} caption - Optional caption
 * 
 * TODO: Implement for sending:
 * - Insurance policy PDFs
 * - Terms & conditions
 * - Payment receipts
 */
async function sendDocumentMessage(to, documentUrl, filename, caption = '') {
  console.log('⚠️  Document messages not yet implemented');
  // TODO: Implement document sending
  return null;
}

// ==============================================================================
// EXPORTS
// ==============================================================================
module.exports = {
  sendMessage,
  sendButtonMessage,
  sendImageMessage,
  sendDocumentMessage
};

/**
 * ==============================================================================
 * PRODUCTION ENHANCEMENTS (TODO)
 * ==============================================================================
 * 
 * 1. Message Templates:
 *    - Pre-approved message templates for marketing (required by Meta)
 *    - Templates for: welcome, payment confirmation, policy renewal reminders
 *    - Create in Meta Dashboard → WhatsApp → Message Templates
 * 
 * 2. Message Queue:
 *    - Add queue system (Bull.js + Redis) for high-volume sending
 *    - Handle rate limits (Meta allows 1000 messages/second per phone number)
 * 
 * 3. Message Status Tracking:
 *    - Listen to delivery status webhooks
 *    - Track: sent, delivered, read, failed
 *    - Store in database for analytics
 * 
 * 4. Rich Media:
 *    - Implement image, document, location messages
 *    - Upload media to Meta's hosting or use public URLs
 * 
 * 5. Error Handling:
 *    - Retry logic for failed messages
 *    - Fallback to SMS if WhatsApp fails
 *    - Alert admin if critical messages fail
 * 
 * 6. Analytics:
 *    - Track message open rates
 *    - Monitor response times
 *    - Measure conversion rates (inquiry → onboarding → payment)
 */
