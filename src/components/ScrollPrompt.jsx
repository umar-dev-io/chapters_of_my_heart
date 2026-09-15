"use client";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function ScrollPrompt() {
  return (
    <div className="flex flex-col items-center justify-center my-8 text-pink-300 text-center">
      <span className="text-xs uppercase tracking-widest font-semibold mb-2 text-pink-200/80">
        Scroll down for cake celebration
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
      >
        <ArrowDown size={20} className="text-pink-300" />
      </motion.div>
    </div>
  );
}