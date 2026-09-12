"use client";

import React, { useEffect, useRef, useState } from "react";
import { Bot, Send, X, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import {
  projects,
  profile,
  skills,
  publications,
  achievements,
  hackathons,
  leadership,
} from "@/lib/data";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const portfolioResponses = [
  ...projects.map((p) => ({
    keywords: [p.title.toLowerCase(), p.id],
    response: p.title + ": " + p.description + " " + p.highlights.join(" "),
  })),
  {
    keywords: ["research", "paper", "publication"],
    response: publications
      .map((p) => p.title + " — " + p.journal + " (" + p.year + ")")
      .join("\n"),
  },
  {
    keywords: ["leetcode", "dsa", "achievement"],
    response: achievements.join(" "),
  },
  {
    keywords: ["skill", "tool", "language"],
    response: skills
      .map((s) => s.label + ": " + s.skills.join(", "))
      .join("\n"),
  },
  { keywords: ["hackathon", "competition"], response: hackathons.join(" ") },
  { keywords: ["leadership", "organizer"], response: leadership.join(" ") },
  {
    keywords: ["education", "college", "graduate", "hire", "resume", "recruit"],
    response:
      profile.name +
      " is an " +
      profile.title +
      ". " +
      profile.degree +
      " — " +
      profile.education +
      ", " +
      profile.graduation +
      ".",
  },
  { keywords: ["contact", "email"], response: profile.email },
];

const starterPrompts = [
  "Tell me about ReflxAI",
  "Show research publications",
  "Why hire Hafsa?",
  "Explain AskDuo",
  "LeetCode progress",
];

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Hafsa's Portfolio Copilot. Ask me about projects, research publications, hackathons, or skills. I use curated portfolio answers, not a live AI model.",
    },
  ]);

  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const processMessage = (query: string) => {
    const lower = query.toLowerCase();

    const match = portfolioResponses.find((item) =>
      item.keywords.some((keyword) => lower.includes(keyword)),
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
        content: message,
      },
    ]);

    setInput("");

    {
      const response = processMessage(message);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response,
        },
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="copilot">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            className="
              copilot-panel
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

                <span className="text-sm font-mono font-bold uppercase tracking-widest">
                  PORTFOLIO_COPILOT
                </span>
              </div>

              <button
                aria-label="Close copilot"
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}

            <div
              role="log"
              aria-live="polite"
              aria-label="Copilot conversation"
              className="flex-1 overflow-auto p-4 space-y-4 custom-scrollbar"
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`
                      max-w-[85%] whitespace-pre-wrap
                      p-3
                      rounded-xl
                      text-sm
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
                        text-xs
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
                aria-label="Ask about Hafsa"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
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
                disabled={!input.trim()}
                aria-label="Send message"
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
        aria-label="Toggle portfolio copilot"
        aria-expanded={isOpen}
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
