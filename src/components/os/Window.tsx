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

  return (
    <motion.div
      initial={{
        scale: 0.95,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
        x: data.isMaximized ? 0 : data.position.x,
        y: data.isMaximized ? 0 : data.position.y,
        width: data.isMaximized ? "100%" : data.size.width,
        height: data.isMaximized ? "calc(100% - 48px)" : data.size.height,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      drag={!data.isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      style={{
        zIndex: data.zIndex,
        position: "absolute",
      }}
      className={`os-window flex flex-col ${data.isMaximized ? "rounded-none" : ""}`}
    >
      {/* Header */}
      <div
        className="os-window-header cursor-move select-none"
        onPointerDown={(e) => {
          if (!data.isMaximized) {
            dragControls.start(e);
          }
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-neon-blue/50" />

          <span className="text-xs font-mono text-white/70 uppercase tracking-widest">
            {data.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => minimizeWindow(data.id)}
            className="hover:text-neon-blue transition-colors"
          >
            <Minus size={14} />
          </button>

          <button
            onClick={() => maximizeWindow(data.id)}
            className="hover:text-neon-purple transition-colors"
          >
            {data.isMaximized ? (
              <Square size={12} />
            ) : (
              <Maximize2 size={14} />
            )}
          </button>

          <button
            onClick={() => closeWindow(data.id)}
            className="hover:text-neon-pink transition-colors"
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