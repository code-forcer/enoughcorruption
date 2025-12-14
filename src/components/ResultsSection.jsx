import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Custom Icons as SVG components
const DownloadIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const CameraIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const ShareIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

// Colors for charts
const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4'];

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-white/20 p-3 shadow-xl">
        <p className="text-white font-semibold">{payload[0].name || payload[0].payload.term}</p>
        <p className="text-blue-400 font-bold">{payload[0].value.toLocaleString()} votes</p>
        {payload[0].payload.percentage && (
          <p className="text-gray-300 text-sm">{payload[0].payload.percentage}%</p>
        )}
      </div>
    );
  }
  return null;
};

const PollResults = ({
  activeQuestion,
  resultsData,
  dashboardData,
  isClient,
  exportToCSV,
  exportToPDF,
  downloadAsImage,
  shareToSocial,
}) => {
  return (
    <div className="space-y-8" id="results-content">
      {/* HEADER WITH BUTTONS */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Poll Results</h2>
          <h1 className="text-3xl text-gray-400">
            {activeQuestion ? activeQuestion.text : "No active question"}
          </h1>
        </div>

        {/* Export & Share Buttons */}
        {isClient && resultsData && (
          <div className="flex flex-wrap gap-3">
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white transition font-semibold shadow-lg"
            >
              <DownloadIcon size={18} />
              <span className="hidden sm:inline">CSV</span>
            </button>

            <button
              onClick={exportToPDF}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white  transition font-semibold shadow-lg"
            >
              <DownloadIcon size={18} />
              <span className="hidden sm:inline">PDF</span>
            </button>

            <button
              onClick={downloadAsImage}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white  transition font-semibold shadow-lg"
            >
              <CameraIcon size={18} />
              <span className="hidden sm:inline">Image</span>
            </button>

            {/* Share Button with Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white  transition font-semibold shadow-lg">
                <ShareIcon size={18} />
                <span className="hidden sm:inline">Share</span>
              </button>

              {/* Dropdown - 3 platforms only */}
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-white/20 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all z-50">
                {/* Facebook */}
                <button
                  onClick={() => shareToSocial('facebook')}
                  className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/10 text-white transition text-left rounded-t-lg"
                >
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </button>

                {/* X (Twitter) */}
                <button
                  onClick={() => shareToSocial('twitter')}
                  className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/10 text-white transition text-left"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  X (Twitter)
                </button>

                {/* Instagram */}
                <button
                  onClick={() => shareToSocial('instagram')}
                  className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/10 text-white transition text-left rounded-b-lg"
                >
                  <svg className="w-5 h-5" fill="url(#instagram-gradient)" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#FED576' }} />
                        <stop offset="50%" style={{ stopColor: '#F47133' }} />
                        <stop offset="100%" style={{ stopColor: '#BC3081' }} />
                      </linearGradient>
                    </defs>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Instagram
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 p-6">
          <p className="text-sm text-blue-300 mb-2">Total Opinions Cast</p>
          <p className="text-4xl font-bold text-white">
            {dashboardData?.stats?.totalSelections?.toLocaleString() || "0"}
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30  p-6">
          <p className="text-sm text-purple-300 mb-2">Most Selected Term</p>
          <p className="text-2xl font-bold text-white">
            {dashboardData?.top5?.[0]?.term || "N/A"}
          </p>
          <p className="text-sm text-purple-300 mt-1">
            {dashboardData?.top5?.[0]?.count || 0} votes
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30  p-6">
          <p className="text-sm text-green-300 mb-2">Unique Voters</p>
          <p className="text-4xl font-bold text-white">
            {dashboardData?.stats?.uniqueVoters?.toLocaleString() || "0"}
          </p>
        </div>
      </div>

      {/* CHARTS SECTION */}
      {dashboardData?.top5?.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="bg-white/5 border border-white/10  p-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Distribution Overview
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={dashboardData.top5}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ term, percentage }) => `${term}: ${percentage}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="term"
                >
                  {dashboardData.top5.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white/5 border border-white/10  p-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Vote Comparison
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={resultsData?.results || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="term"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  stroke="#9CA3AF"
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />
                <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF" }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {(resultsData?.results || []).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Top 5 Visual Chart */}
      <div className="bg-white/5 border border-white/10 p-8">
        <h3 className="text-2xl font-bold text-white mb-6">
          Top 5 Description
        </h3>
        <div className="space-y-6">
          {dashboardData?.top5?.length > 0 ? (
            dashboardData.top5.map((item, i) => {
              const colors = [
                {
                  bg: "bg-red-500",
                  text: "text-red-400",
                  border: "border-red-500",
                },
                {
                  bg: "bg-orange-500",
                  text: "text-orange-400",
                  border: "border-orange-500",
                },
                {
                  bg: "bg-yellow-500",
                  text: "text-yellow-400",
                  border: "border-yellow-500",
                },
                {
                  bg: "bg-green-500",
                  text: "text-green-400",
                  border: "border-green-500",
                },
                {
                  bg: "bg-blue-500",
                  text: "text-blue-400",
                  border: "border-blue-500",
                },
              ];
              const color = colors[i];
              return (
                <div key={item.term} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex items-center justify-center w-10 h-10 bg-gradient-to-br from-white/20 to-white/5 border-2 ${color.border} font-bold text-white`}
                      >
                        {i + 1}
                      </div>
                      <span className="text-lg font-bold text-white">
                        {item.term}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-2xl font-bold ${color.text}`}>
                        {item.percentage}%
                      </span>
                      <span className="text-sm text-gray-400">
                        {item.count.toLocaleString()} votes
                      </span>
                    </div>
                  </div>
                  <div className="relative h-8 bg-white/5 overflow-hidden">
                    <div
                      className={`absolute top-0 left-0 h-full ${color.bg} transition-all duration-1000 ease-out flex items-center justify-end pr-3`}
                      style={{ width: `${item.percentage}%` }}
                    >
                      <span className="text-xs font-bold text-white opacity-80">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-400 text-center py-8">No votes yet</p>
          )}
        </div>
      </div>

      {/* Remaining Terms */}
      <div className="bg-white/5 border border-white/10  p-8">
        <h3 className="text-xl font-bold text-white mb-4">
          All Other Description
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resultsData?.results?.slice(5).map((item) => {
            return (
              <div
                key={item.term}
                className="bg-white/5 border border-white/10  p-4 hover:bg-white/10 transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">{item.term}</span>
                  <span className="text-sm font-bold text-blue-400">
                    {item.percentageOfSelections.toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">
                    {item.count.toLocaleString()} votes
                  </span>
                  <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{
                        width: `${item.percentageOfSelections}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PollResults;