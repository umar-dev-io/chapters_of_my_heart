"use client";
import { useRef, useState, useEffect } from "react";
import { Music, Pause } from "lucide-react";

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
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop />
      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 hover:bg-white/20 transition"
        aria-label="Toggle music"
      >
        {playing ? <Pause size={20} /> : <Music size={20} />}
      </button>
    </>
  );
}