# AI Tutor WordPress Plugin - Installation Guide

## Quick Start

### Step 1: Download and Install

1. **Download the Plugin**
   - Download the `ai-tutor-plugin` folder
   - Compress it into a ZIP file if needed

2. **Install via WordPress Admin**
   - Go to your WordPress Admin Dashboard
   - Navigate to **Plugins → Add New**
   - Click **Upload Plugin**
   - Choose the ZIP file and click **Install Now**
   - Click **Activate Plugin**

   **OR**

3. **Install via FTP**
   - Upload the `ai-tutor-plugin` folder to `/wp-content/plugins/`
   - Go to **Plugins** in WordPress Admin
   - Find "AI Tutor System" and click **Activate**

### Step 2: Configure OpenAI API

1. **Get OpenAI API Key**
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Sign up or log in to your account
   - Click **Create new secret key**
   - Copy the key (starts with `sk-`)

2. **Configure Plugin Settings**
   - Go to **WordPress Admin → Settings → AI Tutor**
   - Paste your OpenAI API key
   - Select default model (GPT-4 recommended)
   - Set max tokens (1000 is good for most uses)
   - Click **Save Changes**

### Step 3: Add to Your Site

1. **Using Shortcode**
   - Edit any page or post
   - Add the shortcode: `[ai_tutor]`
   - Publish the page

2. **Customization Options**
   ```
   [ai_tutor height="800px" theme="light"]
   ```

## Detailed Configuration

### OpenAI API Setup

1. **Create OpenAI Account**
   - Go to https://platform.openai.com
   - Sign up with email or Google/Microsoft account
   - Verify your email address

2. **Add Payment Method**
   - Go to **Billing** in your OpenAI dashboard
   - Add a credit card (required for API access)
   - Set usage limits to control costs

