"use client";
import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Sparkles } from "lucide-react";

export default function FinalWish() {
  const hasCelebrated = useRef(false);

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

  const triggerCelebration = () => {
    const duration = 3 * 1000;
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
  };

  // Trigger celebration only once when scrolled into view
  const handleViewportEnter = () => {
    if (!hasCelebrated.current) {
      hasCelebrated.current = true;
      triggerCelebration();
    }
  };

  return (
    <section className="py-28 px-6 max-w-4xl mx-auto text-center relative perspective-[1200px]">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        onViewportEnter={handleViewportEnter}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/10 backdrop-blur-2xl p-10 md:p-14 rounded-[2.5rem] border border-white/30 shadow-[0_25px_60px_rgba(0,0,0,0.5)] relative overflow-hidden group"
      >
        {/* Luxury Glowing Background Orbs */}
        <div className="absolute -top-16 -left-16 w-52 h-52 bg-pink-500/25 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-52 h-52 bg-rose-500/25 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-rose-500/15 to-purple-500/10 opacity-70 pointer-events-none" />

        {/* Floating 3D Heart Header */}
        <motion.div 
          style={{ translateZ: 50 }}
          className="flex justify-center mb-6 relative z-10"
        >
          <div className="absolute inset-0 bg-pink-500/40 blur-2xl rounded-full animate-pulse" />
          <div className="relative p-5 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl border border-white/30 shadow-inner text-pink-400">
            <Heart size={56} fill="currentColor" className="animate-pulse drop-shadow-md" />
          </div>
        </motion.div>

        {/* 3D Deepened Text & Message */}
        <motion.div style={{ translateZ: 30 }} className="relative z-10 space-y-4 mb-8">
          <h2 className="font-display text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-pink-200 to-rose-300 bg-clip-text text-transparent drop-shadow-sm tracking-wide">
            Forever & Always Yours ❤️
          </h2>
          <p className="text-pink-100/90 text-base md:text-lg leading-relaxed max-w-xl mx-auto font-medium">
            Thank you for being the brightest light in my life, my best friend, and my greatest blessing. 
            Here is to celebrating you today and every single day after. I love you more than words can say. ✨
          </p>
        </motion.div>

        {/* Luxury Interactive Celebration Button */}
        <motion.div style={{ translateZ: 40 }} className="relative z-10 inline-block">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(236,72,153,0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerCelebration}
            className="inline-flex items-center gap-2.5 px-9 py-4.5 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold rounded-2xl shadow-[0_10px_25px_rgba(236,72,153,0.4)] transition duration-300 cursor-pointer text-base tracking-wide"
          >
            <Sparkles size={20} className="text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} /> 
            <span>Celebrate Us</span> <span>✨</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}