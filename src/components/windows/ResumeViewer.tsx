"use client";
import { useState } from "react";
export default function ResumeViewer() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="resume-view">
      <div className="resume-actions">
        <a
          className="button secondary"
          href="/resume/Hafsa_Fathima_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open PDF
        </a>
        <a className="button" href="/resume/Hafsa_Fathima_Resume.pdf" download>
          Download resume
        </a>
      </div>
      <p className="resume-hint">
        If your browser cannot display the preview, use Open PDF or Download
        resume.
      </p>
      {!loaded && <p role="status">Loading resume preview…</p>}
      <iframe
        title="Hafsa Fathima — updated resume"
        src="/resume/Hafsa_Fathima_Resume.pdf"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
