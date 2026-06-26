"use client";

import { useState } from "react";
import Desktop from "@/components/os/Desktop";
import BootSequence from "@/components/os/BootSequence";

export default function Home() {
  const [isBooted, setIsBooted] = useState(false);

  return (
    <main className="h-screen w-screen overflow-hidden">
      {!isBooted ? (
        <BootSequence onComplete={() => setIsBooted(true)} />
      ) : (
        <Desktop />
      )}
    </main>
  );
}
