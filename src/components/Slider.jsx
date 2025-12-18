import React from "react";

// const images = [
//   "/slider/1.png",
//   "/slider/2.png",
//   "/slider/3.png",
// ];
const images = [
  "/trump_logo.jpeg",
  "/trump_logo.jpeg",
  "/trump_logo.jpeg",
];

export default function HorizontalCardMarquee() {
  return (
    <section className="overflow-hidden py-10 bg-gray-100">
      <div className="relative w-full">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...images, ...images].map((img, idx) => (
            <div
              key={idx}
              className="inline-block w-80 h-48 flex-shrink-0 rounded-xl shadow-lg overflow-hidden mr-6 bg-gray-200"
            >
              <img
                src={img}
                alt={`Card ${idx + 1}`}
                className="w-full h-full object-cover object-center p-5"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </section>
  );
}
