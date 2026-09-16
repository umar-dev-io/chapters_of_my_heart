"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function FloatingHearts({ count = 18 }) {
  const [mounted, setMounted] = useState(false);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    setMounted(true);
    setHearts(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 16 + Math.random() * 24,
        duration: 10 + Math.random() * 12,
        delay: Math.random() * 7,
        xOffset: (Math.random() - 0.5) * 100, // Side-to-side swaying drift
        zDepth: (Math.random() - 0.5) * 300,  // 3D depth layering (-150px to 150px)
        rotateSpeedX: (Math.random() - 0.5) * 360,
        rotateSpeedY: (Math.random() - 0.5) * 360,
      }))
    );
  }, [count]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 perspective-[1200px]">
      {/* Soft luxury atmospheric background aura */}
      <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-transparent to-purple-500/10 blur-[100px]" />

      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ 
            y: "115vh", 
            x: 0, 
            z: h.zDepth, 
            opacity: 0, 
            scale: 0.3, 
            rotateX: 0, 
            rotateY: 0, 
            rotateZ: -15 
          }}
          animate={{
            y: "-15vh",
            x: [0, h.xOffset, -h.xOffset, 0],
            opacity: [0, 0.9, 0.9, 0],
            scale: [0.3, 1.2, 1.05, 0.5],
            rotateX: [0, h.rotateSpeedX, h.rotateSpeedX * 1.5],
            rotateY: [0, h.rotateSpeedY, h.rotateSpeedY * 1.5],
            rotateZ: [-15, 25, -10, 30],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ 
            position: "absolute", 
            left: `${h.left}%`,
            transformStyle: "preserve-3d"
          }}
          className="will-change-transform"
        >
          <div className="relative group">
            {/* Luminous Glow Behind Each Heart */}
            <div className="absolute inset-0 bg-pink-500/30 blur-md rounded-full scale-75 animate-pulse" />
            
            <Heart
              size={h.size}
              className="text-pink-400/70 drop-shadow-[0_0_16px_rgba(244,63,94,0.8)] filter backdrop-blur-[2px] relative z-10"
              fill="currentColor"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}