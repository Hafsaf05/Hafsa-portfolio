"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Bot,
  Send,
  X,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const portfolioResponses = [
  {
    keywords: ["reflxai", "agent", "multi agent"],
    response:
      "ReflxAI-Advanced is Hafsa's flagship project. It uses LangGraph and multiple AI agents to generate, review, test, secure, and improve code autonomously."
  },
  {
    keywords: ["askduo", "rag", "retrieval"],
    response:
      "AskDuo is a Retrieval-Augmented Generation system that retrieves information from documents using semantic search and generates source-grounded responses."
  },
  {
    keywords: ["log", "debug", "ai log analyzer"],
    response:
      "AI Log Analyzer automatically analyzes logs, identifies root causes, categorizes failures, and generates troubleshooting suggestions using LLM workflows."
  },
  {
    keywords: ["research", "paper", "publication"],
    response:
      "Hafsa has co-authored 2 machine learning research publications focusing on predictive analytics and machine learning applications."
  },
  {
    keywords: ["leetcode", "dsa"],
    response:
      "Hafsa has solved 40+ LeetCode problems covering arrays, trees, graphs, recursion, and dynamic programming."
  },
  {
    keywords: ["gesture", "car"],
    response:
      "The Gesture Controlled Car uses OpenCV and MediaPipe to detect hand gestures and control a robotic vehicle in real time."
  },
  {
    keywords: ["house price", "xgboost"],
    response:
      "House Price Prediction uses XGBoost and feature engineering techniques to estimate California housing prices with strong predictive performance."
  },
  {
    keywords: ["hire", "resume", "recruit"],
    response:
      "Hafsa is an AIML undergraduate focused on Agentic AI, LLM Systems, Machine Learning, Software Engineering, and AI product development with research publications and multiple deployed projects."
  }
];

const starterPrompts = [
  "Tell me about ReflxAI",
  "Show research publications",
  "Why hire Hafsa?",
  "Explain AskDuo",
  "LeetCode progress"
];

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Hafsa's Portfolio Copilot. Ask me about projects, research publications, AI experience, hackathons, skills, or career interests."
    }
  ]);

  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);

  const processMessage = (query: string) => {
    const lower = query.toLowerCase();

    const match = portfolioResponses.find((item) =>
      item.keywords.some((keyword) =>
        lower.includes(keyword)
      )
    );

    return (
      match?.response ||
      "I can answer questions about Hafsa's projects, publications, skills, hackathons, LeetCode progress, and technical experience."
    );
  };

  const sendMessage = (message: string) => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: message
      }
    ]);

    setInput("");

    setTimeout(() => {
      const response = processMessage(message);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response
        }
      ]);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed bottom-20 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 20
            }}
            className="
              w-96
              h-[550px]
              glass-panel
              rounded-2xl
              flex
              flex-col
              overflow-hidden
              border
              border-neon-blue/30
              shadow-2xl
            "
          >
            {/* Header */}

            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-neon-blue/10">
              <div className="flex items-center gap-2 text-neon-blue">
                <Bot size={20} />

                <span className="text-xs font-mono font-bold uppercase tracking-widest">
                  PORTFOLIO_COPILOT
                </span>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}

            <div className="flex-1 overflow-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`
                      max-w-[85%]
                      p-3
                      rounded-xl
                      text-xs
                      leading-relaxed
                      ${
                        msg.role === "user"
                          ? "bg-neon-blue/20 text-neon-blue border border-neon-blue/30"
                          : "bg-white/5 text-white/80 border border-white/10"
                      }
                    `}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Starter prompts */}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2">
                  {starterPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="
                        px-3
                        py-2
                        text-[10px]
                        rounded-full
                        border
                        border-white/10
                        bg-white/5
                        text-white/60
                        hover:bg-white/10
                        transition
                      "
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}

            <form
              onSubmit={handleSubmit}
              className="
                p-3
                border-t
                border-white/10
                bg-black/20
                flex
                gap-2
              "
            >
              <input
                type="text"
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                placeholder="Ask about projects..."
                className="
                  flex-1
                  bg-transparent
                  text-sm
                  text-white/80
                  placeholder:text-white/30
                  outline-none
                "
              />

              <button
                type="submit"
                className="
                  text-neon-blue
                  hover:scale-110
                  transition-transform
                "
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-14
          h-14
          rounded-full
          glass-panel
          flex
          items-center
          justify-center
          text-neon-blue
          border
          border-neon-blue/40
          shadow-lg
        "
      >
        <MessageSquare size={24} />
      </motion.button>
    </div>
  );
};

export default AIAssistant;
