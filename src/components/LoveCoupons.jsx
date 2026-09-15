"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { coupons } from "@/data/coupons";
import { Ticket, CheckCircle2, Sparkles } from "lucide-react";

export default function LoveCoupons() {
  const [redeemed, setRedeemed] = useState({});

  // Load saved redemption state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("redeemedCoupons");
    if (saved) {
      try {
        setRedeemed(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse redeemed coupons", e);
      }
    }
  }, []);

  const handleRedeem = (index) => {
    if (!redeemed[index]) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ec4899", "#f43f5e", "#fb7185", "#ffd700"],
      });

      const updated = { ...redeemed, [index]: true };
      setRedeemed(updated);
      localStorage.setItem("redeemedCoupons", JSON.stringify(updated));
    }
  };

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold mb-3 border border-pink-500/30">
          <Sparkles size={14} /> Special Rewards
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 bg-clip-text text-transparent">
          Love Coupons 🎟️
        </h2>
        <p className="text-pink-100/70 text-sm max-w-md mx-auto">
          Click any coupon to instantly redeem your special treat. Saved forever just for you!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coupons.map((coupon, index) => {
          const isRedeemed = redeemed[index];
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRedeem(index)}
              className={`relative overflow-hidden p-6 rounded-2xl border backdrop-blur-xl cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-2xl ${
                isRedeemed
                  ? "bg-rose-950/50 border-pink-500/30 opacity-80 shadow-rose-950/50"
                  : "bg-white/10 border-white/20 hover:border-pink-400/50 hover:shadow-pink-500/10"
              }`}
            >
              {/* Background Glow Accent */}
              {!isRedeemed && (
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
              )}

              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${isRedeemed ? "bg-rose-900/40 text-pink-300" : "bg-pink-500/20 text-pink-400"}`}>
                    <Ticket size={28} />
                  </div>
                  {isRedeemed ? (
                    <span className="flex items-center gap-1 text-green-300 text-xs font-medium bg-green-500/20 px-2.5 py-1 rounded-full border border-green-500/30">
                      <CheckCircle2 size={14} /> Redeemed
                    </span>
                  ) : (
                    <span className="text-xs text-pink-300/80 font-medium bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                      Tap to claim ✨
                    </span>
                  )}
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-2 tracking-wide">
                  {coupon.title}
                </h3>
                <p className="text-pink-100/80 text-sm leading-relaxed mb-6">
                  {coupon.description}
                </p>
              </div>

              <div className="flex justify-between items-center border-t border-white/10 pt-4 text-xs font-mono">
                <span className="text-pink-300/90 bg-black/20 px-2 py-1 rounded">
                  CODE: {coupon.code}
                </span>
                <span className={`font-sans font-semibold tracking-wider ${isRedeemed ? "text-green-400" : "text-pink-300 animate-pulse"}`}>
                  {isRedeemed ? "Claimed ❤️" : "Redeem Now →"}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}