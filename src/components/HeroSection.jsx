"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Heart, ChevronDown, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

function useTypewriter(text, speed = 40) {
  const [output, setOutput] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setOutput(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return output;
}

export default function HeroSection() {
  const message = useTypewriter("Welcome to a tiny corner of the internet built just for you...");

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
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative perspective-[1000px] overflow-hidden">
      
      {/* Background Luxury Ambient Glow Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-[150px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
      />

      {/* Main Interactive 3D Content Container */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-white/10 backdrop-blur-2xl p-8 md:p-14 rounded-[2.5rem] border border-white/25 shadow-[0_30px_90px_rgba(0,0,0,0.5)] max-w-2xl w-full z-10"
      >
        {/* Floating 3D Heart Icon */}
        <motion.div 
          style={{ translateZ: 50 }}
          className="flex justify-center mb-6 text-pink-400 relative"
        >
          <div className="absolute inset-0 bg-pink-500/40 blur-xl rounded-full animate-pulse" />
          <motion.div 
            animate={{ y: [0, -8, 0], scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="relative p-5 bg-white/10 rounded-2xl border border-white/30 shadow-inner text-pink-400"
          >
            <Heart size={56} fill="currentColor" className="drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]" />
          </motion.div>
        </motion.div>

        {/* Heading & Typewriter Message with 3D Depth Layers */}
        <motion.div style={{ translateZ: 35 }} className="space-y-4">
          <h1 className="font-display text-4xl md:text-6xl font-black bg-gradient-to-r from-white via-pink-200 to-pink-400 bg-clip-text text-transparent drop-shadow-sm flex items-center justify-center gap-2 flex-wrap">
            <span>Happy Birthday, My Love!</span>
            <Sparkles className="text-yellow-300 animate-spin" style={{ animationDuration: '5s' }} size={28} />
          </h1>
          <p className="text-base md:text-lg text-pink-100/90 min-h-[3rem] font-medium tracking-wide">
            {message}
          </p>
        </motion.div>
      </motion.div>

      {/* Bouncing Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="absolute bottom-6 text-pink-300/80 cursor-pointer z-10"
      >
        <ChevronDown size={36} className="drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
      </motion.div>
    </section>
  );
}