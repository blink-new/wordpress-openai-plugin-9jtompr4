/**
 * AI Tutor Plugin JavaScript
 */
(function($) {
    'use strict';

    class AITutor {
        constructor() {
            this.config = {
                tone: 'friendly',
                reasoning: 'deductive',
                depth: 'intermediate',
                style: 'conversational'
            };
            this.isLoading = false;
            this.conversationHistory = [];
            
            this.init();
        }

        init() {
            this.bindEvents();
            this.loadUserConfig();
            this.setupAutoResize();
        }

        bindEvents() {
            // Settings toggle
            $(document).on('click', '#ai-tutor-settings-btn', (e) => {
                e.preventDefault();
                this.toggleSidebar();
            });

            // Send message
            $(document).on('click', '#ai-tutor-send-btn', (e) => {
                e.preventDefault();
                this.sendMessage();
            });

            // Enter key to send
            $(document).on('keydown', '#ai-tutor-input', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });

            // Command suggestions
            $(document).on('click', '.ai-tutor-command', (e) => {
                const command = $(e.target).data('command');
                $('#ai-tutor-input').val(command);
                this.sendMessage();
            });

            // Quick suggestions
            $(document).on('click', '.ai-tutor-suggestion', (e) => {
                const text = $(e.target).data('text');
                $('#ai-tutor-input').val(text);
                $('#ai-tutor-input').focus();
            });

            // Save configuration
            $(document).on('click', '#ai-tutor-save-config', (e) => {
                e.preventDefault();
                this.saveConfiguration();
            });

            // Configuration changes
            $(document).on('change', '.ai-tutor-select', () => {
                this.updateConfiguration();
            });
        }

        setupAutoResize() {
            $(document).on('input', '#ai-tutor-input', function() {
                this.style.height = 'auto';
                this.style.height = Math.min(this.scrollHeight, 120) + 'px';
            });
        }

        toggleSidebar() {
            $('#ai-tutor-sidebar').toggleClass('active');
        }

        updateConfiguration() {
            this.config = {
                tone: $('#ai-tutor-tone').val(),
                reasoning: $('#ai-tutor-reasoning').val(),
                depth: $('#ai-tutor-depth').val(),
                style: $('#ai-tutor-style').val()
            };
        }

        loadUserConfig() {
            $.ajax({
                url: ai_tutor_ajax.ajax_url,
                type: 'POST',
                data: {
                    action: 'ai_tutor_load_config',
                    nonce: ai_tutor_ajax.nonce
                },
                success: (response) => {
                    if (response.success) {
                        this.config = response.data;
                        this.populateConfigForm();
                    }
                },
                error: () => {
                    console.log('Failed to load user configuration');
                }
            });
        }

        populateConfigForm() {
            $('#ai-tutor-tone').val(this.config.tone || 'friendly');
            $('#ai-tutor-reasoning').val(this.config.reasoning || 'deductive');
            $('#ai-tutor-depth').val(this.config.depth || 'intermediate');
            $('#ai-tutor-style').val(this.config.style || 'conversational');
        }

        saveConfiguration() {
            this.updateConfiguration();
            
            $.ajax({
                url: ai_tutor_ajax.ajax_url,
                type: 'POST',
                data: {
                    action: 'ai_tutor_save_config',
                    nonce: ai_tutor_ajax.nonce,
                    config: JSON.stringify(this.config)
                },
                success: (response) => {
                    if (response.success) {
                        this.showNotification('Configuration saved successfully!', 'success');
                    } else {
                        this.showNotification('Failed to save configuration.', 'error');
                    }
                },
                error: () => {
                    this.showNotification('Error saving configuration.', 'error');
                }
            });
        }

        sendMessage() {
            const input = $('#ai-tutor-input');
            const message = input.val().trim();
            
            if (!message || this.isLoading) {
                return;
            }

            // Check if OpenAI API key is configured
            if (!ai_tutor_ajax.openai_api_key) {
                this.showNotification('OpenAI API key not configured. Please contact the administrator.', 'error');
                return;
            }

            this.isLoading = true;
            this.updateSendButton(true);
            
            // Add user message to chat
            this.addMessage(message, 'user');
            
            // Clear input
            input.val('').css('height', 'auto');
            
            // Show loading indicator
            this.showLoadingMessage();
            
            // Update status
            this.updateStatus('Processing...');

            // Send AJAX request
            $.ajax({
                url: ai_tutor_ajax.ajax_url,
                type: 'POST',
                data: {
                    action: 'ai_tutor_chat',
                    nonce: ai_tutor_ajax.nonce,
                    message: message,
                    config: JSON.stringify(this.config)
                },
                success: (response) => {
                    this.hideLoadingMessage();
                    
                    if (response.success) {
                        this.addMessage(response.data.response, 'ai');
                        this.conversationHistory.push({
                            user: message,
                            ai: response.data.response,
                            timestamp: new Date()
                        });
                    } else {
                        this.addMessage(response.data.message || 'An error occurred.', 'error');
                    }
                },
                error: (xhr, status, error) => {
                    this.hideLoadingMessage();
                    this.addMessage('Connection error. Please try again.', 'error');
                    console.error('AJAX Error:', error);
                },
                complete: () => {
                    this.isLoading = false;
                    this.updateSendButton(false);
                    this.updateStatus('Ready');
                }
            });
        }

        addMessage(content, type) {
            const messagesContainer = $('#ai-tutor-messages');
            const messageClass = type === 'user' ? 'ai-tutor-user-message' : 
                                type === 'error' ? 'ai-tutor-error-message' : 
                                'ai-tutor-ai-message';
            
            const messageHtml = `
                <div class="ai-tutor-message ${messageClass}">
                    <div class="ai-tutor-message-content">
                        ${this.formatMessage(content)}
                    </div>
                </div>
            `;
            
            messagesContainer.append(messageHtml);
            this.scrollToBottom();
        }

        formatMessage(content) {
            // Convert markdown-like formatting
            content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
            content = content.replace(/`(.*?)`/g, '<code>$1</code>');
            
            // Convert line breaks
            content = content.replace(/\n/g, '<br>');
            
            // Wrap in paragraphs
            const paragraphs = content.split('<br><br>');
            return paragraphs.map(p => `<p>${p}</p>`).join('');
        }

        showLoadingMessage() {
            const messagesContainer = $('#ai-tutor-messages');
            const loadingHtml = `
                <div class="ai-tutor-message ai-tutor-loading-message" id="ai-tutor-loading">
                    <div class="ai-tutor-message-content">
                        <div class="ai-tutor-loading">
                            ${ai_tutor_ajax.strings.loading}
                        </div>
                    </div>
                </div>
            `;
            messagesContainer.append(loadingHtml);
            this.scrollToBottom();
        }

        hideLoadingMessage() {
            $('#ai-tutor-loading').remove();
        }

        updateSendButton(loading) {
            const button = $('#ai-tutor-send-btn');
            button.prop('disabled', loading);
            
            if (loading) {
                button.html(`
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 6v6l4 2"></path>
                    </svg>
                `);
            } else {
                button.html(`
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22,2 15,22 11,13 2,9"></polygon>
                    </svg>
                `);
            }
        }

        updateStatus(status) {
            $('#ai-tutor-status').text(status);
        }

        scrollToBottom() {
            const messagesContainer = $('#ai-tutor-messages');
            messagesContainer.scrollTop(messagesContainer[0].scrollHeight);
        }

        showNotification(message, type) {
            const notificationClass = type === 'success' ? 'ai-tutor-notification-success' : 'ai-tutor-notification-error';
            const notification = $(`
                <div class="ai-tutor-notification ${notificationClass}">
                    ${message}
                </div>
            `);
            
            $('body').append(notification);
            
            setTimeout(() => {
                notification.fadeOut(() => {
                    notification.remove();
                });
            }, 3000);
        }

        // Public methods for external access
        clearChat() {
            $('#ai-tutor-messages').empty();
            this.conversationHistory = [];
            
            // Add welcome message
            this.addMessage(`
                Welcome to the AI Tutor System! 🎓
                
                Type /start to begin, or ask me anything you'd like to learn about.
                
                **Quick Commands:**
                /start /plan /test /help
            `, 'system');
        }

        exportConversation() {
            const data = {
                config: this.config,
                history: this.conversationHistory,
                timestamp: new Date().toISOString()
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ai-tutor-conversation-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
        }
    }

    // Initialize when document is ready
    $(document).ready(() => {
        if ($('#ai-tutor-container').length) {
            window.aiTutor = new AITutor();
        }
    });

    // Add notification styles
    $('<style>').text(`
        .ai-tutor-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 6px;
            color: white;
            font-weight: 500;
            z-index: 9999;
            animation: slideInRight 0.3s ease;
        }
        
        .ai-tutor-notification-success {
            background: #059669;
        }
        
        .ai-tutor-notification-error {
            background: #dc2626;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .ai-tutor-error-message .ai-tutor-message-content {
            background: #fef2f2;
            border-left-color: #dc2626;
            color: #991b1b;
        }
    `).appendTo('head');

})(jQuery);