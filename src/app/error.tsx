"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="page-loading">
      <h1>Let’s try that again.</h1>
      <p>The portfolio couldn’t load this view.</p>
      <button className="button" onClick={reset}>
        Reload view
      </button>
      <a className="button secondary" href="/resume/Hafsa_Fathima_Resume.pdf">
        Open resume
      </a>
    </main>
  );
}
