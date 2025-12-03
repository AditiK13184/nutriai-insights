import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Sparkles } from "lucide-react";
import ChatMessage from "./ChatMessage";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const NutriChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! I'm NutriAI, your personal nutrition assistant. 🥗 Ask me anything about diet, nutrition, healthy recipes, or meal planning. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulated AI response - will be replaced with actual API call
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getSimulatedResponse(input),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const getSimulatedResponse = (question: string): string => {
    const lowerQ = question.toLowerCase();
    
    if (lowerQ.includes("calorie") || lowerQ.includes("calories")) {
      return "Calorie needs vary based on your age, gender, weight, height, and activity level. Based on your profile, I'd recommend around 2000-2200 calories daily for your goals. Would you like me to break down the macronutrients?";
    }
    if (lowerQ.includes("protein")) {
      return "Great question! For your fitness goals, I recommend consuming 0.8-1g of protein per pound of body weight. Good sources include lean meats, fish, eggs, legumes, and Greek yogurt. Shall I suggest some high-protein meal ideas?";
    }
    if (lowerQ.includes("breakfast") || lowerQ.includes("morning")) {
      return "A nutritious breakfast sets the tone for your day! Try:\n\n• Greek yogurt parfait with berries and granola\n• Avocado toast with poached eggs\n• Overnight oats with chia seeds\n• Smoothie bowl with spinach, banana, and protein\n\nWant detailed recipes for any of these?";
    }
    if (lowerQ.includes("lose weight") || lowerQ.includes("weight loss")) {
      return "For healthy weight loss, focus on:\n\n1. A moderate calorie deficit (300-500 cal/day)\n2. High protein intake to preserve muscle\n3. Fiber-rich foods for satiety\n4. Regular physical activity\n5. Adequate sleep and hydration\n\nWould you like a personalized meal plan?";
    }
    
    return "That's a great question! Based on your health profile, I can provide personalized advice. To give you the most accurate recommendations, could you share more details about your specific goals or dietary preferences?";
  };

  const quickPrompts = [
    "What should I eat for breakfast?",
    "How much protein do I need?",
    "Tips for losing weight",
  ];

  return (
    <Card className="h-full flex flex-col border-border/50">
      <CardHeader className="pb-3 flex-shrink-0">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bot className="h-5 w-5 text-primary" />
          NutriAI Chat
          <span className="ml-auto flex items-center gap-1 text-xs font-normal text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            Powered by AI
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0 min-h-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} role={message.role} content={message.content} />
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompts */}
        {messages.length === 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => setInput(prompt)}
                className="text-xs px-3 py-1.5 rounded-full bg-sage-light/50 text-primary hover:bg-sage-light transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-border flex-shrink-0">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about nutrition, diet, or recipes..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" variant="sage" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutriChat;
