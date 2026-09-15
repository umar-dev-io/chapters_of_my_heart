"use client";
import { motion } from "framer-motion";

export default function MemoryCard({ memory, index }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col md:flex-row items-center gap-6 my-12 ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="w-full md:w-1/2 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
        <span className="text-pink-300 text-sm font-semibold">{memory.date}</span>
        <h3 className="font-display text-xl font-bold mt-1 mb-2 text-white">{memory.title}</h3>
        <p className="text-pink-100/80 text-sm leading-relaxed">{memory.text}</p>
      </div>
    </motion.div>
  );
}