"use client";
import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import { Lock, Sparkles } from "lucide-react";

const SECRET_PASSWORD = process.env.NEXT_PUBLIC_SECRET_PASSWORD || "defaultfallback";

export default function LockScreen({ onUnlock }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // 3D Tilt Effect Hooks
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

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

  const handleLogin = (e) => {
    e.preventDefault();
    if (password.trim().toLowerCase() === SECRET_PASSWORD.toLowerCase()) {
      localStorage.setItem("isUnlocked", "true");
      confetti({ 
        particleCount: 150, 
        spread: 100, 
        origin: { y: 0.6 },
        colors: ["#ec4899", "#f43f5e", "#ffd700", "#ffffff"]
      });
      onUnlock();
    } else {
      setError(true);
      setAttempts((a) => a + 1);
      setTimeout(() => setError(false), 600);
    }
  };

  return (
    <main className="min-h-screen romantic-bg flex items-center justify-center p-4 perspective-[1000px] overflow-hidden">
      {/* Background Luxury Glow Orbs */}
      <div className="absolute w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute w-80 h-80 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none -bottom-10 -right-10" />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-white/10 backdrop-blur-2xl p-8 md:p-10 rounded-3xl border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] max-w-md w-full text-center text-white z-10"
      >
        {/* Floating 3D Lock Icon Header */}
        <motion.div 
          style={{ translateZ: 50 }}
          className="flex justify-center mb-4 text-pink-400 relative"
        >
          <div className="absolute inset-0 bg-pink-500/30 blur-xl rounded-full" />
          <div className="relative p-4 bg-white/10 rounded-2xl border border-white/20 shadow-inner">
            <Lock size={36} className="animate-bounce" />
          </div>
        </motion.div>

        <motion.div style={{ translateZ: 30 }}>
          <h1 className="font-display text-3xl font-extrabold mb-2 bg-gradient-to-r from-white via-pink-200 to-pink-400 bg-clip-text text-transparent flex items-center justify-center gap-2">
            For My Special Person <Sparkles className="text-yellow-300" size={20} />
          </h1>
          <p className="text-sm text-pink-200/90 mb-6">
            Enter the secret password to unlock your luxury surprise! ✨
          </p>
        </motion.div>

        <motion.form style={{ translateZ: 40 }} onSubmit={handleLogin} className="space-y-4">
          <motion.input
            animate={error ? { x: [-12, 12, -12, 12, 0], borderColor: "#f87171" } : { borderColor: "rgba(236, 72, 153, 0.3)" }}
            transition={{ duration: 0.4 }}
            type="password"
            placeholder="Enter secret word..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3.5 rounded-2xl bg-black/40 border text-white placeholder-pink-300/40 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 text-center shadow-inner transition-all"
          />
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.5)" }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 rounded-2xl font-bold shadow-lg transition duration-300 cursor-pointer"
          >
            Open Surprise ✨
          </motion.button>
        </motion.form>

        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -5 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-red-300 text-xs mt-3 font-medium tracking-wide"
          >
            Oops! Try again{attempts >= 2 ? " — hint: our special place" : ""} 🥺
          </motion.p>
        )}
      </motion.div>
    </main>
  );
}