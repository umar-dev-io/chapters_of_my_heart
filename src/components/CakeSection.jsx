"use client";
import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import { Cake, Flame, Sparkles } from "lucide-react";

export default function CakeSection() {
  const [candlesLit, setCandlesLit] = useState(true);

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

  const blowCandles = () => {
    if (candlesLit) {
      setCandlesLit(false);
      
      // Full screen multi-angle celebratory confetti blast
      const duration = 2.5 * 1000;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 7,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#ec4899", "#f43f5e", "#ffd700", "#ffffff"],
        });
        confetti({
          particleCount: 7,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#ec4899", "#f43f5e", "#ffd700", "#ffffff"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  };

  return (
    <div className="text-center my-8 w-full flex flex-col items-center perspective-[1200px]">
      {/* Prominent Happy Birthday Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-6"
      >
        <span className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold mb-3 border border-pink-500/30 shadow-inner">
          <Sparkles size={14} className="text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} /> Special Day ✨
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-pink-200 to-rose-300 bg-clip-text text-transparent drop-shadow-sm tracking-wide">
          Happy Birthday! 🎉
        </h2>
      </motion.div>

      <p className="text-pink-100/90 text-sm md:text-base mb-8 leading-relaxed max-w-md mx-auto font-medium">
        {candlesLit
          ? "Make a secret birthday wish from the bottom of your heart, and tap the cake to blow out your candles! ✨"
          : "🎂 Candles blown out! May all your beautiful wishes come true this year. I love you endlessly! ❤️"}
      </p>

      {/* Interactive 3D Cake Container */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        onClick={blowCandles}
        className="cursor-pointer group relative inline-block p-10 rounded-[2.5rem] bg-white/10 backdrop-blur-2xl border border-white/30 shadow-[0_25px_60px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden"
      >
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-rose-500/25 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2.5rem]" />

        {/* Floating 3D Flames */}
        <motion.div style={{ translateZ: 50 }} className="flex justify-center gap-3 mb-4 relative z-10">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={candlesLit ? { y: [0, -8, 0] } : { opacity: 0, scale: 0, y: -25 }}
              transition={candlesLit ? { repeat: Infinity, duration: 0.8, delay: i * 0.2, ease: "easeInOut" } : { duration: 0.3 }}
              className="text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)] p-2 bg-gradient-to-br from-white/20 to-white/5 rounded-xl border border-white/20 shadow-inner"
            >
              <Flame size={28} fill="currentColor" />
            </motion.div>
          ))}
        </motion.div>

        {/* 3D Cake Graphic & Badge */}
        <motion.div style={{ translateZ: 35 }} className="relative z-10 space-y-4">
          <div className="relative inline-block p-4 bg-gradient-to-br from-white/15 to-white/5 rounded-2xl border border-white/20 shadow-inner">
            <Cake size={90} className="text-pink-300 mx-auto group-hover:scale-110 transition duration-300 drop-shadow-md" />
          </div>
          <div>
            <span className="inline-block text-xs font-bold text-pink-200 tracking-wider uppercase bg-black/30 py-2 px-4 rounded-xl border border-white/15 shadow-md group-hover:border-pink-400/50 transition">
              {candlesLit ? "Click cake to blow out candles 🌬️" : "Wishes Sent & Celebrated! ✨"}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}