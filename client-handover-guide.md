# AI Tutor System - Client Guide

## 🎓 Your AI Tutor is Now Live!

**Page URL:** [Add your client's page URL here]

## How to Use

### Available Commands
- `/start` - Initialize the tutor and see welcome message
- `/plan` - Create a personalized learning plan
- `/test` - Generate practice questions
- `/help` - Show all available commands

### Personalization
Click the ⚙️ settings button to customize:
- **Tone:** Friendly, Professional, Casual, Encouraging
- **Reasoning:** Deductive, Inductive, Abductive, Analogical
- **Depth:** Elementary, Intermediate, Advanced, Expert

### Example Usage
1. Type `/start` to begin
2. Ask: "I want to learn about marketing basics"
3. The AI will provide structured learning guidance
4. Use `/plan` to create a detailed learning roadmap

## Admin Access

### Plugin Settings
- **Location:** WordPress Admin → Settings → AI Tutor
- **API Key:** Already configured (keep secure!)
- **Model:** Currently set to GPT-4
- **Tokens:** Set to 1000 (good for most responses)

### Adding to Other Pages
Use this shortcode on any page/post:
```
[ai_tutor]
```

Custom options:
```
[ai_tutor height="800px" theme="light"]
```

## Cost Management

### Current Setup
- **Model:** GPT-4 (~$0.03 per 1K tokens)
- **Average Cost:** $0.005-$0.015 per conversation
- **Monthly Estimate:** $10-50 depending on usage

### Monitor Usage
1. Visit [OpenAI Platform](https://platform.openai.com/usage)
2. Check monthly usage and costs
3. Set billing alerts if needed

### Cost Control Tips
- Switch to GPT-3.5-turbo for lower costs
- Reduce max tokens for shorter responses
- Set monthly spending limits in OpenAI dashboard

## Security Notes

✅ **Your API key is secure:**
- Stored server-side only
- Never exposed to website visitors
- All AI requests go through your WordPress server

❌ **Never share your API key**
- Don't include it in support requests
- Regenerate if compromised

## Support

### Common Issues
1. **"API key not configured"** → Check Settings → AI Tutor
2. **Slow responses** → Try GPT-3.5-turbo model
3. **Interface not loading** → Check for plugin conflicts

### Getting Help
- Check the installation guide
- Contact your developer
- Visit OpenAI support for API issues

## Next Steps

1. **Test thoroughly** with different question types
2. **Train your team** on available commands
3. **Monitor usage** in first month
4. **Gather feedback** from users
5. **Consider customizations** based on needs

---

**Installed by:** [Your Name]  
**Date:** [Current Date]  
**Contact:** [Your Email/Phone]