<?php
/**
 * Plugin Name: AI Tutor System
 * Plugin URI: https://your-website.com/ai-tutor-plugin
 * Description: A modular AI tutoring system with OpenAI integration featuring command-style inputs and customizable tutoring preferences.
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://your-website.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: ai-tutor
 * Domain Path: /languages
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('AI_TUTOR_VERSION', '1.0.0');
define('AI_TUTOR_PLUGIN_URL', plugin_dir_url(__FILE__));
define('AI_TUTOR_PLUGIN_PATH', plugin_dir_path(__FILE__));

/**
 * Main AI Tutor Plugin Class
 */
class AI_Tutor_Plugin {
    
    /**
     * Constructor
     */
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('wp_ajax_ai_tutor_chat', array($this, 'handle_chat_request'));
        add_action('wp_ajax_nopriv_ai_tutor_chat', array($this, 'handle_chat_request'));
        add_action('wp_ajax_ai_tutor_save_config', array($this, 'save_user_config'));
        add_action('wp_ajax_ai_tutor_load_config', array($this, 'load_user_config'));
        
        // Admin hooks
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'admin_init'));
        
        // Shortcode
        add_shortcode('ai_tutor', array($this, 'render_tutor_interface'));
        
        // Activation/Deactivation hooks
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
    }
    
    /**
     * Initialize plugin
     */
    public function init() {
        load_plugin_textdomain('ai-tutor', false, dirname(plugin_basename(__FILE__)) . '/languages');
        $this->create_database_tables();
    }
    
    /**
     * Enqueue scripts and styles
     */
    public function enqueue_scripts() {
        wp_enqueue_script('ai-tutor-js', AI_TUTOR_PLUGIN_URL . 'assets/js/ai-tutor.js', array('jquery'), AI_TUTOR_VERSION, true);
        wp_enqueue_style('ai-tutor-css', AI_TUTOR_PLUGIN_URL . 'assets/css/ai-tutor.css', array(), AI_TUTOR_VERSION);
        
        // Localize script for AJAX
        wp_localize_script('ai-tutor-js', 'ai_tutor_ajax', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('ai_tutor_nonce'),
            'openai_api_key' => get_option('ai_tutor_openai_api_key', ''),
            'strings' => array(
                'error_message' => __('An error occurred. Please try again.', 'ai-tutor'),
                'loading' => __('Loading...', 'ai-tutor'),
                'type_message' => __('Type your message or command...', 'ai-tutor'),
            )
        ));
    }
    
    /**
     * Handle chat requests
     */
    public function handle_chat_request() {
        check_ajax_referer('ai_tutor_nonce', 'nonce');
        
        $message = sanitize_textarea_field($_POST['message']);
        $user_config = json_decode(stripslashes($_POST['config']), true);
        
        // Get OpenAI API key
        $api_key = get_option('ai_tutor_openai_api_key');
        if (empty($api_key)) {
            wp_send_json_error(array('message' => __('OpenAI API key not configured.', 'ai-tutor')));
        }
        
        // Process command or regular message
        $response = $this->process_message($message, $user_config, $api_key);
        
        // Save conversation history
        $this->save_conversation_history($message, $response);
        
        wp_send_json_success(array('response' => $response));
    }
    
    /**
     * Process message with OpenAI API
     */
    private function process_message($message, $config, $api_key) {
        // Check if message is a command
        if (strpos($message, '/') === 0) {
            return $this->process_command($message, $config);
        }
        
        // Prepare system prompt based on user configuration
        $system_prompt = $this->build_system_prompt($config);
        
        // Make API call to OpenAI
        $response = wp_remote_post('https://api.openai.com/v1/chat/completions', array(
            'headers' => array(
                'Authorization' => 'Bearer ' . $api_key,
                'Content-Type' => 'application/json',
            ),
            'body' => json_encode(array(
                'model' => 'gpt-4',
                'messages' => array(
                    array('role' => 'system', 'content' => $system_prompt),
                    array('role' => 'user', 'content' => $message)
                ),
                'max_tokens' => 1000,
                'temperature' => 0.7,
            )),
            'timeout' => 30,
        ));
        
        if (is_wp_error($response)) {
            return __('Error connecting to OpenAI API.', 'ai-tutor');
        }
        
        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body, true);
        
        if (isset($data['choices'][0]['message']['content'])) {
            return $data['choices'][0]['message']['content'];
        }
        
        return __('No response from AI.', 'ai-tutor');
    }
    
    /**
     * Process commands
     */
    private function process_command($command, $config) {
        $command = trim($command);
        
        switch ($command) {
            case '/start':
                return $this->get_start_message($config);
            case '/plan':
                return $this->get_plan_template();
            case '/config':
                return $this->get_config_info($config);
            case '/test':
                return $this->get_test_template();
            case '/help':
                return $this->get_help_message();
            default:
                return __('Unknown command. Type /help for available commands.', 'ai-tutor');
        }
    }
    
    /**
     * Build system prompt based on configuration
     */
    private function build_system_prompt($config) {
        $tone = isset($config['tone']) ? $config['tone'] : 'friendly';
        $reasoning = isset($config['reasoning']) ? $config['reasoning'] : 'deductive';
        $depth = isset($config['depth']) ? $config['depth'] : 'intermediate';
        
        return "You are an AI tutor with the following characteristics:
        - Tone: {$tone}
        - Reasoning Style: {$reasoning}
        - Teaching Depth: {$depth}
        
        Provide educational responses that match these preferences. Be helpful, encouraging, and adapt your explanations to the specified depth level.";
    }
    
    /**
     * Get start message
     */
    private function get_start_message($config) {
        return "🎓 **AI Tutor System Activated**\n\nHello! I'm your AI tutor, ready to help you learn. Here's what I can do:\n\n**Available Commands:**\n- `/plan` - Create a learning plan\n- `/test` - Generate practice questions\n- `/config` - View current settings\n- `/help` - Show all commands\n\n**Current Settings:**\n- Tone: " . ($config['tone'] ?? 'friendly') . "\n- Reasoning: " . ($config['reasoning'] ?? 'deductive') . "\n- Depth: " . ($config['depth'] ?? 'intermediate') . "\n\nWhat would you like to learn about today?";
    }
    
    /**
     * Get plan template
     */
    private function get_plan_template() {
        return "📋 **Learning Plan Template**\n\nTo create a personalized learning plan, please provide:\n\n1. **Subject/Topic**: What do you want to learn?\n2. **Current Level**: Beginner, Intermediate, or Advanced?\n3. **Time Available**: How much time can you dedicate?\n4. **Learning Goals**: What do you want to achieve?\n5. **Preferred Style**: Visual, auditory, hands-on, or reading?\n\nExample: \"I want to learn JavaScript. I'm a beginner with 1 hour daily. My goal is to build a simple website.\"";
    }
    
    /**
     * Get configuration info
     */
    private function get_config_info($config) {
        return "⚙️ **Current Configuration**\n\n" . json_encode($config, JSON_PRETTY_PRINT);
    }
    
    /**
     * Get test template
     */
    private function get_test_template() {
        return "📝 **Test Generator**\n\nTo generate practice questions, specify:\n\n1. **Subject**: What topic to test\n2. **Question Type**: Multiple choice, short answer, essay\n3. **Difficulty**: Easy, medium, hard\n4. **Number**: How many questions\n\nExample: \"Generate 5 medium difficulty multiple choice questions about photosynthesis.\"";
    }
    
    /**
     * Get help message
     */
    private function get_help_message() {
        return "❓ **Available Commands**\n\n- `/start` - Initialize the tutor system\n- `/plan` - Create a learning plan\n- `/test` - Generate practice questions\n- `/config` - View current settings\n- `/help` - Show this help message\n\n**Tips:**\n- Use commands to access specific features\n- Ask questions naturally for tutoring\n- Adjust settings in the sidebar for personalized responses";
    }
    
    /**
     * Save user configuration
     */
    public function save_user_config() {
        check_ajax_referer('ai_tutor_nonce', 'nonce');
        
        $config = json_decode(stripslashes($_POST['config']), true);
        $user_id = get_current_user_id();
        
        if ($user_id) {
            update_user_meta($user_id, 'ai_tutor_config', $config);
        } else {
            // Save to session for non-logged users
            if (!session_id()) {
                session_start();
            }
            $_SESSION['ai_tutor_config'] = $config;
        }
        
        wp_send_json_success();
    }
    
    /**
     * Load user configuration
     */
    public function load_user_config() {
        check_ajax_referer('ai_tutor_nonce', 'nonce');
        
        $user_id = get_current_user_id();
        $config = array();
        
        if ($user_id) {
            $config = get_user_meta($user_id, 'ai_tutor_config', true);
        } else {
            if (!session_id()) {
                session_start();
            }
            $config = isset($_SESSION['ai_tutor_config']) ? $_SESSION['ai_tutor_config'] : array();
        }
        
        // Default configuration
        if (empty($config)) {
            $config = array(
                'tone' => 'friendly',
                'reasoning' => 'deductive',
                'depth' => 'intermediate',
                'style' => 'conversational'
            );
        }
        
        wp_send_json_success($config);
    }
    
    /**
     * Save conversation history
     */
    private function save_conversation_history($message, $response) {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'ai_tutor_conversations';
        $user_id = get_current_user_id();
        
        $wpdb->insert(
            $table_name,
            array(
                'user_id' => $user_id,
                'message' => $message,
                'response' => $response,
                'created_at' => current_time('mysql')
            ),
            array('%d', '%s', '%s', '%s')
        );
    }
    
    /**
     * Render tutor interface shortcode
     */
    public function render_tutor_interface($atts) {
        $atts = shortcode_atts(array(
            'height' => '600px',
            'theme' => 'light'
        ), $atts);
        
        ob_start();
        include AI_TUTOR_PLUGIN_PATH . 'templates/tutor-interface.php';
        return ob_get_clean();
    }
    
    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        add_options_page(
            __('AI Tutor Settings', 'ai-tutor'),
            __('AI Tutor', 'ai-tutor'),
            'manage_options',
            'ai-tutor-settings',
            array($this, 'admin_page')
        );
    }
    
    /**
     * Admin page
     */
    public function admin_page() {
        include AI_TUTOR_PLUGIN_PATH . 'admin/settings-page.php';
    }
    
    /**
     * Admin init
     */
    public function admin_init() {
        register_setting('ai_tutor_settings', 'ai_tutor_openai_api_key');
        register_setting('ai_tutor_settings', 'ai_tutor_default_model');
        register_setting('ai_tutor_settings', 'ai_tutor_max_tokens');
    }
    
    /**
     * Create database tables
     */
    private function create_database_tables() {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'ai_tutor_conversations';
        
        $charset_collate = $wpdb->get_charset_collate();
        
        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            user_id bigint(20) NOT NULL,
            message text NOT NULL,
            response longtext NOT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY user_id (user_id)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
    
    /**
     * Plugin activation
     */
    public function activate() {
        $this->create_database_tables();
        flush_rewrite_rules();
    }
    
    /**
     * Plugin deactivation
     */
    public function deactivate() {
        flush_rewrite_rules();
    }
}

// Initialize the plugin
new AI_Tutor_Plugin();