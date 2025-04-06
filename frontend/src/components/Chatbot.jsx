import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const businessInfo = `
You are a helpful AI assistant that can answer general inquiries as well as business-related questions. 

If a user asks about cows, provide the following details:

🐄 **Cows - Overview**
Cows are domesticated herbivores that play a crucial role in agriculture, dairy, and cultural traditions. 

🌱 **Diet & Digestion**
- Cows eat grass, hay, silage, and grains.
- They have a unique four-compartment stomach and chew cud.

🍼 **Milk Production**
- Dairy cows produce large quantities of milk.
- Common breeds: Holstein, Jersey, Sahiwal (A2 milk).

🌍 **Cultural & Religious Significance**
- In Hinduism, cows are sacred and linked to Lord Krishna.
- Cow dung is used in fertilizers, biofuels, and rituals.

🔬 **Scientific Facts**
- Cows recognize faces and form friendships.
- They have 360-degree vision.
- They produce up to 30 liters of saliva daily.

🐮 **Fun Facts**
- Cows have best friends.
- The phrase "cash cow" comes from dairy farming.

### 🍼 **A2 Milk – A Healthier Alternative?**
A2 milk contains only the **A2 beta-casein protein**, making it easier to digest and a healthier choice.  
✅ **Benefits**:
- Easier digestion (less bloating & discomfort)
- Rich in **omega-3 fatty acids**
- Reduces **lactose intolerance symptoms**
- Found in **Indian cow breeds** like Gir, Sahiwal, and Red Sindhi.

---

### 🌱 **Uses & Benefits of Cow Dung**
Cow dung is an **eco-friendly resource** used in **agriculture, energy, and traditional practices**.  
✅ **Uses**:
- **Organic Fertilizer**: High in nitrogen & phosphorus.
- **Natural Pesticide**: Protects crops from insects.
- **Fuel Source**: Used in **biogas plants** for energy.
- **Building Material**: Used for **mud houses & bricks**.
- **Religious Uses**: Applied in **Hindu rituals & festivals**.

---

### 🕉️ **Why Are Cows Sacred in India?**
Cows are revered in **Hinduism and Indian culture**.  
🐄 **Spiritual Importance**:
- Represent **selfless giving & purity**.
- Associated with **Lord Krishna & Goddess Lakshmi**.
- Mentioned in **Vedic scriptures** as "Gau Mata" (Mother Cow).

🚫 **Legal & Cultural Aspects**:
- **Cow slaughter is banned** in many Indian states.
- **Go-shalas (cow shelters)** protect stray cows.
- **Cow products (milk, ghee, dung)** are used in rituals.

---

### 🐄 **Different Cow Breeds**
Cows are classified into **dairy, beef, and draft breeds**.  
🍼 **Dairy Breeds** (Best for milk production):
- **Indian Breeds**: Gir, Sahiwal, Red Sindhi, Rathi.
- **Foreign Breeds**: Holstein Friesian, Jersey.

🥩 **Beef Breeds**:
- Wagyu (Japan), Angus (Scotland), Hereford (UK).

🛠️ **Draft Breeds** (Used for labor work):
- Kangayam (India), Ongole (India), Texas Longhorn (USA).

---

### 🥛 **Cow Milk Production Facts**
Milk production varies by breed and care.  
✅ **Average Milk Per Day**:
- **Indian Cows**: 10-15 liters (Sahiwal, Gir).
- **Foreign Breeds**: 25-35 liters (Holstein Friesian, Jersey).

🌱 **Did You Know?**
India is the **largest milk producer** in the world!  
The highest recorded **daily milk yield** by a single cow is **110 liters**! 🐄💧
`;
const apiUrl = import.meta.env.VITE_API_URL;

const fetchAIResponse = async (prompt) => {
  try {
    const response = await fetch(`${apiUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        prompt: `${prompt}\n\nContext: ${businessInfo}` 
      })
    });
    return await response.json();
  } catch (err) {
    console.error("API Error:", err);
    return { error: "Failed to connect to backend" };
  }
};
// const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Gemini AI Setup
  // const genAI = new GoogleGenerativeAI(API_KEY);
  // const model = genAI.getGenerativeModel({
  //   model: "gemini-1.5-pro",
  //   systemInstruction: businessInfo,
  // });

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // const handleSend = async () => {
  //   if (!input.trim()) return;

  //   const userMessage = input.trim();
  //   setInput("");
  //   setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);

  //   try {
  //     setIsLoading(true);
  //     const chat = model.startChat({ history: [] });
  //     const result = await chat.sendMessageStream(userMessage);

  //     let response = "";
  //     for await (const chunk of result.stream) {
  //       response += chunk.text();
  //     }

  //     setMessages((prev) => [...prev, { text: response, isUser: false }]);
  //   } catch (error) {
  //     setMessages((prev) => [
  //       ...prev,
  //       {
  //         text: "The message could not be sent. Please try again.",
  //         isError: true,
  //       },
  //     ]);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleSend = async () => {
    if (!input.trim()) return;
  
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);
  
    try {
      setIsLoading(true);
      const { response, error } = await fetchAIResponse(userMessage);
      
      if (error) throw new Error(error);
      
      setMessages((prev) => [
        ...prev, 
        { text: response || "No response from server", isUser: false }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "The message could not be sent. Please try again.", isError: true }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button - Made smaller */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-16 h-16 bg-black rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow" // Changed from w-20 h-20
      >
        <img src="/chat-icon.png" alt="chat" className="w-10" />{" "}
        {/* Reduced from w-12 */}
      </button>

      {/* Chat Window - Reduced size */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-[400px] bg-white rounded-xl shadow-xl flex flex-col">
          {" "}
          {/* Changed from w-96 h-[600px] */}
          {/* Header */}
          <div className="bg-[#662929] rounded-t-xl p-2 flex justify-between items-center">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white px-3 py-1 text-sm hover:opacity-80" // Smaller padding and text
            >
              × Close
            </button>
          </div>
          {/* Messages container - adjusted padding */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {" "}
            {/* Reduced space-y */}
            {/* Initial message */}
            <div className="bg-gray-100 rounded-xl p-3 max-w-[90%] text-sm">
              {" "}
              {/* Smaller padding and text */}
              <p>Hi, how can I help you?</p>
            </div>
            {/* Messages - reduced padding and text size */}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-xl p-3 max-w-[90%] text-sm ${
                    msg.isUser
                      ? "bg-[#662929] text-white"
                      : msg.isError
                      ? "text-red-500 text-center"
                      : "bg-gray-100"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            {/* Loader - smaller */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-xl p-2 max-w-[80%] flex items-center">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          {/* Input Area - compact */}
          <div className="border-t p-2">
            {" "}
            {/* Reduced padding */}
            <div className="flex gap-1.5">
              {" "}
              {/* Reduced gap */}
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-100 rounded-full px-3 py-1.5 text-sm focus:outline-none" // Smaller padding and text
              />
              <button
                onClick={handleSend}
                className="w-8 h-8 bg-[#662929] rounded-full flex items-center justify-center hover:bg-[#884848] transition-colors" // Smaller button
              >
                <img src="/send-icon.png" alt="send" className="w-4" />{" "}
                {/* Smaller icon */}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
