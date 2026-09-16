"use client";
import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import { Gift, Heart, Sparkles } from "lucide-react";

export default function GiftBoxSection() {
  const [isOpen, setIsOpen] = useState(false);

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

  const handleOpenGift = () => {
    if (!isOpen) {
      setIsOpen(true);
      confetti({
        particleCount: 180,
        spread: 110,
        origin: { y: 0.6 },
        colors: ["#ec4899", "#f43f5e", "#ffd700", "#ffffff"],
      });
    }
  };

  return (
    <div className="w-full flex justify-center my-8 perspective-[1200px]">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full bg-white/10 backdrop-blur-2xl p-6 md:p-8 rounded-[2.5rem] border border-white/30 shadow-[0_25px_60px_rgba(0,0,0,0.5)] text-center relative overflow-hidden group"
      >
        {/* Ambient Glow Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/15 via-rose-500/20 to-purple-500/15 opacity-70 pointer-events-none" />

        {/* Header Details */}
        <motion.div style={{ translateZ: 30 }} className="relative z-10 mb-4">
          <div className="flex justify-center mb-2 text-pink-300">
            <Sparkles size={22} className="animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-2 drop-shadow-sm">
            A Special Surprise Gift! 🎁
          </h3>
          <p className="text-pink-100/90 text-xs md:text-sm font-medium">
            Tap the luxury gift box below to unwrap your cute surprise! ✨
          </p>
        </motion.div>

        {!isOpen ? (
          <motion.div style={{ translateZ: 50 }} className="relative z-10">
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(236,72,153,0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenGift}
              className="cursor-pointer inline-flex flex-col items-center justify-center p-10 rounded-3xl bg-gradient-to-br from-pink-500/20 via-rose-500/25 to-purple-500/20 border border-pink-500/40 shadow-[0_15px_35px_rgba(0,0,0,0.3)] group/box transition duration-300"
            >
              <div className="absolute inset-0 bg-pink-400/10 rounded-3xl blur-xl opacity-0 group-hover/box:opacity-100 transition" />
              <Gift size={75} className="text-pink-300 mb-4 animate-bounce group-hover/box:scale-110 transition duration-300 drop-shadow-lg relative z-10" />
              <span className="px-6 py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 rounded-2xl font-bold text-white shadow-lg text-xs md:text-sm tracking-wide relative z-10">
                Click to Open Gift 💝
              </span>
            </motion.div>
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              style={{ translateZ: 50 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", damping: 15 }}
              className="flex flex-col items-center relative z-10"
            >
              {/* HD Cute Red Teddy Bear Image Container */}
              <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.5)] border border-white/20 bg-black/40 flex items-center justify-center mb-4 group-hover:border-pink-400/50 transition duration-500">
                <img
                  src="./images/teddyBear.png"
                  alt="Cute Red Teddy Bear"
                  className="w-full h-full object-contain hover:scale-105 transition duration-500 drop-shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-center pb-4">
                  <span className="text-white font-bold text-xs md:text-sm drop-shadow-md">
                    🧸 A cuddly red teddy bear just for you! ❤️
                  </span>
                </div>
              </div>

              <p className="text-pink-200 text-xs md:text-sm font-semibold mt-2 flex items-center justify-center gap-1.5 drop-shadow-sm">
                <Heart size={16} fill="currentColor" className="text-pink-400 animate-pulse" /> Hope this brings a huge smile to your face! ✨
              </p>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
}