"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function RomanticCoupleSection() {
  const [floatingElements, setFloatingElements] = useState([]);

  // Generate fewer floating kiss emojis periodically from the center
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      setFloatingElements((prev) => [...prev.slice(-2), id]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-2xl text-center my-6 relative overflow-hidden">
      <div className="flex justify-center mb-2 text-pink-300">
        <Sparkles size={22} />
      </div>
      <h3 className="font-display text-2xl font-bold text-white mb-2">
        Forever & Always Together ✨
      </h3>
      <p className="text-pink-100/80 text-xs md:text-sm mb-6 max-w-sm mx-auto">
        Every moment with you feels like pure magic. Here is to all our sweet moments and endless cuddles!
      </p>

      {/* Controlled Width Image Container */}
      <div className="relative w-full max-w-md mx-auto h-64 md:h-72 rounded-2xl overflow-hidden shadow-inner border border-white/10 bg-black/40 flex items-center justify-center p-2">
        <motion.img
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src="./images/cupple.png"
          alt="Two Teddy Bears Kissing"
          className="w-full h-full object-contain drop-shadow-2xl"
        />

        {/* Floating Kiss Emoji Animations emerging from the center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <AnimatePresence>
            {floatingElements.map((id) => (
              <motion.div
                key={id}
                initial={{ opacity: 1, scale: 0.6, y: 10, x: 0 }}
                animate={{ 
                  opacity: [1, 1, 0], 
                  scale: [0.6, 1.2, 1.4], 
                  y: [-10, -70, -110], 
                  x: [(Math.random() - 0.5) * 30] 
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
                className="absolute text-xl select-none"
              >
                💋
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center pb-3 pt-6 pointer-events-none">
          <span className="text-white font-semibold text-xs md:text-sm drop-shadow-md flex items-center gap-1.5">
            <span className="text-base">💋</span> Two hearts beating as one ❤️
          </span>
        </div>
      </div>
    </div>
  );
}