"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Lock } from "lucide-react";

const SECRET_PASSWORD = process.env.NEXT_PUBLIC_SECRET_PASSWORD || "defaultfallback";

export default function LockScreen({ onUnlock }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password.trim().toLowerCase() === SECRET_PASSWORD.toLowerCase()) {
      localStorage.setItem("isUnlocked", "true");
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      onUnlock();
    } else {
      setError(true);
      setAttempts((a) => a + 1);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <main className="min-h-screen romantic-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl max-w-md w-full text-center text-white"
      >
        <div className="flex justify-center mb-4 text-pink-400">
          <Lock size={48} />
        </div>
        <h1 className="font-display text-2xl font-bold mb-2">For My Special Person ❤️</h1>
        <p className="text-sm text-pink-200 mb-6">Enter the secret password to open your surprise!</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <motion.input
            animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
            type="password"
            placeholder="Enter secret word..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-pink-500/30 text-white placeholder-pink-300/50 focus:outline-none focus:border-pink-500 text-center"
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl font-semibold shadow-lg hover:opacity-90 transition duration-300"
          >
            Open Surprise ✨
          </button>
        </form>

        {error && (
          <p className="text-red-300 text-xs mt-3">
            Oops! Try again{attempts >= 2 ? " — hint: our special place" : ""}
          </p>
        )}
      </motion.div>
    </main>
  );
}