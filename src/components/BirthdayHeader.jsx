"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Clock, Sparkles } from "lucide-react";

export default function BirthdayHeader() {
  // 3D Tilt Effect Hooks
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [12, -12]);
  const rotateY = useTransform(x, [-100, 100], [-12, 12]);

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
    <div className="w-full flex items-center justify-center perspective-[1000px] mb-8">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-white/10 backdrop-blur-2xl py-8 px-8 md:px-12 rounded-[2.5rem] border border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.4)] text-center w-full max-w-xl overflow-hidden group"
      >
        {/* Ambient Glow Lighting */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-rose-500/15 to-purple-500/10 opacity-70 pointer-events-none" />

        {/* 3D Floating Clock Header Icon */}
        <motion.div 
          style={{ translateZ: 50 }}
          className="flex justify-center mb-4 relative"
        >
          <div className="absolute inset-0 bg-pink-500/40 blur-xl rounded-full animate-pulse" />
          <div className="relative p-4 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl border border-white/30 shadow-inner text-pink-300">
            <Clock size={42} className="animate-pulse drop-shadow-md" />
          </div>
        </motion.div>

        {/* Header Text with Depth */}
        <motion.div style={{ translateZ: 30 }} className="space-y-2">
          <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold mb-1 border border-pink-500/30">
            <Sparkles size={14} className="text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} /> Countdown in progress
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-white via-pink-200 to-rose-300 bg-clip-text text-transparent drop-shadow-sm tracking-wide">
            Just a few time left... Can&apos;t wait! ✨
          </h1>
        </motion.div>
      </motion.div>
    </div>
  );
}