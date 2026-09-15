"use client";
import { Clock } from "lucide-react";

export default function BirthdayHeader() {
  return (
    <div className="text-center mb-6">
      <div className="flex justify-center mb-3 text-pink-400">
        <Clock size={40} className="animate-pulse" />
      </div>
      <h1 className="font-display text-2xl md:text-4xl font-bold bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 bg-clip-text text-transparent">
        Just a few time left... Can&apos;t wait! ✨
      </h1>
    </div>
  );
}