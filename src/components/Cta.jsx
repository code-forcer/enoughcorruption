"use client";
import React, { useState, useEffect } from "react";
import {
  Mail,
  Rocket,
} from "lucide-react";
export default function Cta() {
  return (
    <>
    <section
  id="contact"
  className="
    relative
    py-24
    px-4 sm:px-6 lg:px-8
    bg-cover bg-center
  "
  style={{
    backgroundImage: "url('/hero/2.jpg')"
  }}
>
  {/* ----- Overlay layers ----- */}
  <div className="absolute inset-0 z-0">
    {/* Primary dark dim */}
    <div className="absolute inset-0 bg-black/65" />
    {/* Subtle color wash */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-700/20 via-purple-600/15 to-transparent" />
  </div>

  {/* ----- Content ----- */}
  <div className="relative z-10 max-w-4xl mx-auto text-center">
    <h2 className="text-3xl sm:text-5xl font-black mb-4 text-white">
      Get In Touch
    </h2>

    <p className="text-lg sm:text-xl text-gray-300 mb-12">
      Have questions? We'd love to hear from you.
    </p>

    <div className="
      bg-black/40
      backdrop-blur-md
      rounded-2xl
      p-8
      border border-white/10
      shadow-lg
    ">
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/contact"
          className="
            flex items-center justify-center gap-2
            px-6 py-3
            bg-blue-600 hover:bg-blue-500
            rounded-lg font-semibold
            transition-colors
            text-white
          "
        >
          <Mail className="w-5 h-5 text-white" />
          Contact/Email Us
        </a>

        <a
          href="/dashboard"
          className="
            flex items-center justify-center gap-2
            px-6 py-3 text-white
            bg-white/10 hover:bg-white/20
            rounded-lg font-semibold
            border border-white/20
            transition-colors
          "
        >
          <Rocket className="w-5 h-5 " />
          Get Started
        </a>
      </div>
    </div>
  </div>
</section>
    </>
  )
}
