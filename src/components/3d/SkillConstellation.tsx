"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────
interface SkillCategory {
  id: string;
  label: string;
  color: string;
  skills: { id: string; label: string }[];
}

const CATEGORIES: SkillCategory[] = [
  {
    id: "langs", label: "Languages", color: "#f59e0b",
    skills: [
      { id: "python", label: "Python" }, { id: "java", label: "Java" },
      { id: "js", label: "JavaScript" }, { id: "sql", label: "SQL" },
      { id: "c", label: "C" },
    ],
  },
  {
    id: "aiml", label: "AI / ML", color: "#a855f7",
    skills: [
      { id: "pytorch", label: "PyTorch" }, { id: "tensorflow", label: "TensorFlow" },
      { id: "sklearn", label: "Scikit-learn" }, { id: "xgboost", label: "XGBoost" },
      { id: "opencv", label: "OpenCV" }, { id: "mediapipe", label: "MediaPipe" },
    ],
  },
  {
    id: "llm", label: "LLM & Agents", color: "#06b6d4",
    skills: [
      { id: "langchain", label: "LangChain" }, { id: "langgraph", label: "LangGraph" },
      { id: "rag", label: "RAG" }, { id: "multiagent", label: "Multi-Agent" },
      { id: "semantic", label: "Semantic Retrieval" }, { id: "prompt", label: "Prompt Eng." },
    ],
  },
  {
    id: "data", label: "Data Science", color: "#ec4899",
    skills: [
      { id: "pandas", label: "Pandas" }, { id: "numpy", label: "NumPy" },
      { id: "matplotlib", label: "Matplotlib" }, { id: "feateng", label: "Feature Eng." },
      { id: "powerbi", label: "Power BI" },
    ],
  },
  {
    id: "web", label: "Web Tech", color: "#10b981",
    skills: [
      { id: "fastapi", label: "FastAPI" }, { id: "nodejs", label: "Node.js" },
      { id: "restapi", label: "REST APIs" }, { id: "htmlcss", label: "HTML/CSS" },
      { id: "nextjs", label: "Next.js" },
    ],
  },
  {
    id: "tools", label: "Tools", color: "#f97316",
    skills: [
      { id: "git", label: "Git" }, { id: "github", label: "GitHub" },
      { id: "linux", label: "Linux CLI" }, { id: "vscode", label: "VS Code" },
      { id: "colab", label: "Google Colab" },
    ],
  },
];

// ─── Layout ───────────────────────────────────────────────────────────────────
interface NodePos {
  id: string; label: string; x: number; y: number; r: number;
  color: string; isHub: boolean; hubId?: string; catId?: string;
}
interface Edge {
  x1: number; y1: number; x2: number; y2: number;
  color: string; catId: string;
}
interface Layout { nodes: NodePos[]; edges: Edge[] }

function buildLayout(W: number, H: number): Layout {
  const cx = W / 2;
  const cy = H / 2;
  const catRadius = Math.min(W, H) * 0.30;
  const skillRadius = Math.min(W, H) * 0.185;

  const nodes: NodePos[] = [];
  const edges: Edge[] = [];

  nodes.push({ id: "core", label: "Hafsa Fathima", x: cx, y: cy, r: 28, color: "#ffffff", isHub: true });

  CATEGORIES.forEach((cat, ci) => {
    const catAngle = (2 * Math.PI * ci) / CATEGORIES.length - Math.PI / 2;
    const hx = cx + catRadius * Math.cos(catAngle);
    const hy = cy + catRadius * Math.sin(catAngle);

    nodes.push({ id: cat.id, label: cat.label, x: hx, y: hy, r: 18, color: cat.color, isHub: true, catId: cat.id });
    edges.push({ x1: cx, y1: cy, x2: hx, y2: hy, color: cat.color, catId: cat.id });

    cat.skills.forEach((sk, si) => {
      const spread = (Math.PI * 2 * (si - (cat.skills.length - 1) / 2)) / (cat.skills.length + 2);
      const skAngle = catAngle + spread * 0.6;
      const sx = hx + skillRadius * Math.cos(skAngle);
      const sy = hy + skillRadius * Math.sin(skAngle);
      nodes.push({ id: sk.id, label: sk.label, x: sx, y: sy, r: 9, color: cat.color, isHub: false, hubId: cat.id, catId: cat.id });
      edges.push({ x1: hx, y1: hy, x2: sx, y2: sy, color: cat.color, catId: cat.id });
    });
  });

  return { nodes, edges };
}

