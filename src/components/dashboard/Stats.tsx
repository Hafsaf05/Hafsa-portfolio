"use client";

import React from "react";
import { Activity, Award, BookOpen, Briefcase, Zap } from "lucide-react";

const projects = [
  {
    name: "REFLXAI_ADVANCED",
    status: "DEPLOYED",
  },
  {
    name: "AI_LOG_ANALYZER",
    status: "COMPLETE",
  },
  {
    name: "ASKDUO_RAG",
    status: "COMPLETE",
  },
  {
    name: "GESTURE_CONTROLLED_CAR",
    status: "COMPLETE",
  },
  {
    name: "HOUSE_PRICE_PREDICTION",
    status: "COMPLETE",
  },
  {
    name: "CAR_PRICE_PREDICTION",
    status: "COMPLETE",
  },
  {
    name: "LEGALSHE",
    status: "DEPLOYED",
  },
  {name: "CIVIC_ISSUE_REPORTING", status: "DEPLOYED"},
];

const Stats = () => {
  return (
    <div className="space-y-6 font-mono">
      {/* Top Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border border-white/10 bg-white/5 rounded-lg">
          <div className="flex items-center gap-2 text-neon-blue mb-2">
            <Activity size={16} />
            <span className="text-xs uppercase">
              Projects Built
            </span>
          </div>

          <div className="text-3xl font-bold text-white">
            9+
          </div>

          <div className="text-[10px] text-white/40 mt-1">
            AI • ML • Full Stack • Robotics
          </div>
        </div>

        <div className="p-4 border border-white/10 bg-white/5 rounded-lg">
          <div className="flex items-center gap-2 text-neon-purple mb-2">
            <BookOpen size={16} />
            <span className="text-xs uppercase">
              Research Papers
            </span>
          </div>

          <div className="text-3xl font-bold text-white">
            2
          </div>

          <div className="text-[10px] text-white/40 mt-1">
            Published ML Research
          </div>
        </div>
      </div>

      {/* Active Projects */}
      <div className="p-4 border border-neon-blue/20 bg-neon-blue/5 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-neon-blue">
            <Activity size={18} />
            <span className="text-sm uppercase tracking-widest">
              Featured Projects
            </span>
          </div>

          <span className="text-xs text-neon-blue">
            PORTFOLIO
          </span>
        </div>

        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.name}
              className="flex items-center justify-between text-xs"
            >
              <span className="text-white/70">
                {project.name}
              </span>

              <span
                className={
                  project.status === "ACTIVE"
                    ? "text-neon-green"
                    : project.status === "DEPLOYED"
                    ? "text-neon-blue"
                    : project.status === "HACKATHON"
                    ? "text-yellow-400"
                    : "text-white/40"
                }
              >
                {project.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* LeetCode */}
      <div className="flex items-center justify-between p-4 border border-white/10 bg-white/5 rounded-lg">
        <div className="flex items-center gap-2">
          <Zap size={16} className="text-yellow-400" />

          <span className="text-xs uppercase text-white/50">
            LeetCode
          </span>
        </div>

        <div className="text-neon-blue font-semibold">
          40+ Problems Solved
        </div>
      </div>

      {/* Publications */}
      <div className="flex items-center justify-between p-4 border border-white/10 bg-white/5 rounded-lg">
        <div className="flex items-center gap-2">
          <Award size={16} className="text-neon-purple" />

          <span className="text-xs uppercase text-white/50">
            Publications
          </span>
        </div>

        <div className="text-neon-purple font-semibold">
          2 Research Papers
        </div>
      </div>

      {/* Internship */}
      <div className="flex items-center justify-between p-4 border border-white/10 bg-white/5 rounded-lg">
        <div className="flex items-center gap-2">
          <Briefcase size={16} className="text-neon-green" />

          <span className="text-xs uppercase text-white/50">
            Career Status
          </span>
        </div>

        <div className="text-neon-green font-semibold">
          Open to Opportunities
        </div>
      </div>
    </div>
  );
};

export default Stats;
