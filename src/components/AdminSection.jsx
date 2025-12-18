"use client";
import React from "react";

const AdminSection = ({
    newQuestionText,
    setNewQuestionText,
    createQuestion,
    allQuestions,
    activateQuestion,
    loading,
    FIXED_TERMS,
}) => {
    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-white mb-2">Admin Panel</h2>

            {/* Create New Question */}
            <div className="bg-white/5 border border-white/10  p-8">
                <h3 className="text-xl font-bold text-white mb-4">Create New Question</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Question Text</label>
                        <input
                            type="text"
                            value={newQuestionText}
                            onChange={(e) => setNewQuestionText(e.target.value)}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                            placeholder="Enter your question here"
                        />
                    </div>
                    <button
                        onClick={createQuestion}
                        disabled={loading || !newQuestionText.trim()}
                        className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-bold text-lg transition disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Create Question"}
                    </button>
                </div>
            </div>

  {/* All Questions as a scrollable table */}
      {/* All Questions as a scrollable table */}
      <div className="bg-white/5 border border-white/10 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">All Questions</h3>
          <span className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg font-semibold">
            Total: {allQuestions.length}
          </span>
        </div>
        {allQuestions.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No questions created yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-white font-semibold border-b border-white/20 whitespace-nowrap">#</th>
                  <th className="px-4 py-2 text-left text-white font-semibold border-b border-white/20 whitespace-nowrap">Question | Actions</th>
                  <th className="px-4 py-2 text-left text-gray-400 font-semibold border-b border-white/20 whitespace-nowrap">Created</th>
                  <th className="px-4 py-2 text-left text-gray-400 font-semibold border-b border-white/20 whitespace-nowrap">Status</th>
                
                </tr>
              </thead>
              <tbody>
                {allQuestions.map((q, index) => (
                  <tr key={q._id} className="hover:bg-white/10 transition">
                    <td className="px-4 py-3 text-gray-400 font-semibold whitespace-nowrap">{index + 1}</td>
                    <td className="px-4 py-3 text-white font-semibold max-w-md">{q.text}</td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{new Date(q.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {q.active ? (
                        <span className="bg-green-500/20 text-green-400 text-sm px-3 py-1 rounded-full font-semibold">
                          ✓ Active
                        </span>
                      ) : (
                        <span className="bg-red-500/20 text-red-400 text-sm px-3 py-1 rounded-full font-semibold">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {!q.active && (
                        <button
                          onClick={() => activateQuestion(q._id)}
                          disabled={loading}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50"
                        >
                          Activate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
            {/* Fixed Terms */}
            <div className="bg-white/5 border border-white/10 p-8">
                <h3 className="text-xl font-bold text-white mb-4">Fixed Term List (24 Descriptions)</h3>
                <p className="text-sm text-gray-400 mb-4">These descriptions are used for every question</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                    {FIXED_TERMS.map((term) => (
                        <div
                            key={term}
                            className="bg-white/10 px-3 py-2 rounded text-gray-300"
                        >
                            • {term}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminSection;
