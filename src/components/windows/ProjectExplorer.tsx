"use client";
import { useOSStore } from "@/store/window-store";
import { useState } from "react";
import { projects } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
export default function ProjectExplorer() {
  const [query, setQuery] = useState("");
  const selected = useOSStore((s) => s.selectedProject);
  const setSelected = useOSStore((s) => s.selectProject);
  const filtered = projects.filter((p) =>
    [p.title, p.description, ...p.tags]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  const project = filtered.find((p) => p.id === selected) || filtered[0];
  return (
    <div className="explorer">
      <aside className="project-list">
        <label className="search-box">
          <Search size={16} />
          <input
            aria-label="Search projects"
            placeholder="Find a project…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <p className="eyebrow">
          Projects / {filtered.length.toString().padStart(2, "0")}
        </p>
        <label className="project-select">
          Select a project
          <select
            aria-label="Select a project"
            value={project?.id || ""}
            onChange={(e) => setSelected(e.target.value)}
          >
            {filtered.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </label>
        {filtered.map((p, i) => (
          <button
            key={p.id}
            className={`project-tab ${project?.id === p.id ? "selected" : ""}`}
            aria-pressed={project?.id === p.id}
            onClick={() => setSelected(p.id)}
          >
            <span className="project-number">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>
              <strong>{p.title}</strong>
              <small>{p.tags[0]}</small>
            </span>
            <ArrowUpRight size={16} />
          </button>
        ))}
      </aside>
      <div className="project-detail">
        <AnimatePresence mode="wait">
          {project ? (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="content-stack"
            >
              <div>
                <p className="eyebrow">Selected work / {project.tags[0]}</p>
                <h2>{project.title}</h2>
                <p className="project-subtitle">{project.subtitle}</p>
              </div>
              <div className="project-feature">
                <div>
                  <p>{project.description}</p>
                  <div className="tags">
                    {project.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
                {project.metric && (
                  <div className="project-metric">
                    <strong>{project.metric}</strong>
                    <span>{project.metricLabel}</span>
                  </div>
                )}
              </div>
              <section>
                <h3>Engineering highlights</h3>
                <ul className="detail-list">
                  {project.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </section>
              {project.architecture && (
                <section>
                  <p className="eyebrow">Pipeline</p>
                  <div className="pipeline">
                    {project.architecture.split(" -> ").map((s, i) => (
                      <span key={s}>
                        <small>{String(i + 1).padStart(2, "0")}</small>
                        {s}
                      </span>
                    ))}
                  </div>
                </section>
              )}
              {project.demo && (
                <a
                  className="button"
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try live demo <ArrowUpRight size={16} />
                </a>
              )}
              {project.github && (
                <a
                  className="button secondary"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore source code <ArrowUpRight size={16} />
                </a>
              )}
            </motion.article>
          ) : (
            <div className="empty-state">
              <h3>No matching projects</h3>
              <p>Try a project name or technology.</p>
              <button className="button" onClick={() => setQuery("")}>
                Clear search
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
