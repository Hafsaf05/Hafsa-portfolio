"use client";
import { useState } from "react";
const sizes = [
  [360, 800],
  [390, 844],
  [768, 1024],
  [1024, 768],
  [1440, 900],
  [1920, 1080],
  [3440, 1440],
];
export default function AuditSurface() {
  const [size, setSize] = useState(sizes[0]);
  return (
    <main style={{ padding: 16 }}>
      <h1 style={{ fontSize: 20 }}>Local responsive audit</h1>
      <div style={{ display: "flex", gap: 12, margin: "12px 0" }}>
        {sizes.map((s) => (
          <button
            className="button secondary"
            key={s[0]}
            aria-pressed={size[0] === s[0]}
            onClick={() => setSize(s)}
          >
            {s[0]} × {s[1]}
          </button>
        ))}
      </div>
      <p>
        Actual iframe viewport: {size[0]} × {size[1]}
      </p>
      <iframe
        id="portfolio-audit"
        title="Portfolio audit viewport"
        src="/"
        style={{
          width: size[0],
          height: size[1],
          border: 0,
          display: "block",
          marginTop: 12,
        }}
      />
    </main>
  );
}
