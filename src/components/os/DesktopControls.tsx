"use client";

import { useOSStore } from "@/store/window-store";
import { LayoutGrid, X } from "lucide-react";

export default function DesktopControls() {
  const { windows, openAllWindows, closeAllWindows } = useOSStore();

  const openCount = windows.filter(w => w.isOpen && !w.isMinimized).length;

  return (
    <div className="absolute top-4 right-4 z-40 flex items-center gap-2">
      <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/40 text-[10px] font-mono">
        {openCount}/{windows.length} WINDOWS
      </div>

      <button
        onClick={openAllWindows}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neon-blue/10 border border-neon-blue/30 text-neon-blue text-[10px] font-mono hover:bg-neon-blue/20 transition-all"
      >
        <LayoutGrid size={12} />
        OPEN_ALL
      </button>

      <button
        onClick={closeAllWindows}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-mono hover:bg-red-500/20 transition-all"
      >
        <X size={12} />
        CLOSE_ALL
      </button>
    </div>
  );
}