"use client";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ThanksCard({ title, message, buttonText, buttonHref }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="max-w-xl w-full bg-white/10 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/20 shadow-2xl text-center relative z-10"
    >
      <div className="flex justify-center mb-4 text-pink-400">
        <Sparkles size={40} className="animate-pulse" />
      </div>

      <h1 className="font-display text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 bg-clip-text text-transparent">
        {title}
      </h1>

      <p className="text-pink-100/90 text-sm md:text-base leading-relaxed mb-8">
        {message}
      </p>

      <div className="flex justify-center">
        <Link
          href={buttonHref}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl font-semibold shadow-lg hover:opacity-90 transition text-sm"
        >
          <Heart size={16} fill="currentColor" /> {buttonText}
        </Link>
      </div>
    </motion.div>
  );
}