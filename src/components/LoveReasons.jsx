"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { reasons } from "@/data/loveReasons";
import { Heart, Sparkles } from "lucide-react";

export default function LoveReasons() {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const toggleFlip = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <section className="py-28 px-6 max-w-6xl mx-auto relative perspective-[1200px]">
      {/* Background Luxury Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-white via-pink-200 to-rose-300 bg-clip-text text-transparent drop-shadow-[0_10px_20px_rgba(236,72,153,0.3)]">
          Reasons Why I Love You 💖
        </h2>
        <p className="text-pink-200/80 text-sm md:text-base font-medium flex items-center justify-center gap-2">
          <Sparkles size={16} className="text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
          Click any card to reveal a secret note ✨
        </p>
      </motion.div>

      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {reasons.map((reason, index) => {
          const isFlipped = flippedIndex === index;
          return (
            <motion.div
              key={index}
              onClick={() => toggleFlip(index)}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-56 cursor-pointer group"
              style={{ perspective: "1200px" }}
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.7, type: "spring", stiffness: 200, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
                className="w-full h-full relative rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
              >
                {/* Front Face - Luxury Glassmorphism */}
                <div 
                  style={{ backfaceVisibility: "hidden" }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white/10 backdrop-blur-2xl border border-white/30 rounded-3xl group-hover:border-pink-400/50 transition-colors shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl pointer-events-none" />
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="p-3 bg-pink-500/20 rounded-2xl mb-3 border border-pink-500/30 shadow-inner"
                  >
                    <Heart size={30} className="text-pink-400 drop-shadow-md" fill="currentColor" />
                  </motion.div>
                  <span className="font-display font-bold text-lg text-white tracking-wide">Reason #{index + 1}</span>
                  <span className="text-xs text-pink-200/70 mt-1 font-medium tracking-wider uppercase">Tap to open 💋</span>
                </div>

                {/* Back Face - Deep Velvet Luxury Glow */}
                <div
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  className="absolute inset-0 flex items-center justify-center p-6 text-center bg-gradient-to-br from-[#3b0d24]/95 via-[#5a1238]/95 to-[#260515]/95 border border-pink-500/40 rounded-3xl shadow-[0_0_30px_rgba(244,63,94,0.3)]"
                >
                  <div className="absolute inset-0 bg-pink-500/10 rounded-3xl blur-md pointer-events-none" />
                  <p className="text-pink-100 text-sm md:text-base leading-relaxed font-medium relative z-10 drop-shadow-sm">
                    {reason}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}