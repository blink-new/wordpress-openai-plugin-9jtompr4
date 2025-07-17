import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'ai' | 'system';
  timestamp: Date;
}

interface Config {
  style: string;
  reasoning: string;
  depth: string;
  tone: string;
}

const AITutorDemo: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Welcome to VEX Tutor!',
      type: 'system',
      timestamp: new Date()
    },
    {
      id: '2',
      content: "Let's begin Lesson 1...",
      type: 'system',
      timestamp: new Date()
    }
  ]);
  
  const [input, setInput] = useState('/start');
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<Config>({
    style: 'Friendly',
    reasoning: 'Step-by-Step',
    depth: 'Intermediate',
    tone: 'Encouraging'
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced AI Tutor prompt based on Mr. Ranedeer
  const getSystemPrompt = () => {
    return `You are VEX AI Tutor, an advanced AI tutoring system inspired by Mr. Ranedeer. You are designed to provide personalized, adaptive learning experiences.

**PERSONALITY & APPROACH:**
- Style: ${config.style}
- Reasoning: ${config.reasoning}
- Depth: ${config.depth}
- Tone: ${config.tone}

**CORE CAPABILITIES:**
1. **Adaptive Teaching**: Adjust explanations based on student's level and learning style
2. **Command System**: Respond to specific commands like /start, /plan, /test, /config
3. **Personalized Learning**: Use the current configuration to tailor responses
4. **Multi-modal Explanations**: Use examples, analogies, and step-by-step breakdowns
5. **Assessment & Feedback**: Provide constructive feedback and generate practice questions

**TEACHING METHODOLOGY:**
- Use the ${config.reasoning} approach for explanations
- Maintain a ${config.tone} tone throughout interactions
- Adjust complexity to ${config.depth} level
- Apply ${config.style} communication style

**COMMAND RESPONSES:**
- /start: Initialize tutoring session with personalized greeting
- /plan: Create structured learning plans based on student needs
- /test: Generate assessments and practice questions
- /config: Show current personalization settings
- /help: Provide comprehensive command guide

**RESPONSE GUIDELINES:**
1. Always acknowledge the student's current level and adapt accordingly
2. Use clear, structured formatting with headers and bullet points
3. Provide examples and real-world applications when relevant
4. Encourage questions and active participation
5. Break complex topics into digestible chunks
6. Use emojis and formatting to enhance readability

**LEARNING ASSESSMENT:**
- Continuously gauge understanding through questions
- Provide immediate feedback on responses
- Suggest additional resources when appropriate
- Track progress and adjust difficulty accordingly

Remember: You are not just answering questions, you are facilitating learning through personalized, engaging, and effective teaching methods.`;
  };

  const handleCommand = (command: string): string => {
    const systemPrompt = getSystemPrompt();
    
    switch (command.toLowerCase()) {
      case '/start':
        return `🎓 **VEX AI Tutor System Activated**

Hello! I'm your personalized AI tutor, configured with your preferences:

**Current Settings:**
• **Style**: ${config.style} - I'll communicate in a warm, approachable manner
• **Reasoning**: ${config.reasoning} - I'll break down concepts systematically
• **Depth**: ${config.depth} - Content tailored to your level
• **Tone**: ${config.tone} - I'll maintain a supportive, motivating approach

**What I Can Help You With:**
📚 **Subject Tutoring** - Math, Science, History, Literature, and more
📋 **Learning Plans** - Structured pathways to master topics
📝 **Practice Tests** - Customized assessments to check understanding
🎯 **Skill Building** - Targeted exercises to strengthen weak areas

**Quick Commands:**
• \`/plan [subject]\` - Create a learning plan
• \`/test [topic]\` - Generate practice questions
• \`/config\` - View/modify settings
• \`/help\` - Full command reference

**Ready to Learn?**
What subject or topic would you like to explore today? I'll adapt my teaching style to match your preferences and help you achieve your learning goals!`;

      case '/plan':
        return `📋 **Personalized Learning Plan Generator**

I'll create a customized learning plan using your ${config.style} style and ${config.depth} level approach.

**To Create Your Plan, Please Provide:**

1. **📚 Subject/Topic**: What do you want to learn?
   - *Example: "Algebra", "World War II", "Python Programming"*

2. **🎯 Specific Goals**: What do you want to achieve?
   - *Example: "Solve quadratic equations", "Understand causes of WWI"*

3. **⏰ Time Commitment**: How much time can you dedicate?
   - *Example: "30 minutes daily", "2 hours on weekends"*

4. **📊 Current Level**: Where are you starting from?
   - *Beginner, Some Knowledge, Intermediate, Advanced*

5. **🎨 Learning Preferences**: How do you learn best?
   - *Visual diagrams, Step-by-step examples, Practice problems, Real-world applications*

**Sample Request:**
*"Create a plan for learning calculus. I'm a high school student with algebra knowledge. I have 1 hour daily and prefer visual explanations with lots of practice problems."*

Once you provide these details, I'll create a structured, week-by-week learning plan with specific milestones, resources, and practice activities tailored to your ${config.reasoning} reasoning preference!`;

      case '/test':
        return `📝 **Adaptive Test Generator**

I'll create personalized assessments using your ${config.depth} level and ${config.tone} approach.

**Test Configuration Options:**

**📚 Subject Areas:**
• Mathematics (Algebra, Geometry, Calculus, Statistics)
• Sciences (Physics, Chemistry, Biology, Earth Science)
• Languages (Grammar, Literature, Writing, Vocabulary)
• Social Studies (History, Geography, Civics, Economics)
• Technology (Programming, Digital Literacy, Computer Science)

**📊 Question Types:**
• **Multiple Choice** - Quick assessment with immediate feedback
• **Short Answer** - Brief explanations and problem-solving
• **Essay Questions** - In-depth analysis and critical thinking
• **Problem Solving** - Step-by-step mathematical/logical challenges
• **True/False** - Concept verification with explanations

**🎯 Difficulty Levels:**
• **Beginner** - Foundation concepts and basic applications
• **Intermediate** - Standard problems with moderate complexity
• **Advanced** - Challenging scenarios requiring deeper understanding
• **Expert** - Complex, multi-step problems with real-world applications

**Sample Test Request:**
*"Generate 10 intermediate-level multiple choice questions about photosynthesis with detailed explanations for each answer."*

**Features:**
✅ Instant feedback with explanations
✅ Progress tracking and performance analysis
✅ Adaptive difficulty based on your responses
✅ Detailed solution walkthroughs
✅ Recommendations for improvement areas

What type of test would you like me to create for you?`;

      case '/config':
        return `⚙️ **Current VEX Tutor Configuration**

\`\`\`json
{
  "personalSettings": {
    "style": "${config.style}",
    "reasoning": "${config.reasoning}",
    "depth": "${config.depth}",
    "tone": "${config.tone}"
  },
  "teachingApproach": {
    "adaptiveLevel": "Dynamic adjustment based on responses",
    "feedbackStyle": "Constructive and ${config.tone.toLowerCase()}",
    "explanationMethod": "${config.reasoning} methodology",
    "communicationStyle": "${config.style} and approachable"
  },
  "capabilities": [
    "Subject tutoring across multiple disciplines",
    "Personalized learning plan creation",
    "Adaptive assessment generation",
    "Real-time difficulty adjustment",
    "Progress tracking and analytics"
  ]
}
\`\`\`

**How These Settings Affect Your Learning:**

🎨 **Style (${config.style})**: Determines how I communicate and present information
🧠 **Reasoning (${config.reasoning})**: Shapes how I break down and explain concepts
📊 **Depth (${config.depth})**: Controls the complexity level of explanations and examples
💬 **Tone (${config.tone})**: Influences my motivational approach and feedback style

**To Modify Settings:**
Use the Personalization panel on the left to adjust any of these preferences. Changes take effect immediately and will influence all future interactions!`;

      case '/help':
        return `❓ **VEX AI Tutor - Complete Command Reference**

**🚀 Core Commands:**
• \`/start\` - Initialize personalized tutoring session
• \`/plan [subject]\` - Generate structured learning plans
• \`/test [topic]\` - Create practice assessments
• \`/config\` - View current personalization settings
• \`/help\` - Show this comprehensive guide

**🎓 Learning Commands:**
• \`/explain [concept]\` - Get detailed explanations
• \`/example [topic]\` - Request specific examples
• \`/practice [skill]\` - Generate practice problems
• \`/review [subject]\` - Quick review sessions
• \`/quiz [topic]\` - Short knowledge checks

**⚙️ Personalization Features:**
• **Style**: Friendly, Professional, Casual, Academic
• **Reasoning**: Step-by-Step, Conceptual, Problem-Based, Socratic
• **Depth**: Elementary, Intermediate, Advanced, Expert
• **Tone**: Encouraging, Neutral, Challenging, Supportive

**💡 Pro Tips:**
1. **Be Specific**: "Explain photosynthesis" vs "Explain biology"
2. **Set Context**: Mention your current level and goals
3. **Ask Follow-ups**: I encourage questions and clarifications
4. **Use Commands**: Commands unlock specialized features
5. **Adjust Settings**: Personalize your learning experience anytime

**🎯 Learning Strategies I Support:**
• Visual learning with diagrams and charts
• Kinesthetic learning with interactive examples
• Auditory learning with verbal explanations
• Reading/writing with structured notes and summaries

**Ready to Learn?**
Try starting with \`/start\` or ask me about any topic you'd like to explore!`;

      default:
        return `❌ **Unknown Command**: \`${command}\`

**Available Commands:**
• \`/start\` - Begin tutoring session
• \`/plan\` - Create learning plan
• \`/test\` - Generate practice test
• \`/config\` - View settings
• \`/help\` - Full command guide

Type \`/help\` for detailed information about all available commands and features.`;
    }
  };

  const simulateAIResponse = (userMessage: string): string => {
    if (userMessage.startsWith('/')) {
      return handleCommand(userMessage);
    }

    // Enhanced AI responses based on configuration
    const getPersonalizedResponse = (topic: string): string => {
      const basePrompt = getSystemPrompt();
      
      // Simulate different teaching approaches based on config
      if (config.reasoning === 'Step-by-Step') {
        return `**${config.style} ${config.tone} Response - ${config.depth} Level**

Let me break down "${topic}" using a step-by-step approach:

**Step 1: Foundation**
I'll start with the basic concepts you need to understand...

**Step 2: Building Up**
Now let's connect these ideas to create a deeper understanding...

**Step 3: Application**
Here's how you can apply this knowledge in real situations...

**Step 4: Practice**
Let's try some examples to reinforce your learning...

Would you like me to elaborate on any of these steps, or shall we move to practice questions?`;
      } else {
        return `**Exploring: ${topic}**

Based on your ${config.style} preference and ${config.depth} level, here's my ${config.tone} explanation:

This is a fascinating topic! Let me help you understand it in a way that matches your learning style. 

*[This would be a detailed, personalized explanation based on the actual topic and your configuration settings]*

**Key Points to Remember:**
• Concept 1: Fundamental principle
• Concept 2: Important application
• Concept 3: Real-world connection

**Next Steps:**
Would you like me to create a practice test, provide more examples, or explore a related topic?`;
      }
    };

    return getPersonalizedResponse(userMessage);
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      type: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: simulateAIResponse(userMessage.content),
        type: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatMessage = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded text-xs">$1</code>')
      .replace(/```json\n([\s\S]*?)\n```/g, '<pre class="bg-gray-100 p-3 rounded mt-2 overflow-x-auto text-xs"><code>$1</code></pre>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden" style={{ height: '600px' }}>
      <div className="flex h-full">
        {/* Left Sidebar - Personalization */}
        <div className="w-48 bg-gray-50 border-r border-gray-300 p-4">
          <h4 className="font-semibold mb-4 text-gray-900">Personalization</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
              <div className="relative">
                <select
                  value={config.style}
                  onChange={(e) => setConfig(prev => ({ ...prev, style: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded text-sm appearance-none bg-white pr-8"
                >
                  <option value="Friendly">Friendly</option>
                  <option value="Professional">Professional</option>
                  <option value="Casual">Casual</option>
                  <option value="Academic">Academic</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reasoning</label>
              <div className="relative">
                <select
                  value={config.reasoning}
                  onChange={(e) => setConfig(prev => ({ ...prev, reasoning: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded text-sm appearance-none bg-white pr-8"
                >
                  <option value="Step-by-Step">Step-by-Step</option>
                  <option value="Conceptual">Conceptual</option>
                  <option value="Problem-Based">Problem-Based</option>
                  <option value="Socratic">Socratic</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Depth</label>
              <div className="relative">
                <select
                  value={config.depth}
                  onChange={(e) => setConfig(prev => ({ ...prev, depth: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded text-sm appearance-none bg-white pr-8"
                >
                  <option value="Elementary">Elementary</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
              <div className="relative">
                <select
                  value={config.tone}
                  onChange={(e) => setConfig(prev => ({ ...prev, tone: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded text-sm appearance-none bg-white pr-8"
                >
                  <option value="Encouraging">Encouraging</option>
                  <option value="Neutral">Neutral</option>
                  <option value="Challenging">Challenging</option>
                  <option value="Supportive">Supportive</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-100">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className="flex justify-center">
                <div className="bg-white border border-gray-300 rounded px-4 py-2 max-w-md text-center">
                  <div 
                    className="text-gray-800 text-sm"
                    dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                  />
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-center">
                <div className="bg-white border border-gray-300 rounded px-4 py-2 max-w-md text-center">
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                    <span className="text-sm">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4">
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <select
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm appearance-none bg-white pr-8"
                >
                  <option value="/start">/start</option>
                  <option value="/plan">/plan</option>
                  <option value="/test">/test</option>
                  <option value="/config">/config</option>
                  <option value="/help">/help</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutorDemo;