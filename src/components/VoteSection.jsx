// VoteSection.jsx
"use client";
import React from "react";
import { MdErrorOutline } from "react-icons/md";

export default function VoteSection({
  activeQuestion,
  hasVoted,
  selectedTerms,
  toggleTerm,
  submitVote,
  setSelectedTerms,
  FIXED_TERMS,
  prevPoll,
  nextPoll,
  animationClass,
  loading,
}) {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white/5 border border-white/10  p-8">

        {/* ===================== HEADER ===================== */}
        <div className="mb-6">
          <div className={animationClass}>
            <h2 className="text-3xl font-bold italic text-white mb-2">
              {activeQuestion ? activeQuestion.text : "No active question"}
              &nbsp; - &nbsp;
              <span className="text-white text-sm">
                {activeQuestion?.pubDate
                  ? new Date(activeQuestion.pubDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "No date"}
              </span>
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 mt-2">
                  Select ALL descriptions that apply (multiple selections allowed)
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={prevPoll}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 text-sm font-semibold transition border border-white/20"
                >
                  ← Previous
                </button>

                <button
                  onClick={nextPoll}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 text-sm font-semibold transition border border-white/20"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===================== NO ACTIVE QUESTION ===================== */}
        {!activeQuestion ? (
          <div className="text-center py-12">
         <MdErrorOutline className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No active question available</p>
          </div>
        ) : (
          <>
            {/* ===================== INSTRUCTIONS ===================== */}
            {!hasVoted && (
              <div className="bg-[#0ea4ff]/10 border border-[#0ea4ff]/30  p-4 mb-6">
                <p className="text-sm text-[#0ea4ff]">
                  <strong>📌 Instructions:</strong> Click on as many terms as you feel apply. One vote per IP address.
                </p>
              </div>
            )}

            {/* ===================== OPTIONS ===================== */}
            <div className={animationClass}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                {FIXED_TERMS.map((term) => (
                  <button
                    key={term}
                    onClick={() => toggleTerm(term)}
                    disabled={hasVoted || loading}
                    className={`
                      p-3 sm:p-4 rounded-lg font-semibold text-xs sm:text-sm transition-all
                      min-h-[60px] sm:min-h-[70px]
                      flex items-center justify-center text-center leading-tight
                      ${selectedTerms.has(term)
                        ? "bg-[#0ea4ff] text-white scale-105 shadow-lg shadow-[#0ea4ff]/50"
                        : hasVoted || loading
                        ? "bg-white/5 text-gray-500 cursor-not-allowed"
                        : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/10"
                      }
                    `}
                  >
                    <span className="line-clamp-3 break-words w-full">{term}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ===================== BOTTOM BUTTONS ===================== */}
            {!hasVoted && (
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <button
                  onClick={() => setSelectedTerms(new Set())}
                  disabled={loading}
                  className="bg-red-400 text-white px-6 py-3 font-semibold transition border border-white/20"
                >
                  Clear All
                </button>

                <button
                  onClick={submitVote}
                  disabled={loading || selectedTerms.size === 0}
                  className="hover:bg-green-700 bg-[#0c8ed9] text-white px-8 py-3 font-bold text-lg transition"
                >
                  {loading ? "Submitting..." : "Submit Vote →"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
