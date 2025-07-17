<?php
// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Handle form submission
if (isset($_POST['submit'])) {
    check_admin_referer('ai_tutor_settings');
    
    update_option('ai_tutor_openai_api_key', sanitize_text_field($_POST['ai_tutor_openai_api_key']));
    update_option('ai_tutor_default_model', sanitize_text_field($_POST['ai_tutor_default_model']));
    update_option('ai_tutor_max_tokens', intval($_POST['ai_tutor_max_tokens']));
    
    echo '<div class="notice notice-success"><p>' . __('Settings saved successfully!', 'ai-tutor') . '</p></div>';
}

$api_key = get_option('ai_tutor_openai_api_key', '');
$default_model = get_option('ai_tutor_default_model', 'gpt-4');
$max_tokens = get_option('ai_tutor_max_tokens', 1000);
?>

<div class="wrap">
    <h1><?php _e('AI Tutor Settings', 'ai-tutor'); ?></h1>
    
    <form method="post" action="">
        <?php wp_nonce_field('ai_tutor_settings'); ?>
        
        <table class="form-table">
            <tr>
                <th scope="row">
                    <label for="ai_tutor_openai_api_key"><?php _e('OpenAI API Key', 'ai-tutor'); ?></label>
                </th>
                <td>
                    <input 
                        type="password" 
                        id="ai_tutor_openai_api_key" 
                        name="ai_tutor_openai_api_key" 
                        value="<?php echo esc_attr($api_key); ?>" 
                        class="regular-text"
                        placeholder="sk-..."
                    />
                    <p class="description">
                        <?php _e('Enter your OpenAI API key. You can get one from', 'ai-tutor'); ?> 
                        <a href="https://platform.openai.com/api-keys" target="_blank">OpenAI Platform</a>.
                    </p>
                </td>
            </tr>
            
            <tr>
                <th scope="row">
                    <label for="ai_tutor_default_model"><?php _e('Default Model', 'ai-tutor'); ?></label>
                </th>
                <td>
                    <select id="ai_tutor_default_model" name="ai_tutor_default_model">
                        <option value="gpt-4" <?php selected($default_model, 'gpt-4'); ?>>GPT-4</option>
                        <option value="gpt-4-turbo" <?php selected($default_model, 'gpt-4-turbo'); ?>>GPT-4 Turbo</option>
                        <option value="gpt-3.5-turbo" <?php selected($default_model, 'gpt-3.5-turbo'); ?>>GPT-3.5 Turbo</option>
                    </select>
                    <p class="description">
                        <?php _e('Select the default OpenAI model to use for responses.', 'ai-tutor'); ?>
                    </p>
                </td>
            </tr>
            
            <tr>
                <th scope="row">
                    <label for="ai_tutor_max_tokens"><?php _e('Max Tokens', 'ai-tutor'); ?></label>
                </th>
                <td>
                    <input 
                        type="number" 
                        id="ai_tutor_max_tokens" 
                        name="ai_tutor_max_tokens" 
                        value="<?php echo esc_attr($max_tokens); ?>" 
                        min="100" 
                        max="4000" 
                        step="100"
                    />
                    <p class="description">
                        <?php _e('Maximum number of tokens for AI responses (100-4000).', 'ai-tutor'); ?>
                    </p>
                </td>
            </tr>
        </table>
        
        <?php submit_button(); ?>
    </form>
    
    <hr>
    
    <h2><?php _e('Usage Instructions', 'ai-tutor'); ?></h2>
    <div class="ai-tutor-instructions">
        <h3><?php _e('Shortcode Usage', 'ai-tutor'); ?></h3>
        <p><?php _e('Use the following shortcode to display the AI Tutor interface on any page or post:', 'ai-tutor'); ?></p>
        <code>[ai_tutor]</code>
        
        <h4><?php _e('Shortcode Parameters', 'ai-tutor'); ?></h4>
        <ul>
            <li><strong>height</strong>: Set the height of the interface (default: 600px)</li>
            <li><strong>theme</strong>: Set the theme (light/dark, default: light)</li>
        </ul>
        
        <p><?php _e('Example:', 'ai-tutor'); ?></p>
        <code>[ai_tutor height="800px" theme="dark"]</code>
        
        <h3><?php _e('Available Commands', 'ai-tutor'); ?></h3>
        <ul>
            <li><strong>/start</strong> - Initialize the tutor system</li>
            <li><strong>/plan</strong> - Create a learning plan</li>
            <li><strong>/test</strong> - Generate practice questions</li>
            <li><strong>/config</strong> - View current settings</li>
            <li><strong>/help</strong> - Show available commands</li>
        </ul>
        
        <h3><?php _e('Features', 'ai-tutor'); ?></h3>
        <ul>
            <li>Command-style input parsing</li>
            <li>Customizable tutoring preferences</li>
            <li>Real-time OpenAI integration</li>
            <li>User configuration persistence</li>
            <li>Conversation history tracking</li>
            <li>Responsive design</li>
        </ul>
    </div>
    
    <style>
    .ai-tutor-instructions {
        background: #f9f9f9;
        padding: 20px;
        border-radius: 5px;
        margin-top: 20px;
    }
    .ai-tutor-instructions h3 {
        margin-top: 20px;
        color: #2563eb;
    }
    .ai-tutor-instructions h4 {
        margin-top: 15px;
        color: #7c3aed;
    }
    .ai-tutor-instructions code {
        background: #e5e7eb;
        padding: 2px 6px;
        border-radius: 3px;
        font-family: monospace;
    }
    .ai-tutor-instructions ul {
        margin-left: 20px;
    }
    </style>
</div>