"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ThanksCard({ title, message, buttonText, buttonHref }) {
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
        className="max-w-xl w-full bg-white/10 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/30 shadow-[0_25px_60px_rgba(0,0,0,0.5)] text-center relative overflow-hidden group z-10"
      >
        {/* Luxury Background Glow Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-pink-500/20 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/15 via-rose-500/20 to-purple-500/15 opacity-70 pointer-events-none" />

        {/* Floating 3D Header Icon */}
        <motion.div style={{ translateZ: 50 }} className="flex justify-center mb-5 relative z-10">
          <div className="absolute inset-0 bg-pink-500/40 blur-xl rounded-full animate-pulse" />
          <div className="relative p-4 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl border border-white/30 shadow-inner text-pink-300">
            <Sparkles size={40} className="animate-pulse drop-shadow-md" />
          </div>
        </motion.div>

        {/* 3D Deepened Title */}
        <motion.div style={{ translateZ: 35 }} className="relative z-10 mb-4">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-white via-pink-200 to-rose-300 bg-clip-text text-transparent drop-shadow-sm tracking-wide">
            {title}
          </h1>
        </motion.div>

        {/* 3D Message Content */}
        <motion.div style={{ translateZ: 25 }} className="relative z-10 mb-8">
          <p className="text-pink-100/90 text-sm md:text-base leading-relaxed font-medium">
            {message}
          </p>
        </motion.div>

        {/* Luxury Action Button with 3D Pop */}
        <motion.div style={{ translateZ: 45 }} className="flex justify-center relative z-10">
          <Link href={buttonHref}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(236,72,153,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold rounded-2xl shadow-[0_10px_25px_rgba(236,72,153,0.4)] transition duration-300 cursor-pointer text-sm tracking-wide"
            >
              <Heart size={18} fill="currentColor" className="text-pink-200 animate-pulse" /> 
              <span>{buttonText}</span>
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}