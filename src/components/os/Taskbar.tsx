"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useOSStore } from '@/store/window-store';
import { WindowType } from '@/types';
import {
  LayoutGrid, Folder, Terminal, Activity, Mail, Network, BookOpen,
  FileText, X, Cpu, Info, Github, Linkedin, Globe,
} from 'lucide-react';

// ─── Start Menu ───────────────────────────────────────────────────────────────
const START_APPS = [
  { id: 'projects',  label: 'Project Explorer', icon: Folder,   color: '#00f2ff' },
  { id: 'research',  label: 'Skills Graph',      icon: Network,  color: '#a855f7' },
  { id: 'papers',    label: 'Research Papers',   icon: BookOpen, color: '#a855f7' },
  { id: 'resume',    label: 'Resume Viewer',     icon: FileText, color: '#10b981' },
  { id: 'terminal',  label: 'AI Terminal',       icon: Terminal, color: '#00f2ff' },
  { id: 'stats',     label: 'System Metrics',    icon: Activity, color: '#f59e0b' },
  { id: 'contact',   label: 'Contact',           icon: Mail,     color: '#ec4899' },
] as const;

interface StartMenuProps {
  onClose: () => void;
  onOpen: (id: WindowType) => void;
}

function StartMenu({ onClose, onOpen }: StartMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute bottom-14 left-2 z-[999] w-72 rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl overflow-hidden"
      style={{ boxShadow: '0 0 40px rgba(0,242,255,0.08), 0 8px 40px rgba(0,0,0,0.6)' }}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
        <div>
          <p className="text-xs font-mono text-neon-blue tracking-widest uppercase">Hafsa OS</p>
          <p className="text-[10px] text-white/30 font-mono mt-0.5">v0.1.0 · AI_PORTFOLIO_SYSTEM</p>
        </div>
        <button onClick={onClose} className="text-white/20 hover:text-white/60 transition-colors">
          <X size={12} />
        </button>
      </div>

      {/* Apps grid */}
      <div className="p-3 grid grid-cols-2 gap-1.5">
        {START_APPS.map(({ id, label, icon: Icon, color }) => (
          <button
            key={id}
            onClick={() => { onOpen(id as WindowType); onClose(); }}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-white/8 border border-transparent hover:border-white/10 transition-all duration-200 text-left group"
          >
            <Icon size={16} style={{ color }} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-mono text-white/70 group-hover:text-white transition-colors">{label}</span>
          </button>
        ))}
      </div>

      {/* Footer links */}
      <div className="px-4 py-2.5 border-t border-white/5 flex items-center gap-3">
        <a href="https://github.com/Hafsaf05" target="_blank" rel="noreferrer" className="text-white/30 hover:text-white/70 transition-colors">
          <Github size={14} />
        </a>
        <a href="https://linkedin.com/in/hafsa-fathima05" target="_blank" rel="noreferrer" className="text-white/30 hover:text-white/70 transition-colors">
          <Linkedin size={14} />
        </a>
        <span className="ml-auto text-[10px] font-mono text-white/20">hafsahffathima05@gmail.com</span>
      </div>
    </div>
  );
}

// ─── Main Taskbar ─────────────────────────────────────────────────────────────
const Taskbar: React.FC = () => {
  const { windows, openWindow, activeWindowId, focusWindow, minimizeWindow } = useOSStore();
  const [startOpen, setStartOpen] = useState(false);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  // Live clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setDate(now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const getIcon = (id: WindowType) => {
    switch (id) {
      case 'projects': return <Folder size={15} />;
      case 'terminal': return <Terminal size={15} />;
      case 'stats':    return <Activity size={15} />;
      case 'research': return <Network size={15} />;
      case 'papers':   return <BookOpen size={15} />;
      case 'contact':  return <Mail size={15} />;
      case 'resume':   return <FileText size={15} />;
      default:         return <Folder size={15} />;
    }
  };

  const handleTaskbarClick = (window: typeof windows[0]) => {
    if (!window.isOpen) {
      openWindow(window.id);
    } else if (window.isMinimized) {
      focusWindow(window.id);
    } else if (activeWindowId === window.id) {
      minimizeWindow(window.id);
    } else {
      focusWindow(window.id);
    }
  };

  const openWindows = windows.filter(w => w.isOpen);

  return (
    <>
      {startOpen && <StartMenu onClose={() => setStartOpen(false)} onOpen={openWindow} />}

      <div className="h-12 w-full glass-panel border-t border-white/10 flex items-center px-3 gap-2 select-none">

        {/* ── Start Button */}
        <button
          onClick={() => setStartOpen(p => !p)}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 flex-shrink-0
            ${startOpen
              ? 'bg-neon-blue/20 border border-neon-blue/50 text-neon-blue'
              : 'hover:bg-white/8 border border-transparent hover:border-white/10 text-white/60 hover:text-white'
            }
          `}
        >
          <Cpu size={16} className={startOpen ? 'text-neon-blue' : ''} />
          <span className="text-[10px] font-mono tracking-widest uppercase hidden sm:block">Hafsa OS</span>
        </button>

        <div className="h-6 w-px bg-white/10 mx-1 flex-shrink-0" />

        {/* ── Open window pills */}
        <div className="flex-1 flex items-center gap-1.5 overflow-x-auto min-w-0" style={{ scrollbarWidth: 'none' }}>
          {openWindows.map((win) => {
            const isActive = activeWindowId === win.id && !win.isMinimized;
            return (
              <button
                key={win.id}
                onClick={() => handleTaskbarClick(win)}
                title={win.title}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-200 whitespace-nowrap flex-shrink-0
                  ${isActive
                    ? 'bg-neon-blue/15 border border-neon-blue/40 text-neon-blue'
                    : win.isMinimized
                      ? 'bg-white/5 border border-white/8 text-white/40 hover:text-white/70 hover:bg-white/8'
                      : 'bg-white/8 border border-white/10 text-white/70 hover:text-white hover:bg-white/12'
                  }
                `}
              >
                {getIcon(win.id)}
                <span className="text-[11px] font-mono hidden md:block">
                  {win.title.replace(/\.(exe|sys|pdf)$/i, '')}
                </span>
                {/* Active indicator dot */}
                {isActive && <span className="w-1 h-1 rounded-full bg-neon-blue ml-0.5" />}
                {win.isMinimized && <span className="w-1 h-1 rounded-full bg-white/20 ml-0.5" />}
              </button>
            );
          })}
          {openWindows.length === 0 && (
            <span className="text-[10px] font-mono text-white/20 px-2">No open windows</span>
          )}
        </div>

        <div className="h-6 w-px bg-white/10 mx-1 flex-shrink-0" />

        {/* ── System tray */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-mono text-neon-blue leading-tight">SYSTEM_ACTIVE</span>
            <span className="text-[9px] font-mono text-white/30 leading-tight">STABLE_0.1.0</span>
          </div>
          <div className="text-right">
            <div className="text-[11px] font-mono text-white/70 leading-tight tabular-nums">{time}</div>
            <div className="text-[9px] font-mono text-white/30 leading-tight">{date}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Taskbar;
