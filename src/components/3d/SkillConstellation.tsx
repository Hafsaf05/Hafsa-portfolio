"use client";
import KnowledgeGraph from "./KnowledgeGraph";
import { useState } from "react";
import { skills } from "@/lib/data";
import { motion } from "framer-motion";
export default function SkillConstellation() {
  const [active, setActive] = useState("All");
  return (
    <div className="content-stack">
      <div>
        <p className="eyebrow">Technical toolkit</p>
        <h2>Built across the AI stack.</h2>
      </div>
      <div className="tags skill-filters">
        {["All", ...skills.map((s) => s.label)].map((s) => (
          <button
            key={s}
            aria-pressed={s === active}
            onClick={() => setActive(s)}
          >
            {s}
          </button>
        ))}
      </div>
      <details className="detail-card">
        <summary>Explore the interactive skills graph</summary>
        <div style={{ height: 520, marginTop: 20 }}>
          <KnowledgeGraph />
        </div>
      </details>
      <div className="skills-grid">
        {skills
          .filter((s) => active === "All" || s.label === active)
          .map((s, i) => (
            <motion.section
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="detail-card"
              key={s.label}
            >
              <p className="eyebrow">Module 0{skills.indexOf(s) + 1}</p>
              <h3>{s.label}</h3>
              <div className="tags">
                {s.skills.map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </div>
            </motion.section>
          ))}
      </div>
    </div>
  );
}
