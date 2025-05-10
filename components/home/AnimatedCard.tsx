"use client";
import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export default function AnimatedCard() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set(e.clientX - left - width / 2);
    y.set(e.clientY - top - height / 2);
    rotateX.set((y.get() / height) * 20);
    rotateY.set((x.get() / width) * -20);
  };

  return (
    <motion.div
      ref={ref}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      className="mx-auto max-w-md bg-gray-800/50 border border-gray-700 rounded-2xl p-8 shadow-2xl backdrop-blur-sm"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="text-cyan-400 font-mono">$1,250.00</div>
        <div className="text-sm text-gray-400">Next: May 15</div>
      </div>
      <div className="h-40 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-lg flex items-center justify-center">
        <div className="text-gray-300">Payment Preview</div>
      </div>
    </motion.div>
  );
}
