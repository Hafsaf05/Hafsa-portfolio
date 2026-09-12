"use client";
import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { profile, skills, publications } from "@/lib/data";
import { useOSStore } from "@/store/window-store";
import type { WindowType } from "@/types";
const commands = [
  "help",
  "whoami",
  "about",
  "projects",
  "resume",
  "research",
  "contact",
  "stats",
  "skills",
  "publications",
  "certificates",
  "leetcode",
  "github",
  "linkedin",
  "clear",
];
export default function Terminal() {
  const open = useOSStore((s) => s.openWindow);
  const [lines, setLines] = useState([
    {
      type: "system",
      text: "Portfolio terminal ready. Type help for commands.\nThis is a local portfolio command interface.",
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [index, setIndex] = useState(-1);
  const log = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [lines]);
  const run = (value: string) => {
    const command = value.trim().toLowerCase();
    if (!command) return;
    setHistory((h) => [value, ...h]);
    setIndex(-1);
    setInput("");
    if (command === "clear") {
      setLines([]);
      return;
    }
    const apps: Record<string, WindowType> = {
      projects: "projects",
      resume: "resume",
      research: "papers",
      publications: "papers",
      certificates: "certificates",
      contact: "contact",
      stats: "stats",
      about: "stats",
    };
    let result = "";
    if (apps[command]) {
      open(apps[command]);
      result = `Opened ${command}.`;
    } else if (command === "help") result = commands.join(" · ");
    else if (command === "whoami")
      result = `${profile.name}\n${profile.title}\n${profile.degree} — ${profile.education}\n${profile.graduation}`;
    else if (command === "skills")
      result = skills
        .map((c) => `${c.label}\n${c.skills.join(", ")}`)
        .join("\n\n");
    else if (command === "leetcode")
      result =
        "100+ DSA problems solved: arrays, strings, linked lists, trees, graphs, recursion, and dynamic programming.";
    else if (command === "github" || command === "linkedin") {
      window.open(profile[command], "_blank", "noopener,noreferrer");
      result = `Opening ${command} in a new tab.`;
    } else
      result = `Unknown command “${value}”. Type help for available commands.`;
    setLines((l) => [
      ...l,
      { type: "user", text: `hafsa ~ $ ${value}` },
      { type: "response", text: result },
    ]);
  };
  const keys = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const i =
        e.key === "ArrowUp"
          ? Math.min(index + 1, history.length - 1)
          : Math.max(-1, index - 1);
      setIndex(i);
      setInput(history[i] || "");
    }
    if (e.key === "Tab" && !e.shiftKey && input.trim()) {
      const match = commands.find((c) => c.startsWith(input) && c !== input);
      if (match) {
        e.preventDefault();
        setInput(match);
      }
    }
  };
  return (
    <div className="terminal">
      <div className="terminal-header">PortfolioOS / Terminal</div>
      <div
        ref={log}
        className="terminal-history"
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
      >
        {lines.map((l, i) => (
          <div className={`terminal-line ${l.type}`} key={i}>
            {l.text}
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(input);
        }}
      >
        <span aria-hidden="true">$</span>
        <input
          aria-label="Terminal command"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={keys}
          placeholder="Enter a command…"
          autoComplete="off"
          spellCheck={false}
        />
        <button type="submit" className="button" disabled={!input.trim()}>
          Run
        </button>
      </form>
      <p className="terminal-hint">
        ↑ / ↓ history · Tab completes a partial command · Escape closes this
        window
      </p>
    </div>
  );
}