// compute the pan+scale to fit a set of nodes into the viewport
function computeFitView(
  nodes: NodePos[],
  W: number,
  H: number,
  padding = 100
): { scale: number; panX: number; panY: number } {
  if (nodes.length === 0) return { scale: 1, panX: 0, panY: 0 };

  const minX = Math.min(...nodes.map(n => n.x - n.r));
  const maxX = Math.max(...nodes.map(n => n.x + n.r));
  const minY = Math.min(...nodes.map(n => n.y - n.r));
  const maxY = Math.max(...nodes.map(n => n.y + n.r));

  const bW = maxX - minX + padding * 2;
  const bH = maxY - minY + padding * 2;
  const bCx = (minX + maxX) / 2;
  const bCy = (minY + maxY) / 2;

  const s = Math.min(W / bW, H / bH, 2.2); // max zoom 2.2x
  const panX = W / 2 - bCx * s;
  const panY = H / 2 - bCy * s;

  return { scale: s, panX, panY };
}

// ─── Component ────────────────────────────────────────────────────────────────
const SkillConstellation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 760, h: 500 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [filteredCat, setFilteredCat] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ label: string; x: number; y: number } | null>(null);
  // pan/scale are CSS transform values (applied to the SVG)
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  // animated target — we use a ref for smoothing
  const targetRef = useRef({ scale: 1, panX: 0, panY: 0 });
  const animFrame = useRef<number | null>(null);
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const moved = useRef(false);

  // Resize observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { nodes, edges } = buildLayout(size.w, size.h);

  // ── smooth animate pan+scale to target
  const animateTo = useCallback((tScale: number, tPanX: number, tPanY: number) => {
    targetRef.current = { scale: tScale, panX: tPanX, panY: tPanY };
    if (animFrame.current) cancelAnimationFrame(animFrame.current);

    const step = () => {
      setPan(prev => {
        const nx = prev.x + (targetRef.current.panX - prev.x) * 0.12;
        const ny = prev.y + (targetRef.current.panY - prev.y) * 0.12;
        return { x: nx, y: ny };
      });
      setScale(prev => {
        const ns = prev + (targetRef.current.scale - prev) * 0.12;
        return ns;
      });
      animFrame.current = requestAnimationFrame(step);
    };
    animFrame.current = requestAnimationFrame(step);

    // stop after ~600ms
    setTimeout(() => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
      setPan({ x: tPanX, y: tPanY });
      setScale(tScale);
    }, 620);
  }, []);

  // ── handle category filter click → zoom to fit
  const handleFilterClick = useCallback((catId: string | null) => {
    setFilteredCat(catId);
    setHoveredId(null);
    setTooltip(null);

    if (!catId) {
      // reset to default
      animateTo(1, 0, 0);
      return;
    }

    const catNodes = nodes.filter(n => n.catId === catId);
    if (catNodes.length === 0) return;
    const { scale: s, panX, panY } = computeFitView(catNodes, size.w, size.h, 80);
    animateTo(s, panX, panY);
  }, [nodes, size, animateTo]);

  // Re-zoom when size changes while a filter is active
  useEffect(() => {
    if (!filteredCat) return;
    const catNodes = nodes.filter(n => n.catId === filteredCat);
    if (catNodes.length === 0) return;
    const { scale: s, panX, panY } = computeFitView(catNodes, size.w, size.h, 80);
    setPan({ x: panX, y: panY });
    setScale(s);
  }, [size]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── manual pan
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    moved.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
    if (animFrame.current) cancelAnimationFrame(animFrame.current);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved.current = true;
    setPan({ x: dragStart.current.px + dx, y: dragStart.current.py + dy });
  };
  const onMouseUp = () => { dragging.current = false; };

  // ── scroll zoom (zoom toward cursor)
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.001;
    setScale(s => Math.min(3, Math.max(0.3, s + delta * s)));
  };

  // ── visibility / opacity helpers
  const isNodeVisible = (node: NodePos) => {
    if (!filteredCat) return true;
    if (node.id === "core") return false;
    return node.catId === filteredCat;
  };
  const isEdgeVisible = (edge: Edge) => !filteredCat || edge.catId === filteredCat;

  const getNodeOpacity = (node: NodePos) => {
    if (!hoveredId) return 1;
    if (node.id === hoveredId) return 1;
    if (node.id === "core") return 0.35;
    const hNode = nodes.find(n => n.id === hoveredId);
    if (!hNode) return 1;
    if (hNode.isHub && hNode.id !== "core") return node.catId === hNode.catId ? 1 : 0.15;
    if (!hNode.isHub) return (node.id === hNode.hubId || node.id === hoveredId) ? 1 : 0.15;
    return 1;
  };

  const getEdgeOpacity = (edge: Edge) => {
    if (!hoveredId) return 0.2;
    const hNode = nodes.find(n => n.id === hoveredId);
    if (!hNode) return 0.2;
    if (hNode.isHub && hNode.id !== "core") return edge.catId === hNode.catId ? 0.7 : 0.04;
    if (!hNode.isHub) {
      const hub = nodes.find(n => n.id === hNode.hubId);
      const isMyEdge = (edge.catId === hNode.catId) &&
        ((edge.x2 === hNode.x && edge.y2 === hNode.y) ||
         (hub && edge.x1 === hub.x && edge.y1 === hub.y && edge.x2 === hNode.x && edge.y2 === hNode.y));
      return isMyEdge ? 0.7 : 0.04;
    }
    return 0.2;
  };

  // ── filtered category info
  const activeCat = filteredCat ? CATEGORIES.find(c => c.id === filteredCat) : null;

  return (
    <div className="w-full h-full flex flex-col font-mono" style={{ minHeight: 380 }}>

      {/* ── Filter / Legend bar ────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-1.5 px-3 pt-2 pb-2 border-b border-white/5 flex-shrink-0">
        {/* All */}
        <button
          onClick={() => handleFilterClick(null)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] transition-all duration-200 border ${
            !filteredCat
              ? 'bg-white/15 border-white/30 text-white shadow-sm'
              : 'bg-transparent border-white/10 text-white/35 hover:text-white/60 hover:bg-white/5'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
          All
        </button>

        {CATEGORIES.map(cat => {
          const isActive = filteredCat === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleFilterClick(isActive ? null : cat.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] transition-all duration-200 border`}
              style={isActive
                ? { color: cat.color, borderColor: cat.color + '80', backgroundColor: cat.color + '22', boxShadow: `0 0 12px ${cat.color}30` }
                : { color: 'rgba(255,255,255,0.35)', borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'transparent' }
              }
              onMouseEnter={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.color = cat.color;
                  (e.currentTarget as HTMLButtonElement).style.borderColor = cat.color + '50';
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.35)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)';
                }
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all"
                style={{ backgroundColor: cat.color, boxShadow: isActive ? `0 0 8px ${cat.color}` : 'none' }}
              />
              {cat.label}
              {isActive && (
                <span className="ml-0.5 text-[9px] opacity-70">({cat.skills.length})</span>
              )}
            </button>
          );
        })}

        <span className="ml-auto text-[9px] text-white/20 hidden sm:block">
          {filteredCat ? 'click to reset · drag to pan · scroll to zoom' : 'click category · scroll to zoom · drag to pan'}
        </span>
      </div>

      {/* ── SVG canvas ────────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={() => { onMouseUp(); setHoveredId(null); setTooltip(null); }}
        onWheel={onWheel}
      >
        <svg
          width="100%"
          height="100%"
          style={{
            display: 'block',
            transformOrigin: '0 0',
            transform: `translate(${pan.x}px,${pan.y}px) scale(${scale})`,
            transition: 'none', // we handle animation ourselves
          }}
        >
          <defs>
            {CATEGORIES.map(cat => (
              <filter key={cat.id} id={`glow-${cat.id}`} x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            ))}
            <filter id="glow-core" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <radialGradient id="core-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#00f2ff" stopOpacity="0.5" />
            </radialGradient>
          </defs>

          {/* Edges */}
          {edges.filter(isEdgeVisible).map((e, i) => {
            const op = getEdgeOpacity(e);
            return (
              <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
                stroke={e.color}
                strokeWidth={hoveredId ? (op > 0.3 ? 1.8 : 0.4) : (filteredCat ? 1.2 : 0.8)}
                strokeOpacity={op}
                strokeLinecap="round"
                style={{ transition: 'stroke-opacity 0.2s, stroke-width 0.2s' }}
              />
            );
          })}

          {/* Nodes */}
          {nodes.filter(isNodeVisible).map(node => {
            const isHov = hoveredId === node.id;
            const opacity = getNodeOpacity(node);
            const catId = node.catId || (CATEGORIES.find(c => c.id === node.id) ? node.id : null);
            const filterId = node.id === 'core' ? 'glow-core' : catId ? `glow-${catId}` : undefined;

            // when filtered, skill nodes get bigger radii visually
            const rBoost = filteredCat && node.catId === filteredCat && !node.isHub ? 6 : 0;
            const hubRBoost = filteredCat && node.catId === filteredCat && node.isHub ? 8 : 0;

            return (
              <g
                key={node.id}
                opacity={opacity}
                style={{ cursor: 'pointer', transition: 'opacity 0.25s' }}
                onMouseEnter={ev => {
                  if (moved.current) return;
                  setHoveredId(node.id);
                  const cont = containerRef.current!.getBoundingClientRect();
                  setTooltip({ label: node.label, x: ev.clientX - cont.left, y: ev.clientY - cont.top });
                }}
                onMouseMove={ev => {
                  const cont = containerRef.current!.getBoundingClientRect();
                  setTooltip(t => t ? { ...t, x: ev.clientX - cont.left, y: ev.clientY - cont.top } : null);
                }}
                onMouseLeave={() => { setHoveredId(null); setTooltip(null); }}
              >
                {/* Outer pulse ring on hover */}
                {isHov && (
                  <circle cx={node.x} cy={node.y} r={node.r + rBoost + hubRBoost + 12}
                    fill="none" stroke={node.color} strokeWidth={1} strokeOpacity={0.3}
                    filter={filterId ? `url(#${filterId})` : undefined}
                  />
                )}

                {/* Main node */}
                {node.id === 'core' ? (
                  <circle cx={node.x} cy={node.y} r={isHov ? node.r + 4 : node.r}
                    fill="url(#core-grad)" filter="url(#glow-core)"
                    style={{ transition: 'r 0.2s' }}
                  />
                ) : node.isHub ? (
                  <circle cx={node.x} cy={node.y}
                    r={isHov ? node.r + hubRBoost + 4 : node.r + hubRBoost}
                    fill={node.color} fillOpacity={isHov ? 1 : 0.82}
                    stroke={node.color} strokeWidth={isHov ? 2.5 : 1.5}
                    filter={filterId ? `url(#${filterId})` : undefined}
                    style={{ transition: 'r 0.25s ease, fill-opacity 0.2s' }}
                  />
                ) : (
                  <>
                    {/* outer ring */}
                    <circle cx={node.x} cy={node.y}
                      r={isHov ? node.r + rBoost + 4 : node.r + rBoost}
                      fill={node.color} fillOpacity={filteredCat ? 0.18 : 0.1}
                      stroke={node.color} strokeWidth={isHov ? 2 : (filteredCat ? 1.5 : 1)}
                      style={{ transition: 'r 0.25s ease' }}
                    />
                    {/* inner dot */}
                    <circle cx={node.x} cy={node.y}
                      r={isHov ? (filteredCat ? 8 : 6) : (filteredCat ? 5 : 3)}
                      fill={node.color} fillOpacity={isHov ? 1 : 0.9}
                      filter={filterId ? `url(#${filterId})` : undefined}
                      style={{ transition: 'r 0.25s ease' }}
                    />
                  </>
                )}

                {/* Labels */}
                {node.id === 'core' ? (
                  <>
                    <text x={node.x} y={node.y - 4} textAnchor="middle" dominantBaseline="middle"
                      fill="white" fontSize={10} fontWeight="700" fontFamily="monospace" letterSpacing="0.5"
                      style={{ pointerEvents: 'none' }}>Hafsa</text>
                    <text x={node.x} y={node.y + 8} textAnchor="middle" dominantBaseline="middle"
                      fill="white" fontSize={8} fontFamily="monospace" fillOpacity={0.6}
                      style={{ pointerEvents: 'none' }}>Fathima</text>
                  </>
                ) : node.isHub ? (
                  <text
                    x={node.x} y={node.y + node.r + hubRBoost + 16}
                    textAnchor="middle" dominantBaseline="middle"
                    fill={node.color}
                    fontSize={filteredCat && node.catId === filteredCat ? 13 : 10}
                    fontWeight="700" fontFamily="monospace"
                    style={{ pointerEvents: 'none', transition: 'font-size 0.25s' }}
                  >
                    {node.label}
                  </text>
                ) : (
                  <text
                    x={node.x} y={node.y + node.r + rBoost + 13}
                    textAnchor="middle" dominantBaseline="middle"
                    fill={isHov ? 'white' : (filteredCat ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.6)')}
                    fontSize={filteredCat ? 10 : 8}
                    fontFamily="monospace"
                    style={{ pointerEvents: 'none', transition: 'font-size 0.25s, fill 0.15s' }}
                  >
                    {node.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {tooltip && !moved.current && (
          <div
            className="absolute pointer-events-none z-50 bg-black/85 backdrop-blur border border-white/10 text-white text-[11px] font-mono px-2.5 py-1 rounded-lg shadow-xl"
            style={{ left: tooltip.x + 14, top: tooltip.y - 12, whiteSpace: 'nowrap' }}
          >
            {tooltip.label}
          </div>
        )}

        {/* Active category badge (top-right) */}
        {activeCat && (
          <div
            className="absolute top-3 right-3 flex items-center gap-2 bg-black/70 backdrop-blur rounded-lg px-3 py-1.5 text-[10px] font-mono border"
            style={{ borderColor: activeCat.color + '50', color: activeCat.color }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeCat.color, boxShadow: `0 0 6px ${activeCat.color}` }} />
            <span className="font-bold">{activeCat.label}</span>
            <span className="text-white/40">·</span>
            <span className="text-white/60">{activeCat.skills.length} skills</span>
            <button
              onClick={() => handleFilterClick(null)}
              className="ml-1 text-white/30 hover:text-white/80 transition-colors"
            >✕</button>
          </div>
        )}

        {/* Reset hint when panned away */}
        {filteredCat && (
          <button
            onClick={() => handleFilterClick(filteredCat)}
            className="absolute bottom-3 right-3 text-[9px] font-mono text-white/20 hover:text-white/50 border border-white/10 px-2 py-1 rounded transition-all"
          >
            re-center
          </button>
        )}
      </div>
    </div>
  );
};

export default SkillConstellation;
