"use client";
import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import { Lock, Sparkles, Heart } from "lucide-react";

const SECRET_PASSWORD = process.env.NEXT_PUBLIC_SECRET_PASSWORD || "defaultfallback";

export default function LockScreen({ onUnlock }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // 3D Tilt Effect Hooks
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [18, -18]);
  const rotateY = useTransform(x, [-100, 100], [-18, 18]);

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
        particleCount: 180, 
        spread: 120, 
        origin: { y: 0.6 },
        colors: ["#ec4899", "#f43f5e", "#ff7eb3", "#ffd700", "#ffffff"]
      });
      onUnlock();
    } else {
      setError(true);
      setAttempts((a) => a + 1);
      setTimeout(() => setError(false), 600);
    }
  };

  // Generate floating background kiss icons (💋) and sparkles
  const floatingItems = Array.from({ length: 14 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 20 + Math.random() * 24,
    duration: 5 + Math.random() * 6,
    delay: Math.random() * 4,
  }));

  return (
    <main className="relative min-h-screen romantic-bg flex items-center justify-center p-4 perspective-[1200px] overflow-hidden">
      
      {/* High-Quality HD Romantic Online Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=2000&q=80" 
          alt="Luxury Romantic Background" 
          className="w-full h-full object-cover opacity-20 filter blur-sm scale-105 animate-pulse"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#2b0a3d]/90 via-[#7a1e4f]/70 to-[#3b0a5c]/90" />
      </div>

      {/* Floating 💋 Kiss Icons & Magic Orbs Background Animation */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {floatingItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ y: "110vh", opacity: 0, scale: 0.5 }}
            animate={{ 
              y: "-10vh", 
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.8],
              rotate: [0, 15, -15, 0]
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ position: "absolute", left: `${item.left}%` }}
            className="text-pink-300/60 drop-shadow-[0_0_10px_rgba(244,63,94,0.6)] select-none"
          >
            {item.id % 2 === 0 ? "💋" : "✨"}
          </motion.div>
        ))}

        {/* Ambient Luxury Glow Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[450px] h-[450px] bg-pink-500/30 rounded-full blur-[140px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" 
        />
      </div>

      {/* Main 3D Interactive Luxury Glass Card */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.7, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-white/10 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/30 shadow-[0_30px_90px_rgba(0,0,0,0.6)] max-w-md w-full text-center text-white z-10 overflow-hidden"
      >
        {/* Glowing border outline sheen */}
        <div className="absolute inset-0 rounded-[2.5rem] border border-pink-300/30 pointer-events-none" />

        {/* Floating 3D Lock Icon Header */}
        <motion.div 
          style={{ translateZ: 60 }}
          className="flex justify-center mb-5 relative"
        >
          <div className="absolute inset-0 bg-pink-500/40 blur-2xl rounded-full animate-ping" />
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="relative p-5 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl border border-white/30 shadow-[0_10px_25px_rgba(0,0,0,0.3)] text-pink-300"
          >
            <Lock size={42} className="drop-shadow-md" />
          </motion.div>
        </motion.div>

        {/* Title & Description with 3D Depth */}
        <motion.div style={{ translateZ: 40 }} className="space-y-2 mb-8">
          <h1 className="font-display text-3xl font-black bg-gradient-to-r from-white via-pink-200 to-pink-400 bg-clip-text text-transparent drop-shadow-sm flex items-center justify-center gap-2">
            For My Special Person <Sparkles className="text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} size={22} />
          </h1>
          <p className="text-sm text-pink-200/90 font-medium">
            Enter the secret password to open your luxury surprise! 💋✨
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.form style={{ translateZ: 50 }} onSubmit={handleLogin} className="space-y-5">
          <motion.div className="relative">
            <motion.input
              animate={error ? { x: [-15, 15, -15, 15, 0], borderColor: "#f87171" } : { borderColor: "rgba(236, 72, 153, 0.4)" }}
              transition={{ duration: 0.4 }}
              type="password"
              placeholder="Enter secret word..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-black/50 border text-white placeholder-pink-300/40 focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-500/40 text-center shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)] text-base font-medium transition-all"
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 15px 35px rgba(236, 72, 153, 0.6)" }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 rounded-2xl font-bold text-base shadow-[0_10px_25px_rgba(236,72,153,0.4)] transition duration-300 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Open Surprise</span> <span>✨</span>
          </motion.button>
        </motion.form>

        {/* Error notification prompt */}
        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -8, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            className="text-red-300 text-xs mt-4 font-semibold tracking-wide bg-red-950/40 py-2 px-3 rounded-xl border border-red-500/30"
          >
            Oops! Try again{attempts >= 2 ? " — hint: our special place" : ""} 🥺
          </motion.p>
        )}
      </motion.div>
    </main>
  );
}