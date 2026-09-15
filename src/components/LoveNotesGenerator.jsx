"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, MessageCircleHeart } from "lucide-react";

const romanticNotes = [
  "Every second spent with you is like a dream come true. ✨",
  "Your smile is the absolute highlight of my entire day. 💖",
  "I never knew what true love meant until I found you. 🌹",
  "You are my home, my safe place, and my greatest adventure. 🗺️",
  "No matter where life takes us, my heart will always belong to you. 💞",
];

export default function LoveNotesGenerator() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextNote = () => {
    setCurrentIndex((prev) => (prev + 1) % romanticNotes.length);
  };

  return (
    <div className="w-full bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-2xl text-center my-6 relative overflow-hidden">
      <div className="flex justify-center mb-2 text-pink-300">
        <MessageCircleHeart size={24} />
      </div>
      <h3 className="font-display text-2xl font-bold text-white mb-2">
        Daily Love Notes 💌
      </h3>
      <p className="text-pink-100/80 text-xs md:text-sm mb-6">
        Tap below to reveal a sweet message straight from the heart.
      </p>

      <div className="min-h-[90px] flex items-center justify-center mb-6 px-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-pink-100 font-medium text-sm md:text-base italic"
          >
            "{romanticNotes[currentIndex]}"
          </motion.p>
        </AnimatePresence>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNextNote}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl shadow-lg hover:opacity-95 transition text-xs md:text-sm cursor-pointer"
      >
        <Sparkles size={16} /> Another Note ✨
      </motion.button>
    </div>
  );
}