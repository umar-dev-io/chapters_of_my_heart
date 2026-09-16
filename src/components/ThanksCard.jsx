"use client";
import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Sparkles, MessageCircleHeart } from "lucide-react";

const romanticNotes = [
  "Every second spent with you is like a dream come true. ✨",
  "Your smile is the absolute highlight of my entire day. 💖",
  "I never knew what true love meant until I found you. 🌹",
  "You are my home, my safe place, and my greatest adventure. 🗺️",
  "No matter where life takes us, my heart will always belong to you. 💞",
];

export default function ThanksCard() {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handleNextNote = () => {
    setCurrentIndex((prev) => (prev + 1) % romanticNotes.length);
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
        className="w-full bg-white/10 backdrop-blur-2xl p-6 md:p-8 rounded-[2.5rem] border border-white/30 shadow-[0_25px_60px_rgba(0,0,0,0.5)] text-center relative overflow-hidden group max-w-2xl"
      >
        {/* Ambient Glow Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/15 via-rose-500/20 to-purple-500/15 opacity-70 pointer-events-none" />

        {/* Floating 3D Header Icon */}
        <motion.div style={{ translateZ: 50 }} className="flex justify-center mb-3 relative z-10">
          <div className="absolute inset-0 bg-pink-500/40 blur-xl rounded-full animate-pulse" />
          <div className="relative p-3 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl border border-white/30 shadow-inner text-pink-300">
            <MessageCircleHeart size={28} className="drop-shadow-md" />
          </div>
        </motion.div>

        {/* Header Title & Subtitle */}
        <motion.div style={{ translateZ: 30 }} className="relative z-10 mb-6">
          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-2 drop-shadow-sm bg-gradient-to-r from-white via-pink-200 to-rose-300 bg-clip-text text-transparent">
            Daily Love Notes 💌
          </h3>
          <p className="text-pink-100/90 text-xs md:text-sm font-medium">
            Tap below to reveal a sweet message straight from the heart. ✨
          </p>
        </motion.div>

        {/* 3D Animated Note Display Area */}
        <motion.div 
          style={{ translateZ: 40 }}
          className="min-h-[100px] flex items-center justify-center mb-6 px-4 py-4 rounded-2xl bg-black/20 border border-white/10 shadow-inner relative z-10"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -15 }}
              transition={{ duration: 0.4, type: "spring", damping: 15 }}
              className="text-pink-100 font-semibold text-sm md:text-base italic drop-shadow-sm"
            >
              "{romanticNotes[currentIndex]}"
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Luxury Action Button */}
        <motion.div style={{ translateZ: 45 }} className="relative z-10">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(236,72,153,0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextNote}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold rounded-2xl shadow-[0_10px_25px_rgba(236,72,153,0.4)] transition duration-300 cursor-pointer text-xs md:text-sm tracking-wide"
          >
            <Sparkles size={16} className="text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} /> 
            <span>Another Note ✨</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}