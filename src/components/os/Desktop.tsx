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

  return (
    <div className="os-desktop">
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0">
        <Background3D />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 futuristic-grid-bg opacity-20 pointer-events-none z-[1]" />

      {/* Desktop Icons */}
      <DesktopIcons />

      <DesktopControls />

      {/* Windows Layer */}
      <div className="relative z-10 w-full h-full p-4">
        {windows
          .filter((window) => window.isOpen && !window.isMinimized)
          .map((window) => (
            <Window
              key={window.id}
              data={window}
            />
          ))}
      </div>

      {/* AI Portfolio Copilot */}
      <AIAssistant />

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 z-50">
        <Taskbar />
      </div>
    </div>
  );
};

export default Desktop;
