"use client";

import React from "react";
import { useOSStore } from "@/store/window-store";

import Window from "./Window";
import Taskbar from "./Taskbar";
import DesktopIcons from "./DesktopIcons";

import Background3D from "../3d/Background3D";
import AIAssistant from "../ai/AIAssistant";

import DesktopControls from "./DesktopControls";

const Desktop: React.FC = () => {
  const { windows } = useOSStore();
  const maximizedWindow = windows.find(
    (w) => w.isOpen && !w.isMinimized && w.isMaximized
  );

  // Always render all open+non-minimized windows so the minimize button inside
  // a maximized window still works (the window stays mounted).
  const visibleWindows = windows
    .filter((w) => w.isOpen && !w.isMinimized)
    .sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div className="os-desktop">
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0">
        <Background3D />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 futuristic-grid-bg opacity-20 pointer-events-none z-[1]" />

      {/* Desktop Icons — hide when any window is maximized */}
      {!maximizedWindow && <DesktopIcons />}

      {/* DesktopControls toolbar shown only when a window is maximized */}
      {maximizedWindow && <DesktopControls />}

      {/* Windows Layer — always render all visible windows */}
      <div className={`relative z-10 w-full h-full ${maximizedWindow ? "" : "p-4"}`}>
        {visibleWindows.map((window) => (
          <Window key={window.id} data={window} />
        ))}
      </div>

      {/* AI Portfolio Copilot */}
      {maximizedWindow && <AIAssistant />}

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 z-50">
        <Taskbar />
      </div>
    </div>
  );
};

export default Desktop;