"use client";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
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
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#ec4899", "#f43f5e", "#ff7eb3", "#ffd700", "#ffffff"],
      });

      const updated = { ...redeemed, [index]: true };
      setRedeemed(updated);
      localStorage.setItem("redeemedCoupons", JSON.stringify(updated));
    }
  };

  return (
    <section className="py-28 px-6 max-w-5xl mx-auto relative perspective-[1200px]">
      {/* Background Luxury Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold mb-4 border border-pink-500/30 shadow-inner">
            <Sparkles size={14} className="text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} /> Special Rewards
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-white via-pink-200 to-rose-300 bg-clip-text text-transparent drop-shadow-[0_10px_20px_rgba(236,72,153,0.3)]">
            Love Coupons 🎟️
          </h2>
          <p className="text-pink-100/80 text-sm md:text-base max-w-md mx-auto font-medium">
            Click any coupon to instantly redeem your special treat. Saved forever just for you! ✨
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {coupons.map((coupon, index) => {
          const isRedeemed = redeemed[index];

          return (
            <CouponCard 
              key={index} 
              coupon={coupon} 
              index={index} 
              isRedeemed={isRedeemed} 
              handleRedeem={handleRedeem} 
            />
          );
        })}
      </div>
    </section>
  );
}

// Sub-component for individual 3D interactive tilt cards
function CouponCard({ coupon, index, isRedeemed, handleRedeem }) {
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
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03, y: -6 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => handleRedeem(index)}
      className={`relative overflow-hidden p-8 rounded-3xl border backdrop-blur-2xl cursor-pointer transition-colors duration-500 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] group ${
        isRedeemed
          ? "bg-gradient-to-br from-rose-950/80 via-purple-950/60 to-black/80 border-pink-500/30 opacity-85 shadow-[0_10px_30px_rgba(159,18,57,0.3)]"
          : "bg-white/10 border-white/20 hover:border-pink-400/60 hover:shadow-[0_20px_40px_rgba(236,72,153,0.2)]"
      }`}
    >
      {/* Background Glow Accent */}
      {!isRedeemed && (
        <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-pink-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-pink-500/30 transition-all duration-500" />
      )}

      <div style={{ translateZ: 30 }}>
        <div className="flex justify-between items-start mb-5">
          <div className={`p-3.5 rounded-2xl shadow-inner border transition-all duration-300 ${
            isRedeemed 
              ? "bg-rose-900/40 text-pink-300 border-rose-500/30" 
              : "bg-pink-500/20 text-pink-400 border-pink-500/30 group-hover:scale-110"
          }`}>
            <Ticket size={30} />
          </div>
          {isRedeemed ? (
            <span className="flex items-center gap-1.5 text-green-300 text-xs font-semibold bg-green-500/20 px-3 py-1.5 rounded-full border border-green-500/40 shadow-sm">
              <CheckCircle2 size={15} /> Redeemed
            </span>
          ) : (
            <span className="text-xs text-pink-200/90 font-semibold bg-white/10 px-3 py-1.5 rounded-full border border-white/20 shadow-sm">
              Tap to claim ✨
            </span>
          )}
        </div>

        <h3 className="font-display text-2xl font-bold text-white mb-2 tracking-wide drop-shadow-sm">
          {coupon.title}
        </h3>
        <p className="text-pink-100/80 text-sm leading-relaxed mb-8 font-medium">
          {coupon.description}
        </p>
      </div>

      <div style={{ translateZ: 20 }} className="flex justify-between items-center border-t border-white/15 pt-5 text-xs font-mono">
        <span className="text-pink-200/90 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 shadow-inner">
          CODE: {coupon.code}
        </span>
        <span className={`font-sans font-bold tracking-wider text-sm ${isRedeemed ? "text-green-400" : "text-pink-300 animate-pulse"}`}>
          {isRedeemed ? "Claimed ❤️" : "Redeem Now →"}
        </span>
      </div>
    </motion.div>
  );
}