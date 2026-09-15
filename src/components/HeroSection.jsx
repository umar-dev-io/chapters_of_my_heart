"use client";
import { motion } from "framer-motion";
import { Heart, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

function useTypewriter(text, speed = 40) {
  const [output, setOutput] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setOutput(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return output;
}

export default function HeroSection() {
  const message = useTypewriter("Welcome to a tiny corner of the internet built just for you...");

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-2xl">
        <div className="flex justify-center text-pink-400 animate-bounce">
          <Heart size={64} fill="currentColor" />
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 bg-clip-text text-transparent">
          Happy Birthday, My Love!
        </h1>
        <p className="text-lg text-pink-100/80 min-h-[3rem]">{message}</p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
        className="absolute bottom-10 text-pink-300"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}