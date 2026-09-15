"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Cake, Flame, Sparkles } from "lucide-react";

export default function CakeSection() {
  const [candlesLit, setCandlesLit] = useState(true);

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
    <div className="text-center my-6 w-full">
      {/* Prominent Happy Birthday Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold mb-2 border border-pink-500/30">
          <Sparkles size={14} /> Special Day ✨
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 bg-clip-text text-transparent">
          Happy Birthday! 🎉
        </h2>
      </motion.div>

      <p className="text-pink-100/80 text-sm md:text-base mb-6 leading-relaxed max-w-md mx-auto">
        {candlesLit
          ? "Make a secret birthday wish from the bottom of your heart, and tap the cake to blow out your candles!"
          : "🎂 Candles blown out! May all your beautiful wishes come true this year. I love you endlessly! ❤️"}
      </p>

      {/* Interactive Cake Graphic with Glow Effect */}
      <motion.div 
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={blowCandles}
        className="cursor-pointer group relative inline-block p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-pink-500/30 hover:border-pink-500/60 shadow-2xl transition"
      >
        <div className="absolute inset-0 bg-pink-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition pointer-events-none" />

        <div className="flex justify-center gap-2.5 mb-3 relative z-10">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={candlesLit ? { y: [0, -6, 0] } : { opacity: 0, scale: 0, y: -20 }}
              transition={candlesLit ? { repeat: Infinity, duration: 0.8, delay: i * 0.2 } : { duration: 0.3 }}
              className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
            >
              <Flame size={28} fill="currentColor" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10">
          <Cake size={90} className="text-pink-300 mx-auto group-hover:scale-105 transition" />
          <span className="block text-xs font-bold text-pink-200 mt-4 tracking-wider uppercase bg-black/20 py-1.5 px-3 rounded-full border border-white/10">
            {candlesLit ? "Click cake to blow out candles 🌬️" : "Wishes Sent & Celebrated! ✨"}
          </span>
        </div>
      </motion.div>
    </div>
  );
}