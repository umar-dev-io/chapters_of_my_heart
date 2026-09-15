"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { reasons } from "@/data/loveReasons";
import { Heart } from "lucide-react";

export default function LoveReasons() {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const toggleFlip = (index) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <h2 className="font-display text-3xl font-bold text-center mb-4 bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent">
        Reasons Why I Love You 💖
      </h2>
      <p className="text-center text-pink-100/70 mb-12 text-sm">Click any card to reveal a secret note</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reasons.map((reason, index) => {
          const isFlipped = flippedIndex === index;
          return (
            <div
              key={index}
              onClick={() => toggleFlip(index)}
              className="h-48 cursor-pointer"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: "preserve-3d" }}
                className="w-full h-full relative rounded-2xl shadow-xl"
              >
                {/* Front Face */}
                <div 
                  style={{ backfaceVisibility: "hidden" }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl"
                >
                  <Heart size={32} className="text-pink-400 mb-3 animate-pulse" fill="currentColor" />
                  <span className="font-display font-semibold text-lg text-white">Reason #{index + 1}</span>
                  <span className="text-xs text-pink-200/60 mt-1">Tap to open</span>
                </div>

                {/* Back Face */}
                <div
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  className="absolute inset-0 flex items-center justify-center p-6 text-center bg-rose-950/90 border border-pink-500/30 rounded-2xl"
                >
                  <p className="text-pink-100 text-sm leading-relaxed">{reason}</p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}