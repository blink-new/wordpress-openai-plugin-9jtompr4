<?php
// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<div id="ai-tutor-container" class="ai-tutor-wrapper" style="height: <?php echo esc_attr($atts['height']); ?>;">
    <div class="ai-tutor-interface">
        <!-- Header -->
        <div class="ai-tutor-header">
            <div class="ai-tutor-title">
                <h3>🎓 AI Tutor System</h3>
                <span class="ai-tutor-status" id="ai-tutor-status">Ready</span>
            </div>
            <button class="ai-tutor-settings-btn" id="ai-tutor-settings-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
            </button>
        </div>

        <div class="ai-tutor-main">
            <!-- Settings Sidebar -->
            <div class="ai-tutor-sidebar" id="ai-tutor-sidebar">
                <div class="ai-tutor-sidebar-content">
                    <h4>Personalization</h4>
                    
                    <div class="ai-tutor-setting-group">
                        <label for="ai-tutor-tone">Tone</label>
                        <select id="ai-tutor-tone" class="ai-tutor-select">
                            <option value="friendly">Friendly</option>
                            <option value="professional">Professional</option>
                            <option value="casual">Casual</option>
                            <option value="encouraging">Encouraging</option>
                        </select>
                    </div>

                    <div class="ai-tutor-setting-group">
                        <label for="ai-tutor-reasoning">Reasoning Style</label>
                        <select id="ai-tutor-reasoning" class="ai-tutor-select">
                            <option value="deductive">Deductive</option>
                            <option value="inductive">Inductive</option>
                            <option value="abductive">Abductive</option>
                            <option value="analogical">Analogical</option>
                        </select>
                    </div>

                    <div class="ai-tutor-setting-group">
                        <label for="ai-tutor-depth">Teaching Depth</label>
                        <select id="ai-tutor-depth" class="ai-tutor-select">
                            <option value="elementary">Elementary</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="expert">Expert</option>
                        </select>
                    </div>

                    <div class="ai-tutor-setting-group">
                        <label for="ai-tutor-style">Communication Style</label>
                        <select id="ai-tutor-style" class="ai-tutor-select">
                            <option value="conversational">Conversational</option>
                            <option value="structured">Structured</option>
                            <option value="socratic">Socratic</option>
                            <option value="storytelling">Storytelling</option>
                        </select>
                    </div>

                    <button class="ai-tutor-save-config" id="ai-tutor-save-config">Save Configuration</button>
                </div>
            </div>

            <!-- Chat Interface -->
            <div class="ai-tutor-chat">
                <div class="ai-tutor-messages" id="ai-tutor-messages">
                    <div class="ai-tutor-message ai-tutor-system-message">
                        <div class="ai-tutor-message-content">
                            <p>Welcome to the AI Tutor System! 🎓</p>
                            <p>Type <code>/start</code> to begin, or ask me anything you'd like to learn about.</p>
                            <div class="ai-tutor-commands">
                                <strong>Quick Commands:</strong>
                                <span class="ai-tutor-command" data-command="/start">/start</span>
                                <span class="ai-tutor-command" data-command="/plan">/plan</span>
                                <span class="ai-tutor-command" data-command="/test">/test</span>
                                <span class="ai-tutor-command" data-command="/help">/help</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="ai-tutor-input-area">
                    <div class="ai-tutor-input-wrapper">
                        <textarea 
                            id="ai-tutor-input" 
                            class="ai-tutor-input" 
                            placeholder="Type your message or command (e.g., /start, /plan, /help)..."
                            rows="1"
                        ></textarea>
                        <button class="ai-tutor-send-btn" id="ai-tutor-send-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22,2 15,22 11,13 2,9"></polygon>
                            </svg>
                        </button>
                    </div>
                    <div class="ai-tutor-suggestions" id="ai-tutor-suggestions">
                        <span class="ai-tutor-suggestion" data-text="/start">Start Session</span>
                        <span class="ai-tutor-suggestion" data-text="/plan">Create Plan</span>
                        <span class="ai-tutor-suggestion" data-text="/test">Generate Test</span>
                        <span class="ai-tutor-suggestion" data-text="/help">Help</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>