"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import FloatingHearts from "@/components/FloatingHearts";
import BirthdayHeader from "@/components/BirthdayHeader";
import BirthdayCountdown from "@/components/BirthdayCountdown";
import ScrollPrompt from "@/components/ScrollPrompt";
import CakeSection from "@/components/CakeSection";
import CakeCuttingAnimation from "@/components/CakeCuttingAnimation";
import GiftBoxSection from "@/components/GiftBoxSection";
import FinalWish from "@/components/FinalWish";
import SecretSection from "@/components/SecretSection";

export default function BirthdayPage() {
  const router = useRouter();

  useEffect(() => {
    const unlocked = localStorage.getItem("isUnlocked");
    if (!unlocked) {
      router.push("/");
      return;
    }
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
  }, [router]);

  return (
    <main className="relative min-h-screen romantic-bg text-white flex flex-col items-center py-20 px-6 overflow-x-hidden">
      <FloatingHearts count={20} />

      {/* Back Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs text-pink-200 hover:bg-white/20 transition z-20"
      >
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <div className="max-w-2xl w-full flex flex-col items-center space-y-8 relative z-10">
        {/* Component 1: Header */}
        <BirthdayHeader />

        {/* Component 2: Countdown */}
        <BirthdayCountdown />

        {/* Component 3: Scroll Down Prompt */}
        <ScrollPrompt />

        {/* Component 4: Cake Section */}
        <CakeSection />

         <CakeCuttingAnimation />
         <GiftBoxSection />
           <FinalWish />
           <SecretSection />
        <div className="pt-8 border-t border-white/10 w-full text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl font-semibold shadow-lg hover:opacity-90 transition text-sm"
          >
            <Heart size={16} fill="currentColor" /> Return to Our Memories
          </Link>
        </div>
      </div>
    </main>
  );
}