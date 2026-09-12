import { create } from "zustand";
import type { WindowState, WindowType } from "@/types";
interface OSState {
  selectedProject: string;
  selectProject: (id: string) => void;
  windows: WindowState[];
  activeWindowId: WindowType | null;
  openWindow: (id: WindowType) => void;
  closeWindow: (id: WindowType) => void;
  focusWindow: (id: WindowType) => void;
  minimizeWindow: (id: WindowType) => void;
  maximizeWindow: (id: WindowType) => void;
  updatePosition: (id: WindowType, x: number, y: number) => void;
  updateSize: (id: WindowType, width: number, height: number) => void;
  openAllWindows: () => void;
  closeAllWindows: () => void;
}
const configs: [WindowType, string, number, number][] = [
  ["projects", "Project Explorer", 960, 640],
  ["research", "Skills Dashboard", 860, 640],
  ["papers", "Research & Publications", 760, 600],
  ["certificates", "Certificates & Badges", 1000, 680],
  ["resume", "Resume", 900, 700],
  ["stats", "About Hafsa", 720, 640],
  ["terminal", "AI Terminal", 720, 500],
  ["contact", "Contact", 620, 550],
];
const initialWindows: WindowState[] = configs.map(
  ([id, title, width, height], i) => ({
    id,
    title,
    size: { width, height },
    position: { x: 120 + i * 24, y: 90 + i * 12 },
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: i + 1,
  }),
);
const top = (windows: WindowState[]) =>
  windows
    .filter((w) => w.isOpen && !w.isMinimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0]?.id ?? null;
const raise = (state: OSState, id: WindowType) => ({
  windows: state.windows.map((w) =>
    w.id === id
      ? {
          ...w,
          isOpen: true,
          isMinimized: false,
          zIndex: Math.max(...state.windows.map((v) => v.zIndex)) + 1,
        }
      : w,
  ),
  activeWindowId: id,
});
export const useOSStore = create<OSState>((set) => ({
  selectedProject: "reflxai",
  selectProject: (id) => set({ selectedProject: id }),
  windows: initialWindows,
  activeWindowId: null,
  openWindow: (id) => set((s) => raise(s, id)),
  focusWindow: (id) => set((s) => (s.activeWindowId === id ? s : raise(s, id))),
  closeWindow: (id) =>
    set((s) => {
      const windows = s.windows.map((w) =>
        w.id === id
          ? { ...w, isOpen: false, isMinimized: false, isMaximized: false }
          : w,
      );
      return {
        windows,
        activeWindowId:
          s.activeWindowId === id ? top(windows) : s.activeWindowId,
      };
    }),
  minimizeWindow: (id) =>
    set((s) => {
      const windows = s.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w,
      );
      return {
        windows,
        activeWindowId:
          s.activeWindowId === id ? top(windows) : s.activeWindowId,
      };
    }),
  maximizeWindow: (id) =>
    set((s) => {
      const next = raise(s, id);
      return {
        ...next,
        windows: next.windows.map((w) =>
          w.id === id ? { ...w, isMaximized: !w.isMaximized } : w,
        ),
      };
    }),
  updatePosition: (id, x, y) =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id && !w.isMaximized ? { ...w, position: { x, y } } : w,
      ),
    })),
  updateSize: (id, width, height) =>
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id && !w.isMaximized ? { ...w, size: { width, height } } : w,
      ),
    })),
  openAllWindows: () =>
    set((s) => ({
      windows: s.windows.map((w, i) => ({
        ...w,
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: i + 1,
      })),
      activeWindowId: s.windows[s.windows.length - 1].id,
    })),
  closeAllWindows: () =>
    set((s) => ({
      windows: s.windows.map((w) => ({
        ...w,
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
      })),
      activeWindowId: null,
    })),
}));