3. **Generate API Key**
   - Navigate to **API Keys** section
   - Click **Create new secret key**
   - Give it a name (e.g., "WordPress AI Tutor")
   - Copy the key immediately (you won't see it again)

4. **Test API Key**
   - In WordPress Admin → Settings → AI Tutor
   - Paste the API key
   - The plugin will validate it automatically

### Plugin Settings Explained

#### OpenAI Configuration
- **API Key**: Your secret key from OpenAI
- **Default Model**: 
  - `gpt-4` - Most capable, higher cost
  - `gpt-4-turbo` - Faster, good balance
  - `gpt-3.5-turbo` - Fastest, lower cost
- **Max Tokens**: Response length limit (100-4000)

#### Usage Recommendations
- **For Education**: Use GPT-4 with 1000-1500 tokens
- **For Quick Answers**: Use GPT-3.5-turbo with 500-800 tokens
- **For Detailed Explanations**: Use GPT-4 with 1500-2000 tokens

## Implementation Examples

### Basic Implementation

```html
<!-- Simple integration -->
[ai_tutor]
```

### Advanced Implementation

```html
<!-- Custom height and theme -->
[ai_tutor height="700px" theme="dark"]
```

### In PHP Templates

```php
<?php
// In your theme files
echo do_shortcode('[ai_tutor height="600px"]');
?>
```

### With Custom CSS

```css
/* Override plugin styles */
.ai-tutor-wrapper {
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.ai-tutor-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## Testing Your Installation

### 1. Basic Functionality Test

1. Go to a page with the AI Tutor
2. Type `/start` and press Enter
3. You should see a welcome message
4. Try asking a simple question like "What is photosynthesis?"

### 2. Command Testing

Test each command:
- `/start` - Should show welcome and current settings
- `/plan` - Should show learning plan template
- `/test` - Should show test generation instructions
- `/config` - Should display current configuration
- `/help` - Should list all available commands

### 3. Configuration Testing

1. Click the settings button (gear icon)
2. Change tone from "Friendly" to "Professional"
3. Save configuration
4. Ask the same question again
5. Notice the different response style

## Troubleshooting

### Common Issues and Solutions

#### 1. "OpenAI API key not configured"

**Problem**: API key is missing or invalid

**Solutions**:
- Check if you entered the key correctly
- Ensure the key starts with `sk-`
- Verify your OpenAI account has billing set up
- Try generating a new API key

#### 2. Interface Not Loading

**Problem**: Shortcode shows but interface doesn't appear

**Solutions**:
- Check browser console for JavaScript errors
- Ensure jQuery is loaded by your theme
- Try switching to a default WordPress theme temporarily
- Clear browser cache and try again

#### 3. Styling Issues

**Problem**: Interface looks broken or unstyled

**Solutions**:
- Check if CSS file is loading (view page source)
- Look for theme conflicts in browser developer tools
- Try adding `!important` to custom CSS rules
- Contact theme developer about compatibility

#### 4. "Connection Error"

**Problem**: Can't connect to OpenAI API

**Solutions**:
- Check your internet connection
- Verify server can make external HTTP requests
- Contact hosting provider about firewall restrictions
- Check OpenAI service status

#### 5. Slow Responses

**Problem**: AI takes too long to respond

**Solutions**:
- Reduce max tokens setting
- Switch to GPT-3.5-turbo model
- Check your hosting server performance
- Consider upgrading hosting plan

### Debug Mode

Enable WordPress debugging to see detailed errors:

```php
// Add to wp-config.php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

Check debug logs in `/wp-content/debug.log`

## Security Considerations

### API Key Security

1. **Never Share Your API Key**
   - Don't commit it to version control
   - Don't share it in support requests
   - Regenerate if compromised

2. **Set Usage Limits**
   - Configure monthly spending limits in OpenAI dashboard
   - Monitor usage regularly
   - Set up billing alerts

3. **User Access Control**
   - Consider limiting who can use the tutor
   - Monitor conversation logs for inappropriate use
   - Implement rate limiting if needed

### WordPress Security

1. **Keep Plugin Updated**
   - Update when new versions are available
   - Subscribe to security notifications

2. **Regular Backups**
   - Backup your site before installing
   - Include database in backups (conversation history)

3. **User Permissions**
   - Only give admin access to trusted users
   - Regular security audits

## Performance Optimization

### Caching

The plugin includes basic caching for:
- User configurations
- Repeated queries
- Static responses

### Database Optimization

- Conversation history is automatically cleaned up
- Old conversations are archived after 30 days
- Database indexes are optimized for performance

### Server Requirements

**Minimum**:
- PHP 7.4+
- WordPress 5.0+
- MySQL 5.6+
- 128MB memory limit

**Recommended**:
- PHP 8.0+
- WordPress 6.0+
- MySQL 8.0+
- 256MB memory limit
- SSD storage

## Cost Management

### OpenAI Pricing (as of 2024)

- **GPT-4**: ~$0.03 per 1K tokens
- **GPT-4 Turbo**: ~$0.01 per 1K tokens  
- **GPT-3.5 Turbo**: ~$0.002 per 1K tokens

### Cost Estimation

For a typical educational conversation:
- Average message: 50 tokens
- Average response: 200 tokens
- Cost per exchange: $0.005-$0.015

### Cost Control Tips

1. **Set Token Limits**: Lower max tokens for shorter responses
2. **Choose Right Model**: Use GPT-3.5 for simple questions
3. **Monitor Usage**: Check OpenAI dashboard regularly
4. **Set Billing Alerts**: Get notified at spending thresholds
5. **User Limits**: Consider daily/monthly limits per user

## Support and Updates

### Getting Help

1. **Documentation**: Check this guide first
2. **WordPress Forums**: Search for similar issues
3. **Plugin Support**: Contact developer directly
4. **Community**: Join WordPress AI/education groups

### Staying Updated

1. **Plugin Updates**: Enable automatic updates
2. **OpenAI Changes**: Monitor API changelog
3. **WordPress Compatibility**: Test with new WP versions
4. **Security Patches**: Apply immediately

### Feature Requests

To request new features:
1. Check existing feature requests
2. Provide detailed use case
3. Consider contributing code
4. Be patient with development timeline

## Next Steps

After successful installation:

1. **Customize Appearance**: Match your site's design
2. **Train Users**: Show them available commands
3. **Monitor Usage**: Track engagement and costs
4. **Gather Feedback**: Improve based on user needs
5. **Explore Advanced Features**: Custom commands, integrations

## Conclusion

You now have a fully functional AI Tutor system on your WordPress site! The plugin provides a powerful educational tool that can adapt to different learning styles and needs.

Remember to:
- Monitor your OpenAI usage and costs
- Keep the plugin updated
- Gather user feedback for improvements
- Explore customization options

For additional support or advanced customization needs, don't hesitate to reach out to the plugin developer or the WordPress community.