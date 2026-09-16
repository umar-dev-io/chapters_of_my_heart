"use client";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Timer } from "lucide-react";

export default function BirthdayCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentDateStr, setCurrentDateStr] = useState("");
  const [currentTimeStr, setCurrentTimeStr] = useState("");
  const [isCelebrated, setIsCelebrated] = useState(false);

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

  useEffect(() => {
    // Target: September 17, 2026, 12:00 AM
    const targetDate = new Date("2026-09-17T00:00:00").getTime();

    const updateTimer = () => {
      const now = new Date();
      
      // Live current date and time formatting
      setCurrentDateStr(now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
      setCurrentTimeStr(now.toLocaleTimeString());

      const difference = targetDate - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // Auto-celebration triggers when time reaches 0
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (!isCelebrated) {
          setIsCelebrated(true);
          confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.5 },
            colors: ["#ec4899", "#f43f5e", "#ffd700", "#ffffff"],
          });
        }
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [isCelebrated]);

  return (
    <div className="w-full perspective-[1200px] flex justify-center">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full bg-white/10 backdrop-blur-2xl p-6 md:p-8 rounded-[2.5rem] border border-white/30 text-center shadow-[0_25px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group"
      >
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/15 via-rose-500/20 to-purple-500/15 opacity-70 pointer-events-none" />

        {/* Live Date & Time Info */}
        <motion.div style={{ translateZ: 30 }} className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold mb-2 border border-pink-500/30">
            <Timer size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
            {currentDateStr} • {currentTimeStr}
          </div>
          <div className="text-xs md:text-sm text-pink-100/80 mb-6 font-medium">
            {isCelebrated ? "🎉 It's Time! Happy Birthday! 🎉" : "Countdown to Sept 17, 2026, 12:00 AM ✨"}
          </div>
        </motion.div>

        {/* 3D Time Grid Blocks */}
        <motion.div style={{ translateZ: 50 }} className="grid grid-cols-4 gap-3 text-center relative z-10">
          {/* Days */}
          <div className="bg-gradient-to-br from-white/20 to-white/5 p-3 rounded-2xl border border-white/20 shadow-inner group-hover:border-pink-400/50 transition duration-300">
            <span className="block font-display text-2xl md:text-3xl font-extrabold text-white drop-shadow-sm">{timeLeft.days}</span>
            <span className="text-[10px] md:text-xs text-pink-200/80 uppercase tracking-wider font-semibold">Days</span>
          </div>
          {/* Hours */}
          <div className="bg-gradient-to-br from-white/20 to-white/5 p-3 rounded-2xl border border-white/20 shadow-inner group-hover:border-pink-400/50 transition duration-300">
            <span className="block font-display text-2xl md:text-3xl font-extrabold text-white drop-shadow-sm">{timeLeft.hours}</span>
            <span className="text-[10px] md:text-xs text-pink-200/80 uppercase tracking-wider font-semibold">Hours</span>
          </div>
          {/* Minutes */}
          <div className="bg-gradient-to-br from-white/20 to-white/5 p-3 rounded-2xl border border-white/20 shadow-inner group-hover:border-pink-400/50 transition duration-300">
            <span className="block font-display text-2xl md:text-3xl font-extrabold text-white drop-shadow-sm">{timeLeft.minutes}</span>
            <span className="text-[10px] md:text-xs text-pink-200/80 uppercase tracking-wider font-semibold">Mins</span>
          </div>
          {/* Seconds */}
          <div className="bg-gradient-to-br from-white/20 to-white/5 p-3 rounded-2xl border border-white/20 shadow-inner group-hover:border-pink-400/50 transition duration-300">
            <span className="block font-display text-2xl md:text-3xl font-extrabold text-white drop-shadow-sm">{timeLeft.seconds}</span>
            <span className="text-[10px] md:text-xs text-pink-200/80 uppercase tracking-wider font-semibold">Secs</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}