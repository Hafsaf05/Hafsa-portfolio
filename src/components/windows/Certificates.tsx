"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Download, Search } from "lucide-react";
import { certificates, Certificate } from "@/lib/certificates";
export default function Certificates() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Certificate | null>(null);
  const [failed, setFailed] = useState<string[]>([]);
  const items = certificates.filter(
    (c) =>
      (filter === "All" || c.category === filter) &&
      [c.title, c.issuer, c.date]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const picture = (c: Certificate, large = false) =>
    failed.includes(c.id) ? (
      <div className="asset-error">
        <p>Preview unavailable. You can still open the original file.</p>
        <a href={c.image} target="_blank" rel="noopener noreferrer">
          Open original
        </a>
      </div>
    ) : (
      <Image
        src={c.image}
        alt={`${c.recognition}: ${c.title}, ${c.date}, awarded to Hafsa Fathima`}
        width={1600}
        height={1130}
        unoptimized
        priority={large}
        onError={() => setFailed((v) => [...v, c.id])}
        style={{
          transform: c.rotation ? `rotate(${c.rotation}deg)` : undefined,
        }}
      />
    );
  if (selected)
    return (
      <article className="content-stack">
        <button
          className="button secondary"
          onClick={() => {
            const id = selected.id;
            setSelected(null);
            requestAnimationFrame(() =>
              document.getElementById(`certificate-${id}`)?.focus(),
            );
          }}
        >
          <ArrowLeft size={16} />
          Back to certificates
        </button>
        <div>
          <p className="eyebrow">
            {selected.category} / {selected.date}
          </p>
          <h2>{selected.title}</h2>
          <p>{selected.issuer}</p>
        </div>
        <div className="certificate-large">{picture(selected, true)}</div>
        <section className="detail-card">
          <h3>{selected.recognition}</h3>
          <p>{selected.description}</p>
        </section>
        <div className="resume-actions">
          <a
            className="button secondary"
            href={selected.image}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open original <ArrowUpRight size={16} />
          </a>
          <a className="button secondary" href={selected.image} download>
            <Download size={16} />
            Download
          </a>
          {selected.url && (
            <a
              className="button"
              href={selected.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Verify badge <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </article>
    );
  return (
    <div className="content-stack">
      <div>
        <p className="eyebrow">Learning / Participation / Recognition</p>
        <h2>Certificates & badges.</h2>
        <p>Six event certificates and one verified Google Skills badge.</p>
      </div>
      <div className="certificate-tools">
        <label className="search-box">
          <Search size={16} />
          <input
            aria-label="Search certificates"
            placeholder="Find a certificate or issuer…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="tags skill-filters" aria-label="Certificate categories">
          {["All", "Hackathons", "Workshops", "Badges"].map((s) => (
            <button
              key={s}
              aria-pressed={filter === s}
              onClick={() => setFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <p role="status" className="result-count">
        {items.length} {items.length === 1 ? "credential" : "credentials"}
      </p>
      <div className="certificate-grid">
        {items.map((c) => (
          <article className="certificate-card" key={c.id}>
            <button
              id={`certificate-${c.id}`}
              className="certificate-preview"
              aria-label={`View ${c.title}`}
              onClick={() => setSelected(c)}
            >
              {picture(c)}
            </button>
            <div>
              <p className="eyebrow">
                {c.category} / {c.date}
              </p>
              <h3>
                <button onClick={() => setSelected(c)}>{c.title}</button>
              </h3>
              <p>{c.issuer}</p>
              <span className="recognition">{c.recognition}</span>
            </div>
          </article>
        ))}
      </div>
      {!items.length && (
        <div className="empty-state">
          <h3>No matching credentials</h3>
          <button
            className="button secondary"
            onClick={() => {
              setFilter("All");
              setQuery("");
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
