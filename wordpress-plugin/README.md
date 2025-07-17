# AI Tutor WordPress Plugin

A comprehensive WordPress plugin that integrates OpenAI API to create an intelligent tutoring system with command-style inputs and customizable preferences.

## Features

- **Command-Style Interface**: Use commands like `/start`, `/plan`, `/test`, and `/help` for specific tutoring functions
- **OpenAI Integration**: Powered by GPT-4 for intelligent responses
- **Customizable Preferences**: Adjust tone, reasoning style, teaching depth, and communication style
- **User Configuration Persistence**: Settings are saved per user
- **Conversation History**: Track and store chat interactions
- **Responsive Design**: Works on desktop and mobile devices
- **WordPress Integration**: Easy shortcode implementation
- **Admin Panel**: Configure API settings and view usage instructions

## Installation

1. **Upload Plugin Files**
   - Upload the `ai-tutor-plugin` folder to your `/wp-content/plugins/` directory
   - Or install via WordPress admin by uploading the ZIP file

2. **Activate Plugin**
   - Go to WordPress Admin → Plugins
   - Find "AI Tutor System" and click "Activate"

3. **Configure OpenAI API**
   - Go to WordPress Admin → Settings → AI Tutor
   - Enter your OpenAI API key (get one from [OpenAI Platform](https://platform.openai.com/api-keys))
   - Configure default model and token limits
   - Save settings

## Usage

### Shortcode Implementation

Add the AI Tutor interface to any page or post using the shortcode:

```
[ai_tutor]
```

**Shortcode Parameters:**
- `height`: Set interface height (default: 600px)
- `theme`: Set theme (light/dark, default: light)

**Example:**
```
[ai_tutor height="800px" theme="dark"]
```

### Available Commands

- `/start` - Initialize the tutor system and show welcome message
- `/plan` - Create a personalized learning plan
- `/test` - Generate practice questions and quizzes
- `/config` - View current personalization settings
- `/help` - Display all available commands

### Personalization Options

Users can customize their tutoring experience through the settings sidebar:

- **Tone**: Friendly, Professional, Casual, Encouraging
- **Reasoning Style**: Deductive, Inductive, Abductive, Analogical
- **Teaching Depth**: Elementary, Intermediate, Advanced, Expert
- **Communication Style**: Conversational, Structured, Socratic, Storytelling

## File Structure

```
ai-tutor-plugin/
├── ai-tutor-plugin.php          # Main plugin file
├── admin/
│   └── settings-page.php        # Admin settings interface
├── assets/
│   ├── css/
│   │   └── ai-tutor.css        # Plugin styles
│   └── js/
│       └── ai-tutor.js         # Frontend JavaScript
├── templates/
│   └── tutor-interface.php     # Main interface template
└── README.md                   # This file
```

## Database Tables

The plugin creates the following database table:

- `wp_ai_tutor_conversations` - Stores conversation history

## API Requirements

- **OpenAI API Key**: Required for AI functionality
- **Supported Models**: GPT-4, GPT-4 Turbo, GPT-3.5 Turbo
- **Token Limits**: Configurable (100-4000 tokens)

## Customization

### Styling

Modify `assets/css/ai-tutor.css` to customize the appearance. The plugin uses:
- CSS Grid and Flexbox for layout
- CSS custom properties for theming
- Responsive design principles
- Smooth animations and transitions

### Functionality

Extend functionality by:
- Adding new commands in the `process_command()` method
- Modifying the system prompt in `build_system_prompt()`
- Adding new configuration options
- Implementing additional OpenAI features

### Hooks and Filters

The plugin provides several WordPress hooks:

**Actions:**
- `ai_tutor_before_chat_response`
- `ai_tutor_after_chat_response`
- `ai_tutor_config_saved`

**Filters:**
- `ai_tutor_system_prompt`
- `ai_tutor_openai_params`
- `ai_tutor_response_format`

## Security Features

- Nonce verification for all AJAX requests
- Input sanitization and validation
- Secure API key storage
- User capability checks
- SQL injection prevention

## Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Troubleshooting

### Common Issues

1. **"OpenAI API key not configured"**
   - Go to Settings → AI Tutor and enter your API key

2. **"Connection error"**
   - Check internet connection
   - Verify API key is valid
   - Ensure server can make external requests

3. **Interface not loading**
   - Check for JavaScript errors in browser console
   - Verify jQuery is loaded
   - Clear browser cache

4. **Styling issues**
   - Check for CSS conflicts with theme
   - Verify plugin CSS is loading
   - Try different theme compatibility

### Debug Mode

Enable WordPress debug mode to see detailed error messages:

```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
```

## Performance Optimization

- Responses are cached for repeated queries
- Database queries are optimized
- Assets are minified in production
- Lazy loading for conversation history

## Privacy and Data

- User conversations are stored locally in WordPress database
- No data is sent to third parties except OpenAI API
- Users can request conversation deletion
- GDPR compliant data handling

## Updates and Maintenance

- Regular security updates
- OpenAI API compatibility updates
- WordPress version compatibility
- Feature enhancements based on user feedback

## Support

For support and feature requests:
- Create an issue in the plugin repository
- Contact the plugin developer
- Check WordPress.org plugin support forum

## License

This plugin is licensed under GPL v2 or later.

## Changelog

### Version 1.0.0
- Initial release
- OpenAI GPT-4 integration
- Command-style interface
- User configuration system
- Responsive design
- WordPress admin integration

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Credits

- Built with WordPress best practices
- Uses OpenAI API for AI functionality
- Inspired by modern chat interfaces
- Designed for educational use cases