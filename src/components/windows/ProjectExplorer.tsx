"use client";

import React, { useMemo, useState } from "react";
import { projects } from "@/lib/data";
import { Project } from "@/types";
import {
  ExternalLink,
  Github,
  Code,
  Layers,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ProjectExplorer: React.FC = () => {
  const [search, setSearch] = useState("");

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) =>
        project.title.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);

  return (
    <div className="flex h-full gap-6">
      {/* LEFT PANEL */}
      <div className="w-1/3 border-r border-white/10 pr-6 overflow-auto custom-scrollbar">
        <div className="mb-4 relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="
              w-full
              pl-9
              pr-3
              py-2
              rounded-lg
              bg-white/5
              border
              border-white/10
              text-xs
              text-white
              placeholder:text-white/20
              outline-none
              focus:border-neon-blue/50
            "
          />
        </div>

        <div className="space-y-2">
          {filteredProjects.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`
                w-full
                text-left
                p-3
                rounded-lg
                transition-all
                duration-300
                border

                ${
                  selectedProject?.id === project.id
                    ? "bg-neon-blue/20 border-neon-blue/50 text-neon-blue"
                    : "bg-transparent border-transparent hover:bg-white/5 text-white/70"
                }
              `}
            >
              <div className="text-sm font-semibold truncate">
                {project.title}
              </div>

              <div className="flex gap-2 mt-2 flex-wrap">
                {project.tags.slice(0, 3).map((tag: string) => (
                  <span
                    key={tag}
                    className="text-[10px] text-white/40 font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedProject.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* HEADER */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold neon-text-blue">
                  {selectedProject.title}
                </h2>

                <div className="flex gap-2 mt-3 flex-wrap">
                  {selectedProject.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="
                        text-[10px]
                        px-2
                        py-1
                        rounded-full
                        bg-white/5
                        border
                        border-white/10
                        text-white/50
                      "
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      p-2
                      rounded-full
                      hover:bg-white/10
                      text-white/50
                      hover:text-white
                      transition
                    "
                  >
                    <Github size={20} />
                  </a>
                )}

                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      p-2
                      rounded-full
                      hover:bg-white/10
                      text-white/50
                      hover:text-white
                      transition
                    "
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="glass-panel bg-white/5 rounded-xl p-5 border border-white/10">
              <p className="text-sm text-white/80 leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            {/* ARCHITECTURE */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-neon-purple">
                <Layers size={18} />
                <span className="text-xs font-mono uppercase tracking-widest">
                  System Architecture
                </span>
              </div>

              <div
                className="
                  p-5
                  rounded-xl
                  border
                  border-neon-purple/20
                  bg-neon-purple/5
                "
              >
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  {selectedProject.architecture
                    .split("->")
                    .map((step, index, arr) => (
                      <React.Fragment key={index}>
                        <span className="px-3 py-2 rounded bg-white/5 border border-white/10">
                          {step.trim()}
                        </span>

                        {index !== arr.length - 1 && (
                          <span className="text-neon-purple text-sm">
                            →
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                </div>
              </div>
            </div>

            {/* PROJECT INSIGHTS */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-neon-green">
                <Code size={18} />
                <span className="text-xs font-mono uppercase tracking-widest">
                  Project Insights
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {selectedProject.tags.map((tag) => (
                  <div
                    key={tag}
                    className="
                      p-4
                      rounded-lg
                      border
                      border-white/10
                      bg-white/5
                      text-xs
                      text-white/60
                    "
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectExplorer;
