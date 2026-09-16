"use client";
import { memories } from "@/data/memories";
import MemoryCard from "./MemoryCard";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

export default function Timeline() {
  const containerRef = useRef(null);
  
  // Track scroll progress for a luxury dynamic scroll indicator effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="py-32 px-6 max-w-5xl mx-auto relative perspective-[1500px] overflow-hidden">
      
      {/* Background Luxury Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Section Header with 3D Pop Animation */}
      <motion.div
        initial={{ opacity: 0, y: -30, rotateX: -20 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="font-display text-4xl md:text-5xl font-black text-center mb-24 bg-gradient-to-r from-white via-pink-200 to-rose-300 bg-clip-text text-transparent drop-shadow-[0_10px_20px_rgba(236,72,153,0.3)]">
          Our Journey Together ❤️
        </h2>
      </motion.div>

      <div className="relative">
        {/* Center vertical path baseline track */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1.5 bg-white/10 rounded-full hidden md:block overflow-hidden">
          {/* Animated scroll progress fill */}
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute inset-0 bg-gradient-to-b from-pink-500 via-rose-500 to-purple-600 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.8)]"
          />
        </div>
        
        {/* Memory Items Stack with 3D Staggered Entrance */}
        <div className="space-y-16 md:space-y-24">
          {memories.map((memory, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, rotateX: 15, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="transform-gpu"
            >
              <MemoryCard memory={memory} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}