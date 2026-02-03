# 🔍 Quick Diagnostic Script for Render Deployment
# 
# Run this to check if your bot is configured correctly
# 
# Windows Usage:
#   .\verify-deployment.ps1

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   ZORORO WHATSAPP BOT DIAGNOSTICS" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Get Render app URL from user
Write-Host "📝 Enter your Render app URL (without /webhook):" -ForegroundColor Yellow
Write-Host "   Example: https://zororo-whatsapp-bot.onrender.com" -ForegroundColor Gray
$RENDER_URL = Read-Host "URL"

if (-not $RENDER_URL) {
    Write-Host "`n❌ ERROR: No URL provided" -ForegroundColor Red
    exit 1
}

# Remove trailing slash if present
$RENDER_URL = $RENDER_URL.TrimEnd('/')

Write-Host "`n🔍 Running diagnostics on: $RENDER_URL`n" -ForegroundColor Cyan

# ==============================================================================
# TEST 1: Check if server is accessible
# ==============================================================================
Write-Host "TEST 1: Server Accessibility" -ForegroundColor Yellow
Write-Host "================================`n" -ForegroundColor Yellow

try {
    $response = Invoke-WebRequest -Uri $RENDER_URL -Method GET -TimeoutSec 10
    Write-Host "✅ Server is accessible" -ForegroundColor Green
    Write-Host "   Status Code: $($response.StatusCode)" -ForegroundColor Gray
} catch {
    Write-Host "❌ FAILED: Server not accessible" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "`n⚠️  TROUBLESHOOTING:" -ForegroundColor Yellow
    Write-Host "   1. Check if URL is correct" -ForegroundColor Gray
    Write-Host "   2. Verify app is deployed in Render dashboard" -ForegroundColor Gray
    Write-Host "   3. Check Render status page" -ForegroundColor Gray
    Write-Host "`n❌ Stopping diagnostics - fix server access first`n" -ForegroundColor Red
    exit 1
}

Start-Sleep -Seconds 1

# ==============================================================================
# TEST 2: Check health endpoint
# ==============================================================================
Write-Host "`nTEST 2: Health Check" -ForegroundColor Yellow
Write-Host "================================`n" -ForegroundColor Yellow

try {
    $healthUrl = "$RENDER_URL/health"
    $response = Invoke-RestMethod -Uri $healthUrl -Method GET -TimeoutSec 10
    
    Write-Host "✅ Health endpoint responding" -ForegroundColor Green
    Write-Host "   Status: $($response.status)" -ForegroundColor Gray
    Write-Host "   Service: $($response.service)" -ForegroundColor Gray
    Write-Host "`n   Configuration:" -ForegroundColor Cyan
    
    if ($response.config.hasAccessToken) {
        Write-Host "   ✅ ACCESS_TOKEN: Set" -ForegroundColor Green
        Write-Host "      Preview: $($response.config.accessTokenPreview)" -ForegroundColor Gray
    } else {
        Write-Host "   ❌ ACCESS_TOKEN: NOT SET!" -ForegroundColor Red
    }
    
    if ($response.config.hasPhoneNumberId) {
        Write-Host "   ✅ PHONE_NUMBER_ID: Set" -ForegroundColor Green
        Write-Host "      Value: $($response.config.phoneNumberId)" -ForegroundColor Gray
    } else {
        Write-Host "   ❌ PHONE_NUMBER_ID: NOT SET!" -ForegroundColor Red
    }
    
    if ($response.config.hasVerifyToken) {
        Write-Host "   ✅ VERIFY_TOKEN: Set" -ForegroundColor Green
    } else {
        Write-Host "   ❌ VERIFY_TOKEN: NOT SET!" -ForegroundColor Red
    }
    
    # Check if any credentials missing
    $missingCreds = @()
    if (-not $response.config.hasAccessToken) { $missingCreds += "ACCESS_TOKEN" }
    if (-not $response.config.hasPhoneNumberId) { $missingCreds += "PHONE_NUMBER_ID" }
    if (-not $response.config.hasVerifyToken) { $missingCreds += "VERIFY_TOKEN" }
    
    if ($missingCreds.Count -gt 0) {
        Write-Host "`n⚠️  MISSING CREDENTIALS:" -ForegroundColor Red
        foreach ($cred in $missingCreds) {
            Write-Host "   - $cred" -ForegroundColor Red
        }
        Write-Host "`n   FIX:" -ForegroundColor Yellow
        Write-Host "   1. Go to Render Dashboard" -ForegroundColor Gray
        Write-Host "   2. Select your service" -ForegroundColor Gray
        Write-Host "   3. Click 'Environment' tab" -ForegroundColor Gray
        Write-Host "   4. Add missing environment variables" -ForegroundColor Gray
        Write-Host "   5. Click 'Save Changes' (will auto-redeploy)`n" -ForegroundColor Gray
    }
    
} catch {
    Write-Host "❌ FAILED: Health endpoint not responding" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "`n⚠️  This might indicate a server error" -ForegroundColor Yellow
    Write-Host "   Check Render logs for errors`n" -ForegroundColor Gray
}

Start-Sleep -Seconds 1

