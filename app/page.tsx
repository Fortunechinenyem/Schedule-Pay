"use client";

import AnimatedCard from "@/components/home/AnimatedCard";
import FeatureGrid from "@/components/home/FeatureGrid";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <section className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
          SchedulePay
        </h1>
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90">
          Automate contractor payments with{" "}
          <span className="font-semibold text-cyan-400">zero hassle</span>.
        </p>

        <div className="flex gap-4 justify-center">
          <button className="px-8 py-3 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-200 transition flex items-center gap-2">
            <Link href="/signup">Get Started</Link>
          </button>
          <button className="px-8 py-3 border border-cyan-400 text-cyan-400 rounded-full font-bold hover:bg-cyan-400/10 transition">
            <Link href="/">How It Works</Link>
          </button>
        </div>
      </section>

      <AnimatedCard />

      <FeatureGrid />
    </div>
  );
}
