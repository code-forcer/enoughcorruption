"use client";
import React from "react";
import { Rocket } from "lucide-react";
import { FaRocket } from "react-icons/fa";

export default function Hero() {
  return (
    <>
      <section
        id="home"
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: "url('/hero/1.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative max-w-7xl mx-auto text-center">
              {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent leading-tight">
           Have You Had Enough?
          </h1>

          {/* Client exact text */}
          <p className="text-lg sm:text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            Here's your platform to sound off with thousands of others to voice
            your outrage.
          </p>

          <p className="text-lg sm:text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            You can submit your opinions, anonymously, on over 1,000 Trump actions.
           Not just what he did this week but what he has been doing since his Inauguration!
          </p>

          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Ready to go? Let's get started.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <a
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-bold text-xl shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transform hover:scale-105 transition-all"
            >
              <Rocket className="w-6 h-6" />
              Let's Go
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
