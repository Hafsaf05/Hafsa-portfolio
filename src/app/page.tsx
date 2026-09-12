"use client";
import { MotionConfig } from "framer-motion";
import Desktop from "@/components/os/Desktop";
export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <Desktop />
      </main>
    </MotionConfig>
  );
}
