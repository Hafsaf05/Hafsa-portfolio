"use client";

import React from 'react';
import { useOSStore } from '@/store/window-store';
import { WindowType } from '@/types';
import { LayoutGrid, Folder, Terminal, Activity, Info, Mail } from 'lucide-react';

const Taskbar: React.FC = () => {
  const { windows, openWindow, activeWindowId, focusWindow } = useOSStore();

  const getIcon = (id: WindowType) => {
    switch (id) {
      case 'projects': return <Folder size={20} />;
      case 'terminal': return <Terminal size={20} />;
      case 'stats': return <Activity size={20} />;
      case 'research': return <Info size={20} />;
      case 'contact': return <Mail size={20} />;
      default: return <Folder size={20} />;
    }
  };

  return (
    <div className="h-12 w-full glass-panel border-t border-white/10 flex items-center px-4 gap-4">
      {/* Mission Control Button */}
      <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-neon-blue">
        <LayoutGrid size={24} />
      </button>

      <div className="h-6 w-[1px] bg-white/10 mx-2" />

      {/* Taskbar Items */}
      <div className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {windows.map((window) => (
          <button
            key={window.id}
            onClick={() => {
              if (window.isOpen) {
                focusWindow(window.id);
              } else {
                openWindow(window.id);
              }
            }}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-300
              ${window.isOpen ? 'bg-white/10 border border-white/10' : 'opacity-50 hover:opacity-100 hover:bg-white/5'}
              ${activeWindowId === window.id ? 'border-neon-blue/50 text-neon-blue' : 'text-white/70'}
            `}
          >
            {getIcon(window.id)}
            <span className="text-xs font-mono whitespace-nowrap hidden md:block">
              {window.title.replace('.exe', '').replace('.sys', '')}
            </span>
          </button>
        ))}
      </div>

      <div className="h-6 w-[1px] bg-white/10 mx-2" />

      {/* System Clock / Status */}
      <div className="flex items-center gap-4 text-[10px] font-mono text-white/50">
        <div className="flex flex-col items-end">
          <span className="text-neon-blue">SYSTEM_ACTIVE</span>
          <span>STABLE_0.1.0</span>
        </div>
        <div className="text-right">
          <div>{new Date().toLocaleTimeString()}</div>
          <div>{new Date().toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
