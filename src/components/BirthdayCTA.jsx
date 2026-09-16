"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { Cake, Sparkles } from "lucide-react";

export default function BirthdayCTA() {
  const router = useRouter();

  // 3D Tilt Effect Hooks
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [12, -12]);
  const rotateY = useTransform(x, [-100, 100], [-12, 12]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="py-28 px-6 max-w-4xl mx-auto text-center perspective-[1200px] relative">
      {/* Background Luxury Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/15 rounded-full blur-[150px] pointer-events-none -z-10" />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/10 backdrop-blur-2xl p-10 md:p-14 rounded-[2.5rem] border border-white/30 shadow-[0_25px_60px_rgba(0,0,0,0.5)] relative overflow-hidden group"
      >
        {/* Subtle sheen highlight border overlay */}
        <div className="absolute inset-0 rounded-[2.5rem] border border-pink-300/30 pointer-events-none" />

        {/* Floating 3D Cake Header */}
        <motion.div 
          style={{ translateZ: 50 }}
          className="flex justify-center mb-6 relative"
        >
          <div className="absolute inset-0 bg-pink-500/40 blur-2xl rounded-full animate-pulse" />
          <div className="relative p-5 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl border border-white/30 shadow-inner text-pink-300">
            <Cake size={52} className="animate-bounce drop-shadow-md" />
          </div>
        </motion.div>

        {/* Text Details with Depth */}
        <motion.div style={{ translateZ: 30 }} className="space-y-3 mb-8">
          <h2 className="font-display text-3xl md:text-5xl font-black text-white tracking-wide bg-gradient-to-r from-white via-pink-200 to-rose-300 bg-clip-text text-transparent drop-shadow-sm">
            Ready for the Main Celebration? 🎉
          </h2>
          <p className="text-pink-100/90 text-sm md:text-base max-w-md mx-auto font-medium">
            Let’s blow out the candles and step into your special birthday surprise page! ✨
          </p>
        </motion.div>

        {/* Interactive Luxury Button */}
        <motion.div style={{ translateZ: 40 }} className="inline-block">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(236,72,153,0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/birthday")}
            className="inline-flex items-center gap-2.5 px-9 py-4.5 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold rounded-2xl shadow-[0_10px_25px_rgba(236,72,153,0.4)] transition duration-300 cursor-pointer text-base tracking-wide"
          >
            <Sparkles size={20} className="text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} /> 
            <span>Let’s Celebrate Birthday!</span> <span>🎂</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}