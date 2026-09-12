export default function Loading() {
  return (
    <main className="page-loading" role="status" aria-label="Loading portfolio">
      <div className="loading-mark">HF</div>
      <p>Opening mission control…</p>
      <div className="loading-track" />
    </main>
  );
}
