"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Gift, Heart, Sparkles } from "lucide-react";

export default function GiftBoxSection() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    if (!isOpen) {
      setIsOpen(true);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#ec4899", "#f43f5e", "#ffd700", "#ffffff"],
      });
    }
  };

  return (
    <div className="w-full bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-2xl text-center my-6 relative overflow-hidden">
      <div className="flex justify-center mb-2 text-pink-300">
        <Sparkles size={22} />
      </div>
      <h3 className="font-display text-2xl font-bold text-white mb-2">
        A Special Surprise Gift! 🎁
      </h3>
      <p className="text-pink-100/80 text-xs md:text-sm mb-6">
        Tap the gift box below to unwrap your cute surprise!
      </p>

      {!isOpen ? (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenGift}
          className="cursor-pointer inline-flex flex-col items-center justify-center p-10 rounded-3xl bg-gradient-to-br from-pink-500/20 to-rose-500/30 border border-pink-500/40 shadow-xl group transition"
        >
          <Gift size={70} className="text-pink-300 mb-4 animate-bounce group-hover:scale-110 transition" />
          <span className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl font-semibold text-white shadow-lg text-xs md:text-sm">
            Click to Open Gift 💝
          </span>
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="flex flex-col items-center"
          >
            {/* HD Cute Red Teddy Bear Image */}
            <div className="relative w-full h-64 md:h-72 rounded-2xl overflow-hidden shadow-inner border border-white/10 bg-black/30 flex items-center justify-center mb-4">
              <img
                src="./images/teddyBear.png"
                alt="Cute Red Teddy Bear"
                className="w-full h-full object-contain hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-4">
                <span className="text-white font-semibold text-sm drop-shadow-md">
                  🧸 A cuddly red teddy bear just for you! ❤️
                </span>
              </div>
            </div>

            <p className="text-pink-200 text-xs md:text-sm font-medium mt-2 flex items-center justify-center gap-1.5">
              <Heart size={16} fill="currentColor" className="text-pink-400" /> Hope this brings a huge smile to your face!
            </p>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}