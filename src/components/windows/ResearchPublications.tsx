"use client";

import React from "react";
import { BookOpen, ExternalLink, Calendar, Award, Tag } from "lucide-react";

const papers = [
  {
    title: "Car Price Prediction Using Machine Learning",
    journal: "Research and Reviews: Advancement in Cyber Security",
    year: "2025",
    abstract: "A study on used car pricing dynamics leveraging supervised regression algorithms. The research evaluates multiple algorithmic approaches including Random Forest, Gradient Boosting, and XGBoost to predict vehicle market valuations based on parameters such as mileage, age, brand equity, and fuel system configuration.",
    tags: ["Machine Learning", "Regression Models", "Feature Selection", "Data Cleaning"]
  },
  {
    title: "Future Proofing Real Estate: Machine Learning for Price Predictions",
    journal: "Advancement of Computer Technology and Its Applications",
    year: "2025",
    abstract: "Delving into modern housing valuation systems, this paper explores the effectiveness of ensemble neural networks and gradient-boosted decision trees to predict real estate market fluctuations, providing insights for automated valuation models (AVMs) in property tech.",
    tags: ["Real Estate Tech", "XGBoost", "Feature Engineering", "Ensemble Methods"]
  },
];

export default function ResearchPublications() {
  return (
    <div className="space-y-6 font-mono p-1">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4">
        <BookOpen className="text-neon-purple" size={24} />
        <div>
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">Academic Publications</h2>
          <p className="text-xs text-white/50">Co-authored Research Papers & Findings</p>
        </div>
      </div>

      <div className="grid gap-6">
        {papers.map((paper, index) => (
          <div
            key={index}
            className="p-5 rounded-xl border border-neon-purple/20 bg-neon-purple/5 hover:border-neon-purple/50 transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              {/* Journal Info */}
              <div className="flex flex-wrap items-center gap-3 text-[10px] text-neon-purple mb-2">
                <span className="flex items-center gap-1 bg-neon-purple/10 px-2 py-0.5 rounded border border-neon-purple/20">
                  <Award size={10} />
                  JOURNAL PAPER
                </span>
                <span className="flex items-center gap-1 text-white/40">
                  <Calendar size={10} />
                  Published {paper.year}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-sm font-bold text-white group-hover:text-neon-purple transition-colors mb-3 leading-snug">
                {paper.title}
              </h3>

              {/* Journal Name */}
              <p className="text-xs text-white/80 italic mb-3 flex items-start gap-1.5">
                <span className="text-neon-purple mt-0.5">•</span>
                <span>{paper.journal}</span>
              </p>

              {/* Abstract */}
              <div className="bg-black/30 rounded-lg p-3 text-[11px] text-white/60 mb-4 border border-white/5 leading-relaxed">
                <strong className="text-white/80 uppercase block mb-1 text-[9px] tracking-wider text-neon-purple/80">Abstract:</strong>
                {paper.abstract}
              </div>
            </div>

            {/* Tags & Action */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5">
              <div className="flex flex-wrap gap-2">
                {paper.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-white/50 flex items-center gap-1 border border-white/10"
                  >
                    <Tag size={8} />
                    {tag}
                  </span>
                ))}
              </div>

              <button className="flex items-center gap-1 text-[10px] text-white/40 hover:text-white transition bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded border border-white/10">
                View Publication <ExternalLink size={10} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}