"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

export default function ScrollPrompt() {
  // 3D Tilt Effect Hooks
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center my-6 perspective-[1000px]">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-white/10 backdrop-blur-2xl py-5 px-8 rounded-[2rem] border border-white/30 text-center shadow-[0_15px_35px_rgba(0,0,0,0.3)] flex flex-col items-center group overflow-hidden"
      >
        {/* Ambient Glow Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-rose-500/15 to-purple-500/10 opacity-70 pointer-events-none" />

        {/* Text Header */}
        <motion.span 
          style={{ translateZ: 30 }}
          className="text-xs uppercase tracking-widest font-bold mb-3 text-pink-200 inline-flex items-center gap-1.5 drop-shadow-sm"
        >
          <Sparkles size={14} className="text-yellow-300 animate-spin" style={{ animationDuration: '5s' }} />
          Scroll down for cake celebration
        </motion.span>

        {/* 3D Floating Bouncing Arrow */}
        <motion.div
          style={{ translateZ: 50 }}
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="p-3.5 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 border border-white/30 shadow-[0_10px_20px_rgba(236,72,153,0.3)] text-pink-300 group-hover:border-pink-400/60 transition duration-300"
        >
          <ArrowDown size={22} className="drop-shadow-md" />
        </motion.div>
      </motion.div>
    </div>
  );
}