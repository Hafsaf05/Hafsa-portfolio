"use client";

import React from "react";
import { motion, PanInfo, useDragControls } from "framer-motion";
import { useOSStore } from "@/store/window-store";
import { WindowState } from "@/types";
import ResumeViewer from "../windows/ResumeViewer";
import Contact from "../windows/Contact";
import ResearchPublications from "../windows/ResearchPublications";
import { X, Minus, Square, Maximize2 } from "lucide-react";
import Stats from "../dashboard/Stats";
import SkillConstellation from "../3d/SkillConstellation";
import ProjectExplorer from "../windows/ProjectExplorer";
import Terminal from "../windows/Terminal";

interface WindowProps {
  data: WindowState;
}

const Window: React.FC<WindowProps> = ({ data }) => {
  const {
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    updatePosition,
  } = useOSStore();

  const dragControls = useDragControls();

  const renderContent = () => {
    switch (data.id) {
      case "stats":
        return <Stats />;
      case "research":
        return <SkillConstellation />;
      case "papers":
        return <ResearchPublications />;
      case "resume":
        return <ResumeViewer />;
      case "contact":
        return <Contact />;
      case "projects":
        return <ProjectExplorer />;
      case "terminal":
        return <Terminal />;
      default:
        return (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="text-neon-blue text-lg font-mono tracking-widest">
              MODULE_INITIALIZING
            </div>
            <div className="mt-3 text-white/40 text-sm">
              Content coming soon...
            </div>
          </div>
        );
    }
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const x = Math.max(0, data.position.x + info.offset.x);
    const y = Math.max(0, data.position.y + info.offset.y);
    updatePosition(data.id, x, y);
  };

  if (data.isMaximized) {
    // Render as a true fixed fullscreen overlay so it covers everything
    // except the taskbar (48px). Framer Motion not used for layout here
    // to avoid animation jitter when toggling.
    return (
      <div
        className="os-window flex flex-col rounded-none"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "calc(100% - 48px)",
          zIndex: data.zIndex + 1000,
        }}
        onClick={() => focusWindow(data.id)}
      >
        {/* Header */}
        <div className="os-window-header select-none cursor-default">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-neon-blue/50" />
            <span className="text-xs font-mono text-white/70 uppercase tracking-widest">
              {data.title}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => { e.stopPropagation(); minimizeWindow(data.id); }}
              className="hover:text-neon-blue transition-colors"
            >
              <Minus size={14} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); maximizeWindow(data.id); }}
              className="hover:text-neon-purple transition-colors"
            >
              <Square size={12} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); closeWindow(data.id); }}
              className="hover:text-red-400 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-auto custom-scrollbar p-4">
          {renderContent()}
        </div>
      </div>
    );
  }

  // Normal (non-maximized) draggable window
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        x: data.position.x,
        y: data.position.y,
        width: data.size.width,
        height: data.size.height,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      onMouseDown={() => focusWindow(data.id)}
      style={{
        zIndex: data.zIndex,
        position: "absolute",
        top: 0,
        left: 0,
      }}
      className="os-window flex flex-col"
    >
      {/* Header */}
      <div
        className="os-window-header cursor-move select-none"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-neon-blue/50" />
          <span className="text-xs font-mono text-white/70 uppercase tracking-widest">
            {data.title}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => { e.stopPropagation(); minimizeWindow(data.id); }}
            className="hover:text-neon-blue transition-colors"
          >
            <Minus size={14} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); maximizeWindow(data.id); }}
            className="hover:text-neon-purple transition-colors"
          >
            <Maximize2 size={14} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); closeWindow(data.id); }}
            className="hover:text-red-400 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto custom-scrollbar p-4">
        {renderContent()}
      </div>
    </motion.div>
  );
};

export default Window;