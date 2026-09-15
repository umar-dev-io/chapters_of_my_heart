"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import RomanticCoupleSection from "@/components/RomanticCoupleSection";
import FloatingHearts from "@/components/FloatingHearts";
import LoveNotesGenerator from "@/components/LoveNotesGenerator";
import ThanksCard from "@/components/ThanksCard";

export default function SecretPage() {
  const router = useRouter();

  useEffect(() => {
    const unlocked = localStorage.getItem("isUnlocked");
    if (!unlocked) {
      router.push("/");
    }
  }, [router]);

  return (
    <>
      <main className="relative min-h-screen romantic-bg text-white flex flex-col items-center justify-center py-20 px-6 overflow-x-hidden gap-8">
        <FloatingHearts count={25} />

        {/* Back Button */}
        <Link
          href="/birthday"
          className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs text-pink-200 hover:bg-white/20 transition z-20"
        >
          <ArrowLeft size={16} /> Back to Celebration
        </Link>

        {/* Romantic Couple Section fitted nicely */}
        <div className="max-w-xl w-full z-10">
          <RomanticCoupleSection />
        </div>

        <div className="max-w-xl w-full z-10">
            <LoveNotesGenerator />
        </div>


        {/* Thanks Card Section */}
        <div className="max-w-xl w-full z-10">
          <ThanksCard 
            title="You Found Our Ultimate Secret! 🤫❤️"
            message="This secret place is just for you. Out of all the paths in the world, my favorite journey is the one we share together. Thank you for being my everything! ✨"
            buttonText="Home"
            buttonHref="/"
          />
        </div>
      </main>
    </>
  );
}