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
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from 'recharts';

// React MD Icons as SVG components
const DownloadIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
  </svg>
);

const CameraIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z" />
  </svg>
);

const ShareIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z" />
  </svg>
);

const ChartIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M9,17H7V10H9M13,17H11V7H13M17,17H15V13H17M19,19H5V5H19M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
  </svg>
);

const TrendingIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z" />
  </svg>
);

const AccountIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
  </svg>
);

const TrophyIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.8 5.4C21.9 5.4 22.8 6.3 22.8 7.4V10C22.8 11.1 21.9 12 20.8 12H20.5L20.1 13C19.8 13.8 19.4 14.5 18.9 15.1C18 16.2 16.8 17 15.5 17.3V20H17V22H7V20H8.5V17.3C6.5 16.9 4.9 15.3 4.3 13.2L3.9 12H3.2C2.1 12 1.2 11.1 1.2 10V7.4C1.2 6.3 2.1 5.4 3.2 5.4H5.3C6 3.5 7.8 2.2 10 2H14C16.2 2.2 18 3.5 18.7 5.4H20.8M19.5 10C19.5 10.6 19.8 11.2 20.3 11.6L20.5 10H19.5M5.5 10H4.5L4.7 11.6C5.2 11.2 5.5 10.6 5.5 10Z" />
  </svg>
);

