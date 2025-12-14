"use client";
import React from "react";
import { MdBarChart, MdPeople, MdRocketLaunch } from "react-icons/md";

export default function About() {
  return (
    <>
      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-black mb-4 text-white">
              About This Is Not Normal
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center">
              We're revolutionizing how people can sound off, share their opinions,
              <br />
              and recognize that they are not alone.
              <br />
              Shout it out, call out what is wrong and immoral.
              <br />
              <strong>This Is NOT Normal.</strong>
            </p>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center mt-6">
              This Is Not Normal is Outrage, Crowdsourced. Be part of it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="rounded-xl p-6 border border-blue-500/30">
              <div className="w-12 h-12 bg-white text-black rounded-lg flex items-center justify-center mb-4">
                <MdBarChart size={26} />
              </div>
              <h3 className="text-xl font-bold mb-2">Real-Time Results</h3>
              <p className="text-gray-300">
                Watch responses come in live with clear, instant visual feedback.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl p-6 border border-blue-500/30">
              <div className="w-12 h-12 bg-white text-black rounded-lg flex items-center justify-center mb-4">
                <MdPeople size={26} />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Sharing</h3>
              <p className="text-gray-300">
                Share polls instantly and let others know they are not alone.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-xl p-6 border border-blue-500/30">
              <div className="w-12 h-12 bg-white text-black rounded-lg flex items-center justify-center mb-4">
                <MdRocketLaunch size={26} />
              </div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-gray-300">
                Built for speed so outrage travels as fast as truth demands.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
