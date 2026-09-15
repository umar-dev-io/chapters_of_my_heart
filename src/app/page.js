"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LockScreen from "@/components/LockScreen";
import FloatingHearts from "@/components/FloatingHearts";
import HeroSection from "@/components/HeroSection";
import Timeline from "@/components/Timeline";
import LoveReasons from "@/components/LoveReasons";
import LoveCoupons from "@/components/LoveCoupons";
import BirthdayCTA from "@/components/BirthdayCTA";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  const [unlocked, setUnlocked] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("isUnlocked") === "true";
    }
    return false;
  });

  return (
    <AnimatePresence mode="wait">
      {!unlocked ? (
        <motion.div key="lock" exit={{ opacity: 0, scale: 1.05 }}>
          <LockScreen onUnlock={() => setUnlocked(true)} />
        </motion.div>
      ) : (
        <motion.main
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative min-h-screen romantic-bg text-white"
        >
          <FloatingHearts />
            <MusicPlayer src="/audio/romantic.mp3" />
          <HeroSection />
          <Timeline />
          <LoveReasons />
          <LoveCoupons />
          <BirthdayCTA />
        </motion.main>
      )}
    </AnimatePresence>
  );
}