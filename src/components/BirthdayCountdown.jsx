"use client";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export default function BirthdayCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentDateStr, setCurrentDateStr] = useState("");
  const [currentTimeStr, setCurrentTimeStr] = useState("");
  const [isCelebrated, setIsCelebrated] = useState(false);

  useEffect(() => {
    // Target: September 17, 2026, 12:00 AM
    const targetDate = new Date("2026-09-17T00:00:00").getTime();

    const updateTimer = () => {
      const now = new Date();
      
      // Live current date and time formatting
      setCurrentDateStr(now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
      setCurrentTimeStr(now.toLocaleTimeString());

      const difference = targetDate - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // Auto-celebration triggers when time reaches 0
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (!isCelebrated) {
          setIsCelebrated(true);
          confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.5 },
            colors: ["#ec4899", "#f43f5e", "#ffd700", "#ffffff"],
          });
        }
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [isCelebrated]);

  return (
    <div className="w-full bg-black/20 backdrop-blur-md p-5 rounded-2xl border border-pink-500/30 text-center shadow-inner">
      <div className="text-xs uppercase tracking-widest text-pink-300 font-semibold mb-1">
        {currentDateStr} • {currentTimeStr}
      </div>
      <div className="text-xs text-pink-200/70 mb-4">
        {isCelebrated ? "🎉 It's Time! Happy Birthday! 🎉" : "Countdown to Sept 17, 2026, 12:00 AM"}
      </div>

      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-white/10 p-2 rounded-xl border border-white/10">
          <span className="block font-display text-xl font-bold text-white">{timeLeft.days}</span>
          <span className="text-[10px] text-pink-200/70 uppercase">Days</span>
        </div>
        <div className="bg-white/10 p-2 rounded-xl border border-white/10">
          <span className="block font-display text-xl font-bold text-white">{timeLeft.hours}</span>
          <span className="text-[10px] text-pink-200/70 uppercase">Hours</span>
        </div>
        <div className="bg-white/10 p-2 rounded-xl border border-white/10">
          <span className="block font-display text-xl font-bold text-white">{timeLeft.minutes}</span>
          <span className="text-[10px] text-pink-200/70 uppercase">Mins</span>
        </div>
        <div className="bg-white/10 p-2 rounded-xl border border-white/10">
          <span className="block font-display text-xl font-bold text-white">{timeLeft.seconds}</span>
          <span className="text-[10px] text-pink-200/70 uppercase">Secs</span>
        </div>
      </div>
    </div>
  );
}