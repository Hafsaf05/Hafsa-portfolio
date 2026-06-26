import { create } from 'zustand';
import { WindowState, WindowType } from '@/types';

interface OSState {
  windows: WindowState[];
  activeWindowId: WindowType | null;
  openWindow: (id: WindowType) => void;
  closeWindow: (id: WindowType) => void;
  focusWindow: (id: WindowType) => void;
  minimizeWindow: (id: WindowType) => void;
  maximizeWindow: (id: WindowType) => void;
  updatePosition: (id: WindowType, x: number, y: number) => void;
  openAllWindows:()=>void;
  closeAllWindows:()=>void;
}

const initialWindows: WindowState[] = [
  {
  id: "resume",
  title: "Resume.pdf",
  isOpen: false,
  isMinimized: false,
  isMaximized: false,
  zIndex: 5,
  position: { x: 250, y: 80 },
  size: { width: 900, height: 700 },
},
{
  id: "contact",
  title: "Contact.exe",
  isOpen: false,
  isMinimized: false,
  isMaximized: false,
  zIndex: 6,
  position: { x: 300, y: 120 },
  size: { width: 500, height: 500 },
},
  {
    id: 'projects',
    title: 'Project_Explorer.exe',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 100, y: 100 },
    size: { width: 800, height: 600 },
  },
  {
    id: 'research',
    title: 'Knowledge_Graph.sys',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 12,
    position: { x: 450, y: 100 },
    size: { width: 600, height: 500 },
  },
  {
    id: 'stats',
    title: 'System_Metrics.sys',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 11,
    position: { x: 50, y: 50 },
    size: { width: 400, height: 300 },
  },
  {
    id: 'terminal',
    title: 'AI_Kernel_Terminal',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 150, y: 150 },
    size: { width: 600, height: 400 },
  }
];

export const useOSStore = create<OSState>((set) => ({
  windows: initialWindows,
  activeWindowId: 'stats',
  openWindow: (id) =>
  set((state) => {
    const maxZ = Math.max(...state.windows.map((w) => w.zIndex));

    return {
      windows: state.windows.map((w) =>
        w.id === id
          ? {
              ...w,
              isOpen: true,
              isMinimized: false,
              zIndex: maxZ + 1,
            }
          : w
      ),
      activeWindowId: id,
    };
  }),
  closeWindow: (id) => set((state) => ({
    windows: state.windows.map(w => w.id === id ? { ...w, isOpen: false } : w),
    activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
  })),
  focusWindow: (id) => set((state) => {
    const maxZ = Math.max(...state.windows.map(w => w.zIndex));
    return {
      windows: state.windows.map(w => w.id === id ? { ...w, zIndex: maxZ + 1 } : w),
      activeWindowId: id,
    };
  }),
  minimizeWindow: (id) => set((state) => ({
    windows: state.windows.map(w => w.id === id ? { ...w, isMinimized: true } : w),
    activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
  })),
  maximizeWindow: (id) => set((state) => ({
    windows: state.windows.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w),
  })),
  updatePosition: (id, x, y) => set((state) => ({
    windows: state.windows.map(w => w.id === id ? { ...w, position: { x, y } } : w),
  })),

  openAllWindows: () =>
  set((state) => ({
    windows: state.windows.map((w) => ({
      ...w,
      isOpen: true,
      isMinimized: false,
    })),
    activeWindowId: "projects",
  })),

closeAllWindows: () =>
  set((state) => ({
    windows: state.windows.map((w) => ({
      ...w,
      isOpen: false,
      isMinimized: false,
    })),
    activeWindowId: null,
  })),
}));
