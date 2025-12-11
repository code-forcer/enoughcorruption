"use client";
import React from "react";
import { BarChart3, Users, Rocket } from "lucide-react";

export default function About() {
  return (
    <>
      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-black mb-4 bg-clip-text text-white">
              About ENOUGH!
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're revolutionizing how people sound off, share their opinions
              and recognize that they are not alone. This is NOT normal.
            </p>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto mt-6">
              This is Outrage, Crowdsourced. Be part of it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl p-6 border border-blue-500/30">
              <div className="w-12 h-12 bg-white text-black rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Real-Time Results</h3>
              <p className="text-gray-300">
                Watch responses come in live with stunning visualizations
              </p>
            </div>

            <div className="rounded-xl p-6 border border-blue-500/30">
              <div className="w-12 h-12 bg-white text-black rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Sharing</h3>
              <p className="text-gray-300">
                Share polls instantly across all your platforms
              </p>
            </div>

            <div className="rounded-xl p-6 border border-blue-500/30">
              <div className="w-12 h-12 bg-white text-black rounded-lg flex items-center justify-center mb-4">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-gray-300">
                Built with cutting-edge technology for maximum speed
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