// Enhanced color palette
const COLORS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', 
  '#8b5cf6', '#ec4899', '#06b6d4', '#f43f5e', '#14b8a6',
  '#a855f7', '#f59e0b', '#10b981', '#6366f1', '#84cc16'
];

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-900/95 backdrop-blur-sm border border-white/20  p-4 shadow-2xl">
        <p className="text-white font-bold text-lg mb-2">{data.term || payload[0].name}</p>
        <div className="space-y-1">
          <p className="text-blue-400 font-semibold">{payload[0].value?.toLocaleString()} votes</p>
          {data.percentage && (
            <p className="text-emerald-400 text-sm font-medium">{data.percentage}% of total</p>
          )}
          {data.percentageOfSelections && (
            <p className="text-purple-400 text-sm">{data.percentageOfSelections.toFixed(1)}% share</p>
          )}
        </div>
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
  // Prepare data for radar chart (top 8)
  const radarData = resultsData?.results?.slice(0, 8).map(item => ({
    term: item.term.length > 15 ? item.term.substring(0, 15) + '...' : item.term,
    value: item.count,
    fullTerm: item.term
  })) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      {/* Hero Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border-b border-white/10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="relative px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Title Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <ChartIcon size={32} className="text-blue-400" />
                  <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight">
                    Poll Analytics
                  </h2>
                </div>
                <h1 className="text-xl lg:text-2xl text-gray-300 font-medium max-w-3xl">
                  {activeQuestion ? activeQuestion.text : "No active question"}
                </h1>
              </div>

              {/* Action Buttons */}
              {isClient && resultsData && (
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={exportToCSV}
                    className="group flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white transition-all font-semibold shadow-lg hover:shadow-emerald-500/50 hover:scale-105 active:scale-95"
                  >
                    <DownloadIcon size={20} />
                    <span className="hidden sm:inline">Export CSV</span>
                  </button>

                  <button
                    onClick={exportToPDF}
                    className="group flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white  transition-all font-semibold shadow-lg hover:shadow-red-500/50 hover:scale-105 active:scale-95"
                  >
                    <DownloadIcon size={20} />
                    <span className="hidden sm:inline">Export PDF</span>
                  </button>

                  <button
                    onClick={downloadAsImage}
                    className="group flex items-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white transition-all font-semibold shadow-lg hover:shadow-purple-500/50 hover:scale-105 active:scale-95"
                  >
                    <CameraIcon size={20} />
                    <span className="hidden sm:inline">Save Image</span>
                  </button>

                  {/* Share Dropdown */}
                  <div className="relative group">
                    <button className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white transition-all font-semibold shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95">
                      <ShareIcon size={20} />
                      <span className="hidden sm:inline">Share</span>
                    </button>

                    <div className="absolute right-0 mt-2 w-56 bg-gray-800/95 backdrop-blur-xl border border-white/20 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                      <button
                        onClick={() => shareToSocial('facebook')}
                        className="flex items-center gap-3 w-full px-4 py-3 hover:bg-blue-600/20 text-white transition text-left"
                      >
                        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        <span className="font-medium">Facebook</span>
                      </button>

                      <button
                        onClick={() => shareToSocial('twitter')}
                        className="flex items-center gap-3 w-full px-4 py-3 hover:bg-sky-600/20 text-white transition text-left"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        <span className="font-medium">X (Twitter)</span>
                      </button>

                      <button
                        onClick={() => shareToSocial('instagram')}
                        className="flex items-center gap-3 w-full px-4 py-3 hover:bg-pink-600/20 text-white transition text-left"
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
                        <span className="font-medium">Instagram</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8" id="results-content">
        
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Votes Card */}
          <div className="relative group overflow-hidden bg-gradient-to-br from-blue-500/10 via-blue-600/5 to-transparent border border-blue-500/20 p-6 hover:border-blue-500/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10  blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-500/20 ">
                  <ChartIcon size={24} className="text-blue-400" />
                </div>
                <p className="text-sm font-semibold text-blue-300 uppercase tracking-wider">Total Opinions Cast</p>
              </div>
              <p className="text-5xl font-black text-white mb-2">
                {dashboardData?.stats?.totalSelections?.toLocaleString() || "0"}
              </p>
              <p className="text-sm text-gray-400">Votes recorded</p>
            </div>
          </div>

          {/* Top Term Card */}
          <div className="relative group overflow-hidden bg-gradient-to-br from-purple-500/10 via-purple-600/5 to-transparent border border-purple-500/20 p-6 hover:border-purple-500/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl group-hover:bg-purple-500/20 transition-all"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-500/20 ">
                  <TrophyIcon size={24} className="text-purple-400" />
                </div>
                <p className="text-sm font-semibold text-purple-300 uppercase tracking-wider">Leading Description</p>
              </div>
              <p className="text-3xl font-black text-white mb-2 truncate">
                {dashboardData?.top5?.[0]?.term || "N/A"}
              </p>
              <div className="flex items-center gap-3">
                <p className="text-2xl font-bold text-purple-400">
                  {dashboardData?.top5?.[0]?.percentage || 0}%
                </p>
                <p className="text-sm text-gray-400">
                  {dashboardData?.top5?.[0]?.count?.toLocaleString() || 0} votes
                </p>
              </div>
            </div>
          </div>

          {/* Unique Voters Card */}
          <div className="relative group overflow-hidden bg-gradient-to-br from-emerald-500/10 via-emerald-600/5 to-transparent border border-emerald-500/20 p-6 hover:border-emerald-500/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl group-hover:bg-emerald-500/20 transition-all"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-emerald-500/20 ">
                  <AccountIcon size={24} className="text-emerald-400" />
                </div>
                <p className="text-sm font-semibold text-emerald-300 uppercase tracking-wider">Unique Participants</p>
              </div>
              <p className="text-5xl font-black text-white mb-2">
                {dashboardData?.stats?.uniqueVoters?.toLocaleString() || "0"}
              </p>
              <p className="text-sm text-gray-400">Individual voters</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        {dashboardData?.top5?.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:bg-white/[0.07] transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/20 ">
                  <TrendingIcon size={20} className="text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Distribution Overview</h3>
              </div>
              <ResponsiveContainer width="100%" height={380}>
                <PieChart>
                  <Pie
                    data={dashboardData.top5}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ term, percentage }) => `${percentage}%`}
                    outerRadius={130}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="term"
                    paddingAngle={2}
                  >
                    {dashboardData.top5.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        stroke="rgba(0,0,0,0.3)"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value) => <span className="text-gray-300 text-sm">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Radar Chart */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 -8 hover:bg-white/[0.07] transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/20">
                  <ChartIcon size={20} className="text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Performance Analysis</h3>
              </div>
              <ResponsiveContainer width="100%" height={380}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis 
                    dataKey="term" 
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 'auto']}
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <Radar
                    name="Votes"
                    dataKey="value"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.6}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Bar Chart - Full Width */}
        {dashboardData?.top5?.length > 0 && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10  p-8 hover:bg-white/[0.07] transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-500/20 ">
                <TrendingIcon size={20} className="text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Comparative Vote Analysis</h3>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={resultsData?.results?.slice(0, 10) || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis
                  dataKey="term"
                  angle={-35}
                  textAnchor="end"
                  height={120}
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF', fontSize: 11 }}
                />
                <YAxis 
                  stroke="#9CA3AF" 
                  tick={{ fill: '#9CA3AF' }}
                  label={{ value: 'Vote Count', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="count" 
                  radius={[10, 10, 0, 0]}
                  maxBarSize={60}
                >
                  {(resultsData?.results?.slice(0, 10) || []).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Top 5 Rankings */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10  p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-yellow-500/20 ">
              <TrophyIcon size={20} className="text-yellow-400" />
            </div>
            <h3 className="text-3xl font-bold text-white">Top 5 Rankings</h3>
          </div>
          <div className="space-y-5">
            {dashboardData?.top5?.length > 0 ? (
              dashboardData.top5.map((item, i) => {
                const colorSchemes = [
                  {
                    bg: 'from-red-500/20 to-red-600/5',
                    border: 'border-red-500/40',
                    text: 'text-red-400',
                    glow: 'shadow-red-500/20',
                    icon: 'bg-red-500/20',
                    bar: 'bg-gradient-to-r from-red-500 to-red-600'
                  },
                  {
                    bg: 'from-orange-500/20 to-orange-600/5',
                    border: 'border-orange-500/40',
                    text: 'text-orange-400',
                    glow: 'shadow-orange-500/20',
                    icon: 'bg-orange-500/20',
                    bar: 'bg-gradient-to-r from-orange-500 to-orange-600'
                  },
                  {
                    bg: 'from-yellow-500/20 to-yellow-600/5',
                    border: 'border-yellow-500/40',
                    text: 'text-yellow-400',
                    glow: 'shadow-yellow-500/20',
                    icon: 'bg-yellow-500/20',
                    bar: 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                  },
                  {
                    bg: 'from-green-500/20 to-green-600/5',
                    border: 'border-green-500/40',
                    text: 'text-green-400',
                    glow: 'shadow-green-500/20',
                    icon: 'bg-green-500/20',
                    bar: 'bg-gradient-to-r from-green-500 to-green-600'
                  },
                  {
                    bg: 'from-blue-500/20 to-blue-600/5',
                    border: 'border-blue-500/40',
                    text: 'text-blue-400',
                    glow: 'shadow-blue-500/20',
                    icon: 'bg-blue-500/20',
                    bar: 'bg-gradient-to-r from-blue-500 to-blue-600'
                  }
                ];
                const scheme = colorSchemes[i];
                
                return (
                  <div 
                    key={item.term} 
                    className={`group relative bg-gradient-to-br ${scheme.bg} border ${scheme.border}  p-6 hover:scale-[1.02] transition-all duration-300 ${scheme.glow} hover:shadow-xl`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`flex items-center justify-center w-14 h-14 ${scheme.icon}  border-2 ${scheme.border} font-black text-2xl text-white shadow-lg`}>
                          {i + 1}
                        </div>
                        <div>
                          <span className="text-xl font-bold text-white block mb-1">
                            {item.term}
                          </span>
                          <span className="text-sm text-gray-400">
                            Rank #{i + 1}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-4xl font-black ${scheme.text} mb-1`}>
                          {item.percentage}%
                        </p>
                        <p className="text-sm text-gray-400 font-medium">
                          {item.count.toLocaleString()} votes
                        </p>
                      </div>
                    </div>
                    
                    <div className="relative h-3 bg-black/30  overflow-hidden">
                      <div
                        className={`absolute top-0 left-0 h-full ${scheme.bar} transition-all duration-1000 ease-out shadow-lg`}
                        style={{ width: `${item.percentage}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12">
                <ChartIcon size={48} className="text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No votes recorded yet</p>
              </div>
            )}
          </div>
        </div>

        {/* All Other Descriptions */}
        {resultsData?.results?.slice(5).filter(item => item.count > 0).length > 0 && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10  p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-500/20 ">
                <ChartIcon size={20} className="text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">All Other Descriptions</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {resultsData.results.slice(5).filter(item => item.count > 0).map((item, index) => {
                const percentage = item.percentageOfSelections || 0;
                return (
                  <div
                    key={item.term}
                    className="group relative bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="font-bold text-white text-base leading-tight flex-1 pr-2">
                        {item.term}
                      </span>
                      <span className="text-lg font-black text-blue-400 whitespace-nowrap">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400 font-medium">
                          {item.count.toLocaleString()} votes
                        </span>
                      </div>
                      
                      <div className="relative h-2 bg-black/30 rounded-full overflow-hidden">
                        <div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 shadow-lg"
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        >
                          <div className="absolute inset-0 bg-white/20"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PollResults;