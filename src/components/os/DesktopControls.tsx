"use client";

import { useOSStore } from "@/store/window-store";

export default function DesktopControls() {
  const {
    windows,
    openAllWindows,
    closeAllWindows,
  } = useOSStore();

  const openCount = windows.filter(
    (w) => w.isOpen && !w.isMinimized
  ).length;

  const allOpen = openCount === windows.length;

  return (
    <div className="absolute top-6 right-6 z-40 flex gap-3">
      <button
        onClick={openAllWindows}
        className="
          px-4
          py-2
          rounded-lg
          bg-neon-blue/10
          border
          border-neon-blue/30
          text-neon-blue
          text-xs
          font-mono
          hover:bg-neon-blue/20
          transition
        "
      >
        OPEN_ALL
      </button>

      <button
        onClick={closeAllWindows}
        className="
          px-4
          py-2
          rounded-lg
          bg-red-500/10
          border
          border-red-500/30
          text-red-400
          text-xs
          font-mono
          hover:bg-red-500/20
          transition
        "
      >
        CLOSE_ALL
      </button>

      <div
        className="
          px-3
          py-2
          rounded-lg
          bg-white/5
          border
          border-white/10
          text-white/50
          text-xs
          font-mono
        "
      >
        {openCount}/{windows.length}
      </div>
    </div>
  );
}