"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const bootLogs = [
    "INITIALIZING KERNEL_CORE_V1.0.4...",
    "CHECKING HARDWARE COMPATIBILITY...",
    "GPU: RTX_AI_ACCELERATOR DETECTED",
    "LOADING NEURAL_NETWORK_DRIVERS...",
    "CONNECTING TO MISSION_CONTROL_DASHBOARD...",
    "AUTHENTICATING USER: HAFSA_FATHIMA",
    "ACCESS GRANTED",
    "SYSTEM_READY"
  ];

  useEffect(() => {
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center font-mono">
      <div className="w-full max-w-md space-y-2">
        {logs.map((log, i) => (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            key={i}
            className={`text-xs ${log === 'ACCESS GRANTED' ? 'text-neon-green' : 'text-neon-blue'}`}
          >
            {log}
          </motion.div>
        ))}
        {logs.length > 0 && (
          <motion.div
            animate={{ opacity: [0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-neon-blue inline-block ml-1"
          />
        )}
      </div>
    </div>
  );
};

export default BootSequence;
