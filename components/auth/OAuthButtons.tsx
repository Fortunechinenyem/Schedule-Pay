"use client";
import { signInWithGoogle } from "@/lib/auth";
import { motion } from "framer-motion";

export default function OAuthButtons() {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-800 text-gray-400">
            Or continue with
          </span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={signInWithGoogle}
        className="mt-6 w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/5 border border-gray-600 rounded-lg hover:bg-white/10 transition"
      >
        <img src="/google-icon.svg" alt="Google" className="h-5 w-5" />
        <span className="text-gray-200 font-medium">Google</span>
      </motion.button>
    </div>
  );
}
