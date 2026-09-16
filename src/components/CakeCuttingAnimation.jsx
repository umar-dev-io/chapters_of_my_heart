"use client";
import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Utensils } from "lucide-react";

export default function CakeCuttingAnimation() {
  const [isCut, setIsCut] = useState(false);

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

  const handleCutCake = () => {
    if (!isCut) {
      setIsCut(true);
      confetti({
        particleCount: 150,
        spread: 100,
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
            Time to Cut the Cake! 🎂
          </h3>
          <p className="text-pink-100/90 text-xs md:text-sm font-medium">
            Tap below to slide the knife and slice the luxury birthday cake! ✨
          </p>
        </motion.div>

        {/* 3D HD Cake Image Container with Knife Animation */}
        <motion.div 
          style={{ translateZ: 50 }}
          className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.5)] border border-white/20 bg-black/40 flex items-center justify-center group-hover:border-pink-400/50 transition duration-500 z-10"
        >
          {/* HD Online Cake Image */}
          <img 
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop" 
            alt="HD Birthday Cake" 
            className={`w-full h-full object-cover transition-transform duration-700 ${isCut ? "scale-105 brightness-90" : "scale-100 group-hover:scale-105"}`}
          />

          {/* Split/Cut visual effect line */}
          {isCut && (
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-y-0 w-1.5 bg-gradient-to-b from-pink-300 via-pink-400 to-rose-500 shadow-[0_0_20px_#f43f5e] z-10"
            />
          )}

          {/* Animated Knife */}
          <motion.div
            animate={
              isCut 
                ? { x: [0, -130, 160], y: [0, 90, 150], rotate: [0, -35, -45] } 
                : { x: [0, 12, 0], y: [0, -6, 0], rotate: [0, 5, 0] }
            }
            transition={
              isCut 
                ? { duration: 0.8, ease: "easeInOut" } 
                : { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
            }
            className="absolute z-20 text-white drop-shadow-[0_15px_15px_rgba(0,0,0,0.9)] pointer-events-none"
          >
            <div className="bg-gradient-to-r from-slate-100 via-slate-300 to-slate-400 w-20 h-3.5 rounded-full shadow-2xl border border-white/80 flex items-center pl-2.5">
              <span className="text-xs text-slate-800 font-bold">🔪</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Luxury Action Button */}
        <motion.div style={{ translateZ: 40 }} className="mt-6 relative z-10">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(236,72,153,0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCutCake}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold rounded-2xl shadow-[0_10px_25px_rgba(236,72,153,0.4)] transition duration-300 cursor-pointer text-sm tracking-wide"
          >
            <Utensils size={18} className="text-pink-200" /> 
            <span>{isCut ? "Cake Successfully Cut! 🎉" : "Slice the Cake 🔪"}</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}