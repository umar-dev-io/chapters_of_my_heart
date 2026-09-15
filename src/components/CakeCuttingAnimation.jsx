"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Utensils } from "lucide-react";

export default function CakeCuttingAnimation() {
  const [isCut, setIsCut] = useState(false);

  const handleCutCake = () => {
    if (!isCut) {
      setIsCut(true);
      confetti({
        particleCount: 120,
        spread: 90,
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
        Time to Cut the Cake! 🎂
      </h3>
      <p className="text-pink-100/80 text-xs md:text-sm mb-6">
        Tap below to slide the knife and slice the birthday cake!
      </p>

      {/* HD Cake Image Container with Knife Animation */}
      <div className="relative w-full h-64 md:h-72 rounded-2xl overflow-hidden shadow-inner border border-white/10 bg-black/30 flex items-center justify-center">
        {/* HD Online Cake Image */}
        <img 
          src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop" 
          alt="HD Birthday Cake" 
          className={`w-full h-full object-cover transition-transform duration-700 ${isCut ? "scale-105 brightness-95" : "scale-100"}`}
        />

        {/* Split/Cut visual effect line */}
        {isCut && (
          <motion.div 
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-y-0 w-1 bg-pink-400 shadow-[0_0_15px_#f43f5e] z-10"
          />
        )}

        {/* Animated Knife */}
        <motion.div
          animate={
            isCut 
              ? { x: [0, -120, 150], y: [0, 80, 140], rotate: [0, -35, -45] } 
              : { x: [0, 10, 0], y: [0, -5, 0] }
          }
          transition={
            isCut 
              ? { duration: 0.8, ease: "easeInOut" } 
              : { repeat: Infinity, duration: 2, ease: "easeInOut" }
          }
          className="absolute z-20 text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] pointer-events-none"
        >
          <div className="bg-gradient-to-r from-slate-200 to-slate-400 w-16 h-3 rounded-full shadow-lg border border-white flex items-center pl-2">
            <span className="text-[10px] text-slate-800 font-bold">🔪</span>
          </div>
        </motion.div>
      </div>

      {/* Action Button */}
      <div className="mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCutCake}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl shadow-lg hover:opacity-95 transition text-xs md:text-sm cursor-pointer"
        >
          <Utensils size={16} /> {isCut ? "Cake Successfully Cut! 🎉" : "Slice the Cake 🔪"}
        </motion.button>
      </div>
    </div>
  );
}