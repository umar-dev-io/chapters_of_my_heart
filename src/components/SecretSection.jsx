"use client";
import { motion } from "framer-motion";
import { Lock, Sparkles } from "lucide-react";
import Link from "next/link";

export default function SecretSection() {
  return (
    <div className="w-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-rose-500/20 backdrop-blur-xl p-8 rounded-3xl border border-purple-500/30 shadow-2xl text-center my-6 relative overflow-hidden">
      <div className="flex justify-center mb-3 text-pink-300">
        <Lock size={32} className="animate-pulse" />
      </div>

      <h3 className="font-display text-2xl font-bold text-white mb-2">
        One Last Hidden Surprise... 🤫
      </h3>
      <p className="text-pink-100/80 text-xs md:text-sm mb-6 max-w-sm mx-auto">
        There is a secret message waiting behind this door just for you. Are you ready?
      </p>

      <Link href="/secret">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white font-semibold rounded-2xl shadow-xl shadow-purple-500/30 hover:opacity-95 transition text-xs md:text-sm cursor-pointer"
        >
          <Sparkles size={16} /> Go to Secret Page ✨
        </motion.button>
      </Link>
    </div>
  );
}