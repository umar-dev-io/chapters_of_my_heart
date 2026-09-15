"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function FloatingHearts({ count = 15 }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const hearts = Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 14 + Math.random() * 18,
    duration: 7 + Math.random() * 8,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ y: "105vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 0.7, 0] }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ position: "absolute", left: `${h.left}%` }}
        >
          <Heart size={h.size} className="text-pink-300/50" fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
}