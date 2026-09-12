"use client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowUpRight, ArrowRight, Cpu, Github } from "lucide-react";
import { useOSStore } from "@/store/window-store";
import { profile, projects } from "@/lib/data";
import Window from "./Window";
import Taskbar from "./Taskbar";
import DesktopIcons from "./DesktopIcons";
import AIAssistant from "../ai/AIAssistant";
const Background = dynamic(() => import("../3d/Background3D"), { ssr: false });
export default function Desktop() {
  const { windows, openWindow } = useOSStore();
  const activeId = useOSStore((s) => s.activeWindowId);
  const fullWindow = windows.find(
    (w) => w.id === activeId && w.isOpen && !w.isMinimized && w.isMaximized,
  );
  const shell = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (shell.current) shell.current.inert = Boolean(fullWindow);
    document.body.classList.toggle("window-fullscreen", Boolean(fullWindow));
    return () => document.body.classList.remove("window-fullscreen");
  }, [fullWindow]);
  useEffect(() => {
    if (!activeId)
      document
        .querySelector<HTMLButtonElement>(".desktop-nav button")
        ?.focus({ preventScroll: true });
  }, [activeId]);
  const [effects, setEffects] = useState(false);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEffects(!media.matches && innerWidth > 767);
    sync();
    media.addEventListener("change", sync);
    addEventListener("resize", sync);
    return () => {
      media.removeEventListener("change", sync);
      removeEventListener("resize", sync);
    };
  }, []);
  return (
    <div className="os-desktop">
      <div className="ambient" aria-hidden="true">
        {effects && <Background />}
      </div>
      <div
        ref={shell}
        className="desktop-shell"
        aria-hidden={fullWindow ? true : undefined}
      >
        <header className="topbar">
          <a href="#home" className="brand">
            <Cpu size={23} />
            <span>
              HAFSA<span className="muted"> / OS</span>
            </span>
          </a>
          <span className="topbar-center">AI MISSION CONTROL</span>
          <button className="top-contact" onClick={() => openWindow("contact")}>
            Let’s connect <ArrowUpRight size={16} />
          </button>
        </header>
        <div className="desktop-home" id="home">
          <DesktopIcons />
          <div className="home-content">
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="intro"
            >
              <p className="eyebrow">Portfolio / AI & Machine Learning</p>
              <h1>
                Hafsa
                <br />
                <span>Fathima.</span>
              </h1>
              <p className="intro-title">{profile.title}</p>
              <p className="intro-description">
                Exploring intelligence.
                <br />
                Building systems that put it to work.
              </p>
              <div className="hero-actions">
                <button
                  className="button"
                  onClick={() => openWindow("projects")}
                >
                  Explore my work <ArrowRight size={17} />
                </button>
                <button
                  className="button secondary"
                  onClick={() => openWindow("resume")}
                >
                  View resume
                </button>
                <a
                  className="download-link"
                  href="/resume/Hafsa_Fathima_Resume.pdf"
                  download
                >
                  Download resume PDF
                </a>
              </div>
              <div className="intro-footer">
                <span>B.Tech · Expected 2027</span>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={16} /> GitHub <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.section>
            <motion.section
              className="mission-panel"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
            >
              <div className="panel-heading">
                <span className="eyebrow">Selected systems</span>
                <span className="muted">01 — 04</span>
              </div>
              {projects.slice(0, 4).map((p, i) => (
                <button
                  className="system-row"
                  key={p.id}
                  onClick={() => {
                    useOSStore.getState().selectProject(p.id);
                    openWindow("projects");
                  }}
                >
                  <span className="system-index">0{i + 1}</span>
                  <span>
                    <strong>{p.title}</strong>
                    <small>{p.subtitle}</small>
                  </span>
                  <ArrowUpRight size={19} />
                </button>
              ))}
              <div className="panel-footer">
                <button onClick={() => openWindow("papers")}>
                  <strong>02</strong>
                  <span>Published papers</span>
                </button>
                <button onClick={() => openWindow("stats")}>
                  <strong>100+</strong>
                  <span>DSA problems solved</span>
                </button>
              </div>
            </motion.section>
            <div className="home-bottom">
              <span>Multi-agent systems / Explainable AI / RAG</span>
              <span>Designed to explore. Built to learn.</span>
            </div>
          </div>
        </div>
      </div>
      <div className="windows-layer">
        <AnimatePresence>
          {windows
            .filter((w) => w.isOpen)
            .map((w) => (
              <Window
                key={w.id}
                data={w}
                blocked={Boolean(fullWindow) && w.id !== fullWindow?.id}
              />
            ))}
        </AnimatePresence>
      </div>
      {!fullWindow && (
        <>
          <AIAssistant />
          <Taskbar />
        </>
      )}
    </div>
  );
}
