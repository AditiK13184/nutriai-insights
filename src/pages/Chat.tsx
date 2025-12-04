import { useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: input }] }],
        }),
      }
    );

    const data = await res.json();
    const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    setMessages((prev) => [...prev, { role: "bot", text: botText }]);
    setInput("");
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold mb-4">NutriAI Chat</h1>

      <div className="border rounded-xl p-4 h-[400px] overflow-y-auto flex flex-col gap-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl ${
              m.role === "user" ? "bg-primary/20 self-end" : "bg-muted"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          className="border p-2 rounded-xl flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button
          onClick={sendMessage}
          className="bg-primary text-white px-4 rounded-xl"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
