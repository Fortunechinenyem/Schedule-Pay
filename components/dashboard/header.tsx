"use client";
import { auth } from "@/lib/firebase";
import { FiLogOut, FiBell, FiUser } from "react-icons/fi";

export default function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-800 p-4 flex justify-between items-center">
      <div className="flex-1">
        <h2 className="text-xl font-semibold">Payment Dashboard</h2>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-cyan-400">
          <FiBell size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
            <FiUser size={16} />
          </div>
          <button
            onClick={() => auth.signOut()}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-cyan-400"
          >
            Logout <FiLogOut size={14} />
          </button>
        </div>
      </div>
    </header>
  );
}
