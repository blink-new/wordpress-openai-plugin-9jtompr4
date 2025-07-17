# 🔐 AI Tutor Plugin - Security Guide

## OpenAI API Key Security

### ✅ **Secure Storage Location**

Your OpenAI API key is stored securely using WordPress's built-in options system:

1. **WordPress Admin Dashboard** → **Settings** → **AI Tutor**
2. Enter your API key in the "OpenAI API Key" field
3. Click "Save Changes"

### 🛡️ **Security Features**

#### **Server-Side Only Processing**
- ✅ API key stored in WordPress database (server-side)
- ✅ All OpenAI API calls made from PHP backend
- ✅ Key never exposed to frontend/browser
- ✅ No JavaScript access to the API key

#### **WordPress Security Standards**
- ✅ Uses `get_option()` for secure storage
- ✅ Input sanitization with `sanitize_text_field()`
- ✅ AJAX nonce verification for all requests
- ✅ Capability checks for admin access

#### **API Request Security**
- ✅ Server-to-server communication only
- ✅ HTTPS encryption for all API calls
- ✅ Timeout protection (30 seconds max)
- ✅ Error handling without exposing sensitive data

### 🔍 **Security Verification**

#### **Test Your API Key**
1. Go to **Settings** → **AI Tutor**
2. Click "Test API Key" button
3. Verify connection without exposing the key

#### **Check Network Requests**
- Open browser developer tools
- Look at Network tab during AI interactions
- You should see AJAX calls to your WordPress site only
- No direct calls to OpenAI API from browser

### 🚫 **What NOT to Do**

❌ **Never store API keys in:**
- Frontend JavaScript code
- Environment variables exposed to browser
- URL parameters
- Local storage or cookies
- WordPress theme files
- Plugin files committed to public repositories

❌ **Never use:**
```javascript
// WRONG - Exposes key to browser
const apiKey = 'sk-proj-your-key-here';
fetch('https://api.openai.com/v1/chat/completions', {
  headers: { 'Authorization': `Bearer ${apiKey}` }
});
```

### ✅ **Correct Implementation**

✅ **Our secure approach:**
```php
// CORRECT - Server-side only
$api_key = get_option('ai_tutor_openai_api_key'); // Secure storage
$response = wp_remote_post('https://api.openai.com/v1/chat/completions', array(
    'headers' => array(
        'Authorization' => 'Bearer ' . $api_key, // Server-side only
        'Content-Type' => 'application/json',
    ),
    // ... rest of request
));
```

### 🔄 **Data Flow**

```
User Input → WordPress AJAX → PHP Backend → OpenAI API
                                    ↓
User Interface ← WordPress Response ← PHP Processing ← OpenAI Response
```

**Key Points:**
- Browser never sees the API key
- All OpenAI communication happens server-side
- WordPress handles authentication and security

### 📋 **Security Checklist**

- [ ] API key entered in WordPress admin settings
- [ ] Test API connection successful
- [ ] No API key visible in browser developer tools
- [ ] AJAX requests go to WordPress site only
- [ ] Plugin files don't contain hardcoded keys
- [ ] WordPress user has appropriate permissions

### 🆘 **If Your Key is Compromised**

1. **Immediately revoke** the key at [OpenAI Platform](https://platform.openai.com/api-keys)
2. **Generate a new key**
3. **Update the key** in WordPress admin settings
4. **Test the new key** using the test button

### 📞 **Support**

If you have security concerns or questions:
- Check this guide first
- Test your setup using the built-in test function
- Contact plugin support if issues persist

---

**Remember:** Your API key is like a password - keep it secure and never share it publicly!