"use client";
import React from "react";

export default function Features() {
  const features = [
    {
      title: "Real-Time Poll Creation",
      description:
        "Create stunning, interactive polls in seconds with a smooth and intuitive interface. Designed for speed and simplicity.",
      image: "/This Is Not Normal-images/6.png",
    },
    {
      title: "AI-Powered Insights",
      description:
        "Get predictions, suggestions, and analytics powered by our advanced AI engine. Make smarter decisions instantly.",
      image: "/This Is Not Normal-images/9.png",
    },
    {
      title: "Deep Analytics Dashboard",
      description:
        "Track responses, engagement rates, demographics, and voting patterns with a beautiful, real-time analytics dashboard.",
      image: "/This Is Not Normal-images/11.png",
    },
    {
      title: "Engagement-Boosting Tools",
      description:
        "Promote polls, increase reach, and boost engagement using built-in sharing tools and social media optimization.",
      image: "/This Is Not Normal-images/17.png",
    },
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl font-black mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Powerful Features
        </h2>
        <p className="text-xl text-gray-300 mb-16">
          Everything you need to create engaging polls that stand out
        </p>
      </div>

      <div className="space-y-24 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
            } items-center gap-10`}
          >
            {/* Image */}
            <div className="flex-1 relative">
              <div className="absolute inset-0 rounded-2xl blur-2xl bg-yellow-500/10"></div>
              <img
                src={feature.image}
                alt={feature.title}
                className="relative w-full rounded-2xl border border-white/10 shadow-xl shadow-yellow-500/20"
              />
            </div>

            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
