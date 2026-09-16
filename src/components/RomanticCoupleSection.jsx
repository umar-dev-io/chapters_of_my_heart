"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

export default function RomanticCoupleSection() {
  const [floatingElements, setFloatingElements] = useState([]);

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

  // Generate fewer floating kiss emojis periodically from the center
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      setFloatingElements((prev) => [...prev.slice(-3), id]);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

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

        {/* Header Details */}
        <motion.div style={{ translateZ: 30 }} className="relative z-10 mb-4">
          <div className="flex justify-center mb-2 text-pink-300">
            <Sparkles size={22} className="animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-2 drop-shadow-sm">
            Forever & Always Together ✨
          </h3>
          <p className="text-pink-100/90 text-xs md:text-sm font-medium max-w-sm mx-auto">
            Every moment with you feels like pure magic. Here is to all our sweet moments and endless cuddles! ❤️
          </p>
        </motion.div>

        {/* Controlled Width Image Container with 3D Pop */}
        <motion.div 
          style={{ translateZ: 50 }}
          className="relative w-full max-w-md mx-auto h-64 md:h-80 rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.5)] border border-white/20 bg-black/40 flex items-center justify-center p-2 group-hover:border-pink-400/50 transition duration-500 z-10"
        >
          <motion.img
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src="./images/cupple.png"
            alt="Two Teddy Bears Kissing"
            className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition duration-500"
          />

          {/* Floating Kiss Emoji Animations emerging from the center */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-20">
            <AnimatePresence>
              {floatingElements.map((id) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 1, scale: 0.6, y: 15, x: 0 }}
                  animate={{ 
                    opacity: [1, 1, 0], 
                    scale: [0.6, 1.3, 1.5], 
                    y: [-10, -80, -130], 
                    x: [(Math.random() - 0.5) * 40] 
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.5, ease: "easeOut" }}
                  className="absolute text-2xl select-none drop-shadow-lg"
                >
                  💋
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center pb-3 pt-8 pointer-events-none z-20">
            <span className="text-white font-bold text-xs md:text-sm drop-shadow-md flex items-center gap-1.5">
              <span className="text-base">💋</span> Two hearts beating as one ❤️
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}