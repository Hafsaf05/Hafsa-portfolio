"use client";
import { publications } from "@/lib/data";
import { BookOpen } from "lucide-react";
export default function ResearchPublications() {
  return (
    <div className="content-stack">
      <div>
        <p className="eyebrow">Research / 2025</p>
        <h2>Ideas, investigated.</h2>
        <p>Two co-authored machine learning journal publications.</p>
      </div>
      {publications.map((p, i) => (
        <article className="detail-card publication" key={p.title}>
          <BookOpen size={24} />
          <span className="eyebrow">
            0{i + 1} · Journal paper · {p.year}
          </span>
          <h3>{p.title}</h3>
          <p>{p.journal}</p>
        </article>
      ))}
    </div>
  );
}
