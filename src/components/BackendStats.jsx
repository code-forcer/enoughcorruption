"use client";
import React from "react";

const BackendStats = ({ resultsData }) => {
  if (!resultsData) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-2">Backend Statistics</h2>

      <div className="bg-white/5 border border-white/10  p-8">
        <h3 className="text-xl font-bold text-white mb-6">Complete Vote Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-4 py-3 text-gray-300 font-semibold">Rank</th>
                <th className="px-4 py-3 text-gray-300 font-semibold">Term</th>
                <th className="px-4 py-3 text-gray-300 font-semibold text-right">Votes</th>
                <th className="px-4 py-3 text-gray-300 font-semibold text-right">% of Selections</th>
                <th className="px-4 py-3 text-gray-300 font-semibold text-right">% of Voters</th>
              </tr>
            </thead>
            <tbody>
              {resultsData.results.map((item, i) => (
                <tr key={item.term} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3 text-gray-400">#{i + 1}</td>
                  <td className="px-4 py-3 text-white font-semibold">{item.term}</td>
                  <td className="px-4 py-3 text-white text-right">{item.count}</td>
                  <td className="px-4 py-3 text-blue-400 text-right font-semibold">
                    {item.percentageOfSelections.toFixed(1)}%
                  </td>
                  <td className="px-4 py-3 text-green-400 text-right font-semibold">
                    {item.percentageOfVoters.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-white/5 border-t-2 border-white/20">
              <tr>
                <td colSpan="2" className="px-4 py-3 text-white font-bold">
                  TOTALS
                </td>
                <td className="px-4 py-3 text-white font-bold text-right">{resultsData.totalSelections}</td>
                <td className="px-4 py-3 text-blue-400 font-bold text-right">100%</td>
                <td className="px-4 py-3 text-gray-400 text-right text-sm">{resultsData.totalVoters} voters</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BackendStats;