# ==============================================================================
# TEST 3: Test webhook verification (GET)
# ==============================================================================
Write-Host "`nTEST 3: Webhook Verification Endpoint" -ForegroundColor Yellow
Write-Host "================================`n" -ForegroundColor Yellow

try {
    $webhookUrl = "$RENDER_URL/webhook?hub.mode=subscribe&hub.verify_token=test_token_12345&hub.challenge=challenge_code_123"
    $response = Invoke-WebRequest -Uri $webhookUrl -Method GET -TimeoutSec 10
    
    Write-Host "✅ Webhook GET endpoint responding" -ForegroundColor Green
    Write-Host "   Status Code: $($response.StatusCode)" -ForegroundColor Gray
    Write-Host "   Response: $($response.Content)" -ForegroundColor Gray
    Write-Host "`n   Note: Will fail verification with test token (expected)" -ForegroundColor Cyan
    
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    if ($statusCode -eq 403) {
        Write-Host "✅ Webhook verification endpoint working" -ForegroundColor Green
        Write-Host "   Status: 403 Forbidden (token mismatch - expected)" -ForegroundColor Gray
        Write-Host "   This means endpoint is responding correctly!" -ForegroundColor Green
    } else {
        Write-Host "⚠️  WARNING: Webhook endpoint returned $statusCode" -ForegroundColor Yellow
        Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

Start-Sleep -Seconds 1

# ==============================================================================
# TEST 4: Test message sending (if phone number provided)
# ==============================================================================
Write-Host "`nTEST 4: Message Sending Test" -ForegroundColor Yellow
Write-Host "================================`n" -ForegroundColor Yellow

Write-Host "📱 Enter your WhatsApp phone number to test sending (or press Enter to skip):" -ForegroundColor Yellow
Write-Host "   Format: 263771234567 (country code + number, no +)" -ForegroundColor Gray
$PHONE = Read-Host "Phone"

if ($PHONE) {
    try {
        $testUrl = "$RENDER_URL/test-send?to=$PHONE&message=Hello! This is a test from Zororo Bot."
        Write-Host "`n⏳ Sending test message..." -ForegroundColor Cyan
        $response = Invoke-RestMethod -Uri $testUrl -Method GET -TimeoutSec 15
        
        if ($response.success) {
            Write-Host "✅ MESSAGE SENT SUCCESSFULLY!" -ForegroundColor Green
            Write-Host "   Check your WhatsApp for the test message" -ForegroundColor Gray
        } else {
            Write-Host "❌ FAILED TO SEND MESSAGE" -ForegroundColor Red
            Write-Host "   Error: $($response.message)" -ForegroundColor Red
            Write-Host "`n⚠️  TROUBLESHOOTING:" -ForegroundColor Yellow
            Write-Host "   1. Check ACCESS_TOKEN is valid (not expired)" -ForegroundColor Gray
            Write-Host "   2. Verify PHONE_NUMBER_ID is correct" -ForegroundColor Gray
            Write-Host "   3. Check phone number format (no + or spaces)" -ForegroundColor Gray
            Write-Host "   4. Verify phone number is registered with Meta" -ForegroundColor Gray
        }
    } catch {
        Write-Host "❌ FAILED: Could not send test message" -ForegroundColor Red
        Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "⏭️  Skipped (no phone number provided)" -ForegroundColor Gray
}

# ==============================================================================
# SUMMARY
# ==============================================================================
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "   DIAGNOSTIC SUMMARY" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "✅ WHAT TO DO NEXT:`n" -ForegroundColor Green

Write-Host "1. Check Render Logs:" -ForegroundColor Yellow
Write-Host "   - Go to Render Dashboard → Your Service → Logs" -ForegroundColor Gray
Write-Host "   - Keep logs open while testing" -ForegroundColor Gray
Write-Host "   - Send WhatsApp message and watch for webhook calls`n" -ForegroundColor Gray

Write-Host "2. Configure Meta Webhook:" -ForegroundColor Yellow
Write-Host "   - Go to Meta Developers Dashboard" -ForegroundColor Gray
Write-Host "   - WhatsApp → Configuration → Webhooks" -ForegroundColor Gray
Write-Host "   - Callback URL: $RENDER_URL/webhook" -ForegroundColor Cyan
Write-Host "   - Verify Token: (your VERIFY_TOKEN from .env)" -ForegroundColor Gray
Write-Host "   - Subscribe to: messages ✅`n" -ForegroundColor Gray

Write-Host "3. Test with WhatsApp:" -ForegroundColor Yellow
Write-Host "   - Add Meta test number to your contacts" -ForegroundColor Gray
Write-Host "   - Send: Hi" -ForegroundColor Gray
Write-Host "   - Watch Render logs for webhook call" -ForegroundColor Gray
Write-Host "   - Should see: 📨 INCOMING WEBHOOK REQUEST`n" -ForegroundColor Gray

Write-Host "4. If still not working:" -ForegroundColor Yellow
Write-Host "   - See DEBUGGING.md for complete guide" -ForegroundColor Gray
Write-Host "   - Check ACCESS_TOKEN hasn't expired" -ForegroundColor Gray
Write-Host "   - Verify webhook subscription is active in Meta`n" -ForegroundColor Gray

Write-Host "========================================`n" -ForegroundColor Cyan
Write-Host "📚 For detailed debugging, see: DEBUGGING.md" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan
