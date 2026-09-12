"use client";
import {
  projects,
  achievements,
  profile,
  hackathons,
  leadership,
} from "@/lib/data";
export default function Stats() {
  return (
    <div className="content-stack">
      <div>
        <p className="eyebrow">The person behind the projects</p>
        <h2>Curiosity. Research. Execution.</h2>
        <p>
          I’m Hafsa, an AI & Machine Learning undergraduate graduating in 2027.
          I enjoy turning ideas into working systems—from explainable fraud
          detection to multi-agent code tools—and understanding why they work.
          Research and hackathons have helped me learn through building,
          testing, and collaboration. I’m looking for opportunities to
          contribute to thoughtful AI products and grow as a developer.
        </p>
      </div>
      <div className="metrics-grid">
        {[
          [String(projects.length), "Project entries"],
          ["2", "Published papers"],
          ["100+", "DSA problems"],
        ].map(([n, l]) => (
          <div className="metric-card" key={l}>
            <strong>{n}</strong>
            <span>{l}</span>
          </div>
        ))}
      </div>
      <section className="detail-card">
        <p className="eyebrow">Education · {profile.graduation}</p>
        <h3>{profile.degree}</h3>
        <p>{profile.education}</p>
        <div className="tags">
          {profile.coursework.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </section>
      {[
        ["Achievements", achievements],
        ["Hackathons & competitions", hackathons],
        ["Leadership & activities", leadership],
      ].map(([title, items]) => (
        <section key={title as string}>
          <h3>{title}</h3>
          <ul className="detail-list">
            {(items as string[]).map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
