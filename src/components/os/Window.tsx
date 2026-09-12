"use client";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { X, Minus, Maximize2, Minimize2, Move } from "lucide-react";
import { useOSStore } from "@/store/window-store";
import { windowRect } from "@/lib/window-geometry";
import { WindowState } from "@/types";
import ResumeViewer from "../windows/ResumeViewer";
import Contact from "../windows/Contact";
import ResearchPublications from "../windows/ResearchPublications";
import Certificates from "../windows/Certificates";
import Stats from "../dashboard/Stats";
import SkillConstellation from "../3d/SkillConstellation";
import ProjectExplorer from "../windows/ProjectExplorer";
import Terminal from "../windows/Terminal";
export default function Window({
  data,
  blocked = false,
}: {
  data: WindowState;
  blocked?: boolean;
}) {
  const {
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    updatePosition,
    updateSize,
    activeWindowId,
  } = useOSStore();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [moving, setMoving] = useState(false);
  const [viewport, setViewport] = useState(() => ({
    width: typeof window === "undefined" ? 1200 : window.innerWidth,
    height: typeof window === "undefined" ? 800 : window.innerHeight,
  }));
  useEffect(() => {
    const sync = () => setViewport({ width: innerWidth, height: innerHeight });
    sync();
    addEventListener("resize", sync);
    window.visualViewport?.addEventListener("resize", sync);
    return () => {
      removeEventListener("resize", sync);
      window.visualViewport?.removeEventListener("resize", sync);
    };
  }, []);
  const rect = windowRect(data, viewport);
  const active = activeWindowId === data.id && !data.isMinimized;
  const mobile = viewport.width < 768;
  useEffect(() => {
    if (ref.current) ref.current.inert = blocked || data.isMinimized;
  }, [blocked, data.isMinimized]);
  useEffect(() => {
    if (active && !ref.current?.contains(document.activeElement))
      ref.current?.focus({ preventScroll: true });
  }, [active]);
  const pointer = (
    e: ReactPointerEvent<HTMLButtonElement | HTMLElement>,
    resize: boolean,
  ) => {
    if (data.isMaximized || (!resize && mobile)) return;
    e.preventDefault();
    focusWindow(data.id);
    setMoving(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    const start = { x: e.clientX, y: e.clientY };
    const target: HTMLElement = e.currentTarget;
    let frame = 0;
    const move = (ev: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const dx = ev.clientX - start.x,
          dy = ev.clientY - start.y;
        if (resize)
          updateSize(
            data.id,
            Math.min(
              viewport.width - rect.x - 12,
              Math.max(320, rect.width + dx),
            ),
            Math.min(
              viewport.height - rect.y - 80,
              Math.max(200, rect.height + dy),
            ),
          );
        else
          updatePosition(
            data.id,
            Math.max(
              12,
              Math.min(rect.x + dx, viewport.width - rect.width - 12),
            ),
            Math.max(
              76,
              Math.min(rect.y + dy, viewport.height - rect.height - 88),
            ),
          );
      });
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      setMoving(false);
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerup", stop);
      target.removeEventListener("pointercancel", stop);
    };
    target.addEventListener("pointermove", move);
    target.addEventListener("pointerup", stop);
    target.addEventListener("pointercancel", stop);
  };
  const contents = {
    stats: <Stats />,
    research: <SkillConstellation />,
    papers: <ResearchPublications />,
    certificates: <Certificates />,
    resume: <ResumeViewer />,
    contact: <Contact />,
    projects: <ProjectExplorer />,
    terminal: <Terminal />,
  };
  return (
    <motion.div
      ref={ref}
      tabIndex={-1}
      role="dialog"
      aria-modal={active && data.isMaximized ? true : undefined}
      aria-label={data.title}
      data-window={data.id}
      data-maximized={data.isMaximized}
      data-active={active}
      className={`os-window ${active ? "active-window" : ""} ${data.isMaximized ? "maximized-window" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={
        moving || reduced
          ? { duration: 0 }
          : { duration: 0.22, ease: [0.22, 0.8, 0.25, 1] }
      }
      style={{
        width:rect.width, height:rect.height, transform:`translate(${rect.x}px, ${rect.y}px)`,
        transition:moving||reduced?"none":"width 220ms ease, height 220ms ease, transform 220ms ease",
        zIndex: data.zIndex,
        display: data.isMinimized ? "none" : undefined,
      }}
      onFocusCapture={() => {
        if (!active) focusWindow(data.id);
      }}
      onPointerDownCapture={() => {
        if (!active) focusWindow(data.id);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.stopPropagation();
          closeWindow(data.id);
          return;
        }
        if (e.key === "Tab" && active && data.isMaximized) {
          const els = Array.from(
            ref.current?.querySelectorAll<HTMLElement>(
              'button:not([disabled]),a[href],input,select,textarea,summary,iframe,[tabindex="0"]',
            ) || [],
          ).filter((el) => el.getClientRects().length > 0);
          const first = els[0],
            last = els[els.length - 1];
          if (
            e.shiftKey &&
            (document.activeElement === first ||
              document.activeElement === ref.current)
          ) {
            e.preventDefault();
            last?.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }}
    >
      <header
        className="os-window-header"
        onPointerDown={(e) => {
          if (!(e.target as HTMLElement).closest("button")) pointer(e, false);
        }}
        onDoubleClick={(e) => {
          if (!(e.target as HTMLElement).closest("button"))
            maximizeWindow(data.id);
        }}
      >
        <span id={`title-${data.id}`}>{data.title}</span>
        <div>
          {!mobile && !data.isMaximized && (
            <button
              aria-label={`Move ${data.title}`}
              title="Move window with arrow keys"
              onPointerDown={(e) => pointer(e, false)}
              onKeyDown={(e) => {
                if (e.key.startsWith("Arrow")) {
                  e.preventDefault();
                  updatePosition(
                    data.id,
                    rect.x +
                      (e.key === "ArrowRight"
                        ? 20
                        : e.key === "ArrowLeft"
                          ? -20
                          : 0),
                    rect.y +
                      (e.key === "ArrowDown"
                        ? 20
                        : e.key === "ArrowUp"
                          ? -20
                          : 0),
                  );
                }
              }}
            >
              <Move size={16} />
            </button>
          )}
          <button
            aria-label={`Minimize ${data.title}`}
            onClick={() => minimizeWindow(data.id)}
          >
            <Minus size={16} />
          </button>
          <button
            aria-label={`${data.isMaximized ? "Restore" : "Maximize"} ${data.title}`}
            onClick={() => maximizeWindow(data.id)}
          >
            {data.isMaximized ? (
              <Minimize2 size={16} />
            ) : (
              <Maximize2 size={16} />
            )}
          </button>
          <button
            aria-label={`Close ${data.title}`}
            onClick={() => closeWindow(data.id)}
          >
            <X size={16} />
          </button>
        </div>
      </header>
      <div className="window-content">{contents[data.id]}</div>
      {!mobile && !data.isMaximized && (
        <button
          className="resize-handle"
          aria-label={`Resize ${data.title}`}
          title="Drag or use arrow keys to resize"
          onPointerDown={(e) => pointer(e, true)}
          onKeyDown={(e) => {
            if (e.key.startsWith("Arrow")) {
              e.preventDefault();
              updateSize(
                data.id,
                Math.min(
                  viewport.width - rect.x - 12,
                  Math.max(
                    320,
                    rect.width +
                      (e.key === "ArrowRight"
                        ? 20
                        : e.key === "ArrowLeft"
                          ? -20
                          : 0),
                  ),
                ),
                Math.min(
                  viewport.height - rect.y - 80,
                  Math.max(
                    200,
                    rect.height +
                      (e.key === "ArrowDown"
                        ? 20
                        : e.key === "ArrowUp"
                          ? -20
                          : 0),
                  ),
                ),
              );
            }
          }}
        >
          ⌟
        </button>
      )}
    </motion.div>
  );
}
