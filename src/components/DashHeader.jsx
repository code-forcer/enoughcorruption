"use client";
import React from "react";
import {
  MdPeople,
  MdBarChart,
  MdTrendingUp,
  MdDescription,
} from "react-icons/md";

export default function HomeDashboard({ dashboardData, activeQuestion, setActiveSection }) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
        <p className="text-gray-400">Welcome back!</p>
      </div>
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="bg-gradient-to-br from-blue-800/30 to-blue-900/50 border border-blue-700/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-4">
            <MdPeople className="w-10 h-10 text-blue-400" />
          </div>
          <p className="text-gray-400 text-sm mb-1">Total Users</p>
          <p className="text-3xl font-bold text-white">
            {dashboardData?.stats?.users || 0}
          </p>
        </div>
        {/* Active Polls */}
        <div className="bg-gradient-to-br from-green-800/30 to-green-900/50 border border-green-700/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-4">
            <MdBarChart className="w-10 h-10 text-green-400" />
          </div>
          <p className="text-gray-400 text-sm mb-1">Active Polls</p>
          <p className="text-3xl font-bold text-white">
            {dashboardData?.stats?.activePolls || 0}
          </p>
        </div>
        {/* Total Votes */}
        <div className="bg-gradient-to-br from-purple-800/30 to-purple-900/50 border border-purple-700/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-4">
            <MdTrendingUp className="w-10 h-10 text-purple-400" />
          </div>
          <p className="text-gray-400 text-sm mb-1">Total Votes</p>
          <p className="text-3xl font-bold text-white">
            {dashboardData?.stats?.totalVotes || 0}
          </p>
        </div>
        {/* Total Selections */}
        <div className="bg-gradient-to-br from-orange-800/30 to-orange-900/50 border border-orange-700/30 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-4">
            <MdDescription className="w-10 h-10 text-orange-400" />
          </div>
          <p className="text-gray-400 text-sm mb-1">Total Selections</p>
          <p className="text-3xl font-bold text-white">
            {dashboardData?.stats?.totalSelections || 0}
          </p>
        </div>
      </div>
      {/* Active Question Card */}
      {activeQuestion && (
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-2">Active Question</h3>
          <h2 className="text-white text-lg italic">{activeQuestion.text}</h2>

          <span className="text-white text-sm">
            {activeQuestion.pubDate
              ? new Date(activeQuestion.pubDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "No date"}
          </span>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveSection("vote")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition transform hover:scale-105"
            >
              Cast Your Vote
            </button>
            <button
              onClick={() => setActiveSection("results")}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition transform hover:scale-105"
            >
              View Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
