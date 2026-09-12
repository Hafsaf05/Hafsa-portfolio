"use client";
import { useEffect } from "react";
export default function BootSequence({
  onComplete,
}: {
  onComplete: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 450);
    return () => clearTimeout(timer);
  }, [onComplete]);
  return (
    <div role="status" className="detail-card">
      Opening mission control…
    </div>
  );
}
