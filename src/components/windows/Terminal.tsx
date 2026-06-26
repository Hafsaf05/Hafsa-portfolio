"use client";

import React, {
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
} from "react";

import { motion } from "framer-motion";
import { useOSStore } from "@/store/window-store";

type Line = {
  type: "system" | "user" | "response";
  text: string;
};

const bootSequence = [
  "Initializing PortfolioOS Kernel v2.0...",
  "Loading AI Modules......................OK",
  "Loading Project Database...............OK",
  "Loading Publications...................OK",
  "Loading Recruiter Toolkit..............OK",
  "Loading Resume.pdf.....................OK",
  "Loading Contact.exe....................OK",
  "",
  "PortfolioOS Ready.",
  'Type "help" to begin.',
];

const Terminal: React.FC = () => {
  const { openWindow } = useOSStore();

  const [bootComplete, setBootComplete] = useState(false);
  const [history, setHistory] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /*
  ----------------------------------
  AUTO SCROLL
  ----------------------------------
  */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [history]);

  /*
  ----------------------------------
  AUTO FOCUS
  ----------------------------------
  */

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /*
  ----------------------------------
  BOOT SEQUENCE
  ----------------------------------
  */

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setHistory((prev) => [
        ...prev,
        {
          type: "system",
          text: bootSequence[i],
        },
      ]);

      i++;

      if (i >= bootSequence.length) {
        clearInterval(interval);

        setTimeout(() => {
          setBootComplete(true);
        }, 300);
      }
    }, 220);

    return () => clearInterval(interval);
  }, []);

  /*
  ----------------------------------
  COMMAND PLACEHOLDER
  (Implemented in Part 2)
  ----------------------------------
  */

  const executeCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();

    switch (cmd) {
      case "help":
        setHistory((prev) => [
          ...prev,
          {
            type: "response",
            text: `
Available Commands

whoami
about
projects
resume
research
contact
stats
skills
publications
leetcode
github
linkedin
clear
help
            `.trim(),
          },
        ]);
        break;

      case "whoami":
      case "about":
        setHistory((prev) => [
          ...prev,
          {
            type: "response",
            text: `
Hafsa Fathima

AI & ML Undergraduate

Specializing in:
• Agentic AI
• LLM Systems
• Machine Learning
• Software Engineering
• Computer Vision
• Deep Learning
            `.trim(),
          },
        ]);
        break;

      case "projects":
        openWindow("projects");
        setHistory((prev) => [
          ...prev,
          {
            type: "response",
            text: "Launching Project Explorer...",
          },
        ]);
        break;

      case "resume":
        openWindow("resume");
        setHistory((prev) => [
          ...prev,
          {
            type: "response",
            text: "Opening Resume.pdf...",
          },
        ]);
        break;

      case "research":
        openWindow("research");
        setHistory((prev) => [
          ...prev,
          {
            type: "response",
            text: "Opening Research Publications...",
          },
        ]);
        break;

      case "contact":
        openWindow("contact");
        setHistory((prev) => [
          ...prev,
          {
            type: "response",
            text: "Opening Contact.exe...",
          },
        ]);
        break;

      case "stats":
        openWindow("stats");
        setHistory((prev) => [
          ...prev,
          {
            type: "response",
            text: "Loading Portfolio Metrics...",
          },
        ]);
        break;

      case "skills":
        setHistory((prev) => [
          ...prev,
          {
            type: "response",
            text: `
Technical Skills

Languages
• Python
• Java
• JavaScript
• SQL
• C

AI / ML
• LangChain
• LangGraph
• PyTorch
• TensorFlow
• OpenCV
• XGBoost
• Scikit-Learn

Frameworks

• FastAPI
• React
• Next.js
• Node.js
            `.trim(),
          },
        ]);
        break;

      case "publications":
        setHistory((prev) => [
          ...prev,
          {
            type: "response",
            text: `
Research Publications

1. Car Price Prediction Using Machine Learning

2. Future Proofing Real Estate:
Machine Learning for Price Predictions

Use:

research

to open the publication window.
            `.trim(),
          },
        ]);
        break;

      case "leetcode":
        setHistory((prev) => [
          ...prev,
          {
            type: "response",
            text: `
LeetCode Progress

40+ Problems Solved

Topics

• Arrays
• Strings
• Trees
• Graphs
• Recursion
• Dynamic Programming
            `.trim(),
          },
        ]);
        break;

      case "github":
        window.open(
          "https://github.com/Hafsaf05",
          "_blank"
        );
        setHistory((prev) => [
          ...prev,
          {
            type: "response",
            text: "Opening GitHub...",
          },
        ]);
        break;

      case "linkedin":
        window.open(
          "https://linkedin.com/in/hafsa-fathima05",
          "_blank"
        );
        setHistory((prev) => [
          ...prev,
          {
            type: "response",
            text: "Opening LinkedIn...",
          },
        ]);
        break;

      case "clear":
        setHistory([]);
        break;

      default:
        setHistory((prev) => [
          ...prev,
          {
            type: "response",
            text: `Unknown command "${command}"

Type "help" to see all available commands.`,
          },
        ]);
    }
  };

  /*
  ----------------------------------
  SUBMIT
  ----------------------------------
  */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!bootComplete) return;
    if (!input.trim()) return;

    const cmd = input.trim();

    setHistory((prev) => [
      ...prev,
      {
        type: "user",
        text: cmd,
      },
    ]);

    setCommandHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);

    executeCommand(cmd);

    setInput("");
  };

  /*
  ----------------------------------
  KEYBOARD
  (History + autocomplete in Part 3)
  ----------------------------------
  */

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {};

  return (
    <div className="h-full flex flex-col bg-[#070707] rounded-lg border border-white/10 overflow-hidden">
      {/* HEADER */}
      <div className="border-b border-white/10 bg-black/40 px-4 py-2 flex justify-between">
        <span className="text-xs font-mono text-neon-blue">
          PortfolioOS Terminal
        </span>
        <span className="text-xs text-white/40">v2.0</span>
      </div>

      {/* TERMINAL */}
      <div className="flex-1 overflow-auto custom-scrollbar p-4 font-mono text-sm">
        {history.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2"
          >
            {line.type === "system" && (
              <div className="text-neon-blue">{line.text}</div>
            )}

            {line.type === "user" && (
              <div className="text-neon-green">
                root@hafsa-ai:~$ {line.text}
              </div>
            )}

            {line.type === "response" && (
              <div className="text-white/80">{line.text}</div>
            )}
          </motion.div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-white/10 px-4 py-3"
      >
        <div className="flex items-center gap-2">
          <span className="text-neon-green whitespace-nowrap">
            root@hafsa-ai:~$
          </span>

          <input
            ref={inputRef}
            disabled={!bootComplete}
            spellCheck={false}
            value={input}
            onKeyDown={handleKeyDown}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              bootComplete ? "Enter command..." : "Booting..."
            }
            className="flex-1 bg-transparent outline-none text-white caret-neon-green placeholder:text-white/20"
          />

          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
            }}
            className="w-2 h-5 bg-neon-green"
          />
        </div>
      </form>
    </div>
  );
};

export default Terminal;