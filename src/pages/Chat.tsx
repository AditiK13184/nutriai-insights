import { useState } from "react";
import { askGemini } from "@/lib/geminiChat";

interface Message {
  sender: "user" | "ai";
  text: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();

    // show user message immediately
    setMessages(prev => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    // get AI reply
    const aiReply = await askGemini(userMessage);

    setMessages(prev => [...prev, { sender: "ai", text: aiReply }]);

    setLoading(false);
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">NutriAI Chat</h1>

      {/* MESSAGES */}
      <div className="h-[400px] overflow-y-auto border rounded p-3 bg-white mb-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-md ${
              msg.sender === "user"
                ? "bg-blue-100 text-blue-900 self-end"
                : "bg-green-100 text-green-900"
            }`}
          >
            <strong>{msg.sender === "user" ? "You" : "NutriAI"}:</strong>{" "}
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="bg-gray-200 p-2 rounded-md text-gray-700">
            NutriAI is thinking…
          </div>
        )}
      </div>

      {/* INPUT + BUTTON */}
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border p-2 rounded"
          placeholder="Ask about food, calories, diet, etc…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
