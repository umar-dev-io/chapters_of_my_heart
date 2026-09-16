"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Music, VolumeX, Sparkles } from "lucide-react";

export default function MusicPlayer({ src }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.log("Autoplay blocked by browser:", err);
        setPlaying(false);
      });
    }
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.log("Playback failed:", err));
    }
    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop />
      
      {/* Fixed Luxury Floating Controller (Positioned at bottom-right or top-right as needed) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed bottom-6 right-6 z-50 perspective-[1000px]"
      >
        <motion.button
          whileHover={{ scale: 1.08, y: -3, boxShadow: "0 15px 35px rgba(236,72,153,0.5)" }}
          whileTap={{ scale: 0.94 }}
          onClick={toggle}
          className="relative inline-flex items-center gap-2.5 px-4 py-3 md:px-5 md:py-3.5 bg-white/10 backdrop-blur-2xl border border-white/30 rounded-2xl text-white shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:border-pink-400/60 transition-all duration-300 cursor-pointer group overflow-hidden"
          aria-label="Toggle music"
        >
          {/* Subtle Inner Glow Accent */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-rose-500/10 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {playing ? (
            <>
              <div className="p-2 bg-pink-500/30 rounded-xl text-pink-300 border border-pink-500/40 shadow-inner relative">
                <Music size={18} className="animate-bounce" />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                </span>
              </div>
              <span className="text-xs md:text-sm font-semibold tracking-wide text-pink-100 hidden sm:inline">
                Music: <span className="text-pink-300 font-bold">ON 🎵</span>
              </span>
            </>
          ) : (
            <>
              <div className="p-2 bg-white/10 rounded-xl text-pink-300/70 border border-white/20">
                <VolumeX size={18} />
              </div>
              <span className="text-xs md:text-sm font-semibold tracking-wide text-pink-200/70 hidden sm:inline">
                Music: <span className="text-pink-300/70">OFF 🔇</span>
              </span>
            </>
          )}
        </motion.button>
      </motion.div>
    </>
  );
}