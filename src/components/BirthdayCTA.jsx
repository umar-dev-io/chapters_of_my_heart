"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Cake, Sparkles } from "lucide-react";

export default function BirthdayCTA() {
  const router = useRouter();

  return (
    <section className="py-20 px-6 max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-pink-500/20 via-rose-500/25 to-purple-500/20 backdrop-blur-xl p-10 rounded-3xl border border-pink-500/30 shadow-2xl relative overflow-hidden"
      >
        <div className="flex justify-center mb-4 text-pink-300">
          <Cake size={48} className="animate-bounce" />
        </div>

        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white">
          Ready for the Main Celebration? 🎉
        </h2>
        <p className="text-pink-100/80 text-sm md:text-base mb-8 max-w-md mx-auto">
          Let’s blow out the candles and step into your special birthday surprise page!
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/birthday")}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-2xl shadow-xl shadow-pink-500/30 hover:opacity-90 transition duration-300 cursor-pointer"
        >
          <Sparkles size={20} /> Let’s Celebrate Birthday! 🎂
        </motion.button>
      </motion.div>
    </section>
  );
}