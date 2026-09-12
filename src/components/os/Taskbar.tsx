"use client";
import { useEffect, useState } from "react";
import { LayoutGrid, X } from "lucide-react";
import { useOSStore } from "@/store/window-store";
import { apps } from "./DesktopIcons";
export default function Taskbar() {
  const {
    windows,
    activeWindowId,
    openWindow,
    minimizeWindow,
    closeAllWindows,
    openAllWindows,
  } = useOSStore();
  const [menu, setMenu] = useState(false);
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    tick();
    const t = setInterval(tick, 30000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, []);
  return (
    <footer className="taskbar">
      {menu && (
        <>
          <button
            className="menu-backdrop"
            aria-label="Close app menu"
            onClick={() => setMenu(false)}
          />
          <div className="app-menu">
            <div className="panel-heading">
              <strong>Hafsa OS</strong>
              <button
                aria-label="Close app menu"
                onClick={() => setMenu(false)}
              >
                <X size={18} />
              </button>
            </div>
            {apps.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  openWindow(id);
                  setMenu(false);
                }}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
            <button
              onClick={() => {
                openAllWindows();
                setMenu(false);
              }}
            >
              Open all windows
            </button>
            <button
              onClick={() => {
                closeAllWindows();
                setMenu(false);
              }}
            >
              Show desktop
            </button>
          </div>
        </>
      )}
      <button
        className="launcher"
        aria-label="Open app menu"
        aria-expanded={menu}
        onClick={() => setMenu(!menu)}
      >
        <LayoutGrid size={19} />
        <span>Hafsa OS</span>
      </button>
      <div className="taskbar-apps">
        {apps.map(({ id, label, icon: Icon }) => {
          const win = windows.find((w) => w.id === id);
          return (
            <button
              key={id}
              aria-label={label}
              title={label}
              className={win?.isOpen ? "running" : ""}
              aria-pressed={activeWindowId === id && !win?.isMinimized}
              onClick={() =>
                activeWindowId === id && win?.isOpen && !win.isMinimized
                  ? minimizeWindow(id)
                  : openWindow(id)
              }
            >
              <Icon size={19} />
            </button>
          );
        })}
      </div>
      <time>{time}</time>
    </footer>
  );
}
