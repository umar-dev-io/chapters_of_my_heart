"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function FloatingHearts({ count = 15 }) {
  const [mounted, setMounted] = useState(false);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    setMounted(true);
    setHearts(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 14 + Math.random() * 22,
        duration: 9 + Math.random() * 10,
        delay: Math.random() * 6,
        xOffset: (Math.random() - 0.5) * 80, // Adds a gorgeous swaying drift side-to-side
      }))
    );
  }, [count]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 perspective-[1000px]">
      {/* Soft atmospheric background glow aura */}
      <div className="absolute inset-0 bg-gradient-to-t from-pink-500/5 via-transparent to-purple-500/5 blur-3xl" />

      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ y: "110vh", x: 0, opacity: 0, scale: 0.4, rotate: -15 }}
          animate={{
            y: "-12vh",
            x: [0, h.xOffset, -h.xOffset, 0],
            opacity: [0, 0.85, 0.85, 0],
            scale: [0.4, 1.1, 1, 0.6],
            rotate: [-15, 15, -10, 20],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ position: "absolute", left: `${h.left}%` }}
          className="will-change-transform"
        >
          <Heart
            size={h.size}
            className="text-pink-400/50 drop-shadow-[0_0_12px_rgba(244,63,94,0.6)] filter backdrop-blur-[1px]"
            fill="currentColor"
          />
        </motion.div>
      ))}
    </div>
  );
}