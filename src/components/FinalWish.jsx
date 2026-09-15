"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Sparkles } from "lucide-react";

export default function FinalWish() {
  const hasCelebrated = useRef(false);

  const triggerCelebration = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ec4899", "#f43f5e", "#ffd700"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ec4899", "#f43f5e", "#ffd700"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  // Trigger celebration only once when scrolled into view
  const handleViewportEnter = () => {
    if (!hasCelebrated.current) {
      hasCelebrated.current = true;
      triggerCelebration();
    }
  };

  return (
    <section className="py-32 px-6 max-w-3xl mx-auto text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        onViewportEnter={handleViewportEnter}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex justify-center mb-6 text-pink-400">
          <Heart size={56} fill="currentColor" className="animate-pulse" />
        </div>

        <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 bg-clip-text text-transparent">
          Forever & Always Yours ❤️
        </h2>

        <p className="text-pink-100/90 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          Thank you for being the brightest light in my life, my best friend, and my greatest blessing. 
          Here is to celebrating you today and every single day after. I love you more than words can say.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={triggerCelebration}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white font-semibold rounded-2xl shadow-xl shadow-pink-500/25 hover:opacity-90 transition duration-300 cursor-pointer"
        >
          <Sparkles size={20} /> Celebrate Us ✨
        </motion.button>
      </motion.div>
    </section>
  );
}