"use client";
import { memories } from "@/data/memories";
import MemoryCard from "./MemoryCard";

export default function Timeline() {
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto relative">
      <h2 className="font-display text-3xl font-bold text-center mb-16 bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent">
        Our Journey Together ❤️
      </h2>
      <div className="relative">
        {/* Center vertical path line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500/50 via-rose-500/50 to-purple-500/50 hidden md:block" />
        
        {memories.map((memory, index) => (
          <MemoryCard key={index} memory={memory} index={index} />
        ))}
      </div>
    </section>
  );
}