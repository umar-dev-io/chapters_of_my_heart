"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isUnlocked"); // Clear the unlock state so the lock screen appears
    router.push("/"); // Redirect to the main page where the lock screen checks this state
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleLogout}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs text-pink-200 hover:bg-white/20 shadow-lg transition cursor-pointer"
      title="Logout"
    >
      <LogOut size={16} />
      <span className="hidden sm:inline">Logout</span>
    </motion.button>
  );
}