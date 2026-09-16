"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Lock, Sparkles } from "lucide-react";
import Link from "next/link";

export default function SecretSection() {
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
    <div className="w-full flex justify-center my-8 perspective-[1200px]">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full bg-white/10 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] border border-white/30 shadow-[0_25px_60px_rgba(0,0,0,0.5)] text-center relative overflow-hidden group max-w-2xl"
      >
        {/* Luxury Background Ambient Glow Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/15 via-pink-500/20 to-rose-500/15 opacity-70 pointer-events-none" />

        {/* Floating 3D Lock Header */}
        <motion.div 
          style={{ translateZ: 50 }}
          className="flex justify-center mb-4 relative z-10"
        >
          <div className="absolute inset-0 bg-purple-500/40 blur-xl rounded-full animate-pulse" />
          <div className="relative p-4 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl border border-white/30 shadow-inner text-pink-300">
            <Lock size={36} className="animate-pulse drop-shadow-md" />
          </div>
        </motion.div>

        {/* Text Details with Depth */}
        <motion.div style={{ translateZ: 30 }} className="relative z-10 space-y-3 mb-8">
          <h3 className="font-display text-2xl md:text-4xl font-extrabold text-white tracking-wide bg-gradient-to-r from-white via-pink-200 to-purple-300 bg-clip-text text-transparent drop-shadow-sm">
            One Last Hidden Surprise... 🤫
          </h3>
          <p className="text-pink-100/90 text-xs md:text-sm max-w-sm mx-auto font-medium">
            There is a secret message waiting behind this door just for you. Are you ready? ✨
          </p>
        </motion.div>

        {/* Luxury Link Button */}
        <motion.div style={{ translateZ: 40 }} className="relative z-10 inline-block">
          <Link href="/secret">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(168,85,247,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white font-bold rounded-2xl shadow-[0_10px_25px_rgba(168,85,247,0.4)] transition duration-300 cursor-pointer text-xs md:text-sm tracking-wide"
            >
              <Sparkles size={18} className="text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} /> 
              <span>Go to Secret Page</span> <span>✨</span>
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}