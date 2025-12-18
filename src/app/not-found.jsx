"use client";

import Link from "next/link";
import { ArrowLeftCircle, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-black relative">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-500/10 to-cyan-500/10 blur-3xl" />

      <div className="relative z-10 max-w-xl mx-auto">
        {/* Big Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl shadow-blue-500/20">
            <SearchX className="w-16 h-16 text-blue-400" />
          </div>
        </div>

        <h1 className="text-5xl sm:text-7xl font-black mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          404
        </h1>

        <p className="text-gray-300 text-lg sm:text-xl mb-8">
          Oops… The page you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-bold text-lg text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all"
        >
          <ArrowLeftCircle className="w-6 h-6" />
          Return Home
        </Link>
      </div>
    </main>
  );
}
