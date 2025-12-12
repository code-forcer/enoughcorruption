"use client";
import React, { useState, useEffect } from 'react';
import { BarChart3, Zap, Lock, Database, Cloud, FileSpreadsheet, Share2, Gauge, CheckCircle2, Clock, Rocket, TrendingUp, Target, Sparkles } from 'lucide-react';

const Homepage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeDay, setActiveDay] = useState(1);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveDay((prev) => (prev % 5) + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const techStack = [
    { icon: <Zap className="w-6 h-6" />, title: "Node.js + Rust", desc: "High-performance backend", color: "from-green-400 to-green-600" },
    { icon: <Lock className="w-6 h-6" />, title: "Secure Auth", desc: "Protected API services", color: "from-blue-400 to-blue-600" },
    { icon: <Gauge className="w-6 h-6" />, title: "Redis Cache", desc: "Lightning-fast responses", color: "from-red-400 to-red-600" },
    { icon: <Database className="w-6 h-6" />, title: "MongoDB", desc: "Scalable database", color: "from-green-500 to-emerald-600" },
    { icon: <Cloud className="w-6 h-6" />, title: "Cloud Storage", desc: "Assets & exports", color: "from-indigo-400 to-indigo-600" },
    { icon: <FileSpreadsheet className="w-6 h-6" />, title: "Excel/PDF Export", desc: "Data downloads", color: "from-orange-400 to-orange-600" },
    { icon: <Share2 className="w-6 h-6" />, title: "Social Sharing", desc: "Integrated APIs", color: "from-purple-400 to-purple-600" },
    { icon: <TrendingUp className="w-6 h-6" />, title: "Real-time Updates", desc: "Live polling data", color: "from-cyan-400 to-cyan-600" },
  ];

  const timeline = [
    { day: 1, title: "Foundation & Setup", tasks: ["Project initialization", "Database schema design", "Authentication system", "API structure"] },
    { day: 2, title: "Core Features", tasks: ["Poll creation system", "Real-time voting logic", "WebSocket integration", "User management"] },
    { day: 3, title: "Data & Charts", tasks: ["Chart.js implementation", "Live calculations", "Result analytics", "Export functionality"] },
    { day: 4, title: "Integration & Polish", tasks: ["Social sharing APIs", "Excel/PDF exports", "UI/UX refinements", "Performance optimization"] },
    { day: 5, title: "Testing & Delivery", tasks: ["Security audit", "Load testing", "Bug fixes", "Deployment & handover"] },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 md:left-20 w-48 h-48 md:w-72 md:h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 md:right-20 w-64 h-64 md:w-96 md:h-96 bg-indigo-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 border-b border-white/60 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4">
                {/* Logo */}
                <div className="flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl w-10 h-10 sm:w-14 sm:h-14 shadow-lg shadow-blue-500/50">
                  <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '20px' }}>
                    <div className="bg-white rounded-sm" style={{ width: '4px', height: '9px' }}></div>
                    <div className="bg-white rounded-sm" style={{ width: '4px', height: '15px' }}></div>
                    <div className="bg-white rounded-full" style={{ width: '4px', height: '4px', marginBottom: '16px' }}></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-lg sm:text-2xl font-black tracking-tight">This Is Not Normal</h1>
                  <p className="text-xs text-blue-300 hidden sm:block">Outrage, crowdsourced Platform</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="px-2 sm:px-4 py-1 sm:py-2 bg-green-500/20 text-green-400 rounded-full text-xs sm:text-sm font-semibold border border-green-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">In Development</span>
                  <span className="sm:hidden">Dev</span>
                </span>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-20">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-block mb-4 sm:mb-6">
              <span className="px-3 sm:px-6 py-1.5 sm:py-2 bg-blue-500/20 text-blue-300 rounded-full text-xs sm:text-sm font-bold border border-blue-500/30 backdrop-blur-sm flex items-center gap-2">
                <Rocket className="w-4 h-4" />
                EXCLUSIVELY BUILT FOR DAVID KATZNER
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent leading-tight px-4">
              WELCOME TO<br/>YOUR POLLING REVOLUTION
            </h2>
            
            <p className="text-base sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              A custom-built, high-performance polling platform designed exclusively for your needs. 
              <span className="text-blue-400 font-semibold"> Real-time results. Stunning visualizations. Unmatched reliability.</span>
            </p>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-8 sm:mb-12 px-4">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-4 sm:px-8 py-3 sm:py-4 rounded-xl shadow-2xl shadow-blue-500/30 border border-blue-400/30">
                <div className="text-2xl sm:text-4xl font-black text-white mb-1">5 DAYS</div>
                <div className="text-blue-200 text-xs sm:text-sm font-semibold">INITIAL DELIVERY</div>
              </div>
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 px-4 sm:px-8 py-3 sm:py-4 rounded-xl shadow-2xl shadow-indigo-500/30 border border-indigo-400/30">
                <div className="text-2xl sm:text-4xl font-black text-white mb-1">100%</div>
                <div className="text-indigo-200 text-xs sm:text-sm font-semibold">CUSTOM BUILT</div>
              </div>
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 px-4 sm:px-8 py-3 sm:py-4 rounded-xl shadow-2xl shadow-purple-500/30 border border-purple-400/30">
                <div className="text-2xl sm:text-4xl font-black text-white mb-1">UNIQUE</div>
                <div className="text-purple-200 text-xs sm:text-sm font-semibold">YOUR IDENTITY</div>
              </div>
            </div>

            <div className="flex justify-center px-4">
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-bold text-sm sm:text-lg shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transform hover:scale-105 transition-all border border-blue-400/50">
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="whitespace-nowrap">VIEW DEVELOPMENT TIMELINE</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Development Timeline Section */}
      <div className="relative bg-gradient-to-b from-black/50 to-gray-900/50 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h3 className="text-3xl sm:text-5xl font-black mb-2 sm:mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              DEVELOPMENT TIMELINE
            </h3>
            <p className="text-base sm:text-xl text-gray-400">5 Working Days to Complete Excellence</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative bg-gradient-to-br ${
                  activeDay === item.day 
                    ? 'from-blue-600 to-indigo-700 shadow-2xl shadow-blue-500/50 scale-105' 
                    : 'from-gray-800 to-gray-900 opacity-60'
                } rounded-xl p-4 sm:p-6 transition-all duration-500 border ${
                  activeDay === item.day ? 'border-blue-400' : 'border-gray-700'
                }`}
              >
                <div className={`absolute -top-3 left-4 sm:left-6 px-3 sm:px-4 py-1 rounded-full font-black text-xs sm:text-sm ${
                  activeDay === item.day ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 text-gray-400'
                }`}>
                  DAY {item.day}
                </div>
                
                <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 mt-4">{item.title}</h4>
                
                <ul className="space-y-2">
                  {item.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm">
                      <CheckCircle2 className={`w-3 h-3 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0 ${
                        activeDay === item.day ? 'text-green-400' : 'text-gray-500'
                      }`} />
                      <span className={activeDay === item.day ? 'text-white' : 'text-gray-400'}>
                        {task}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Launch Approach */}
          <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-2xl p-6 sm:p-8 border border-blue-500/30 backdrop-blur-sm">
            <h4 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
              LAUNCH APPROACH
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-black/30 rounded-xl p-4 sm:p-6 border border-blue-500/20">
                <div className="text-2xl sm:text-3xl font-black text-blue-400 mb-2">PHASE 1</div>
                <div className="font-bold text-base sm:text-lg mb-2">Initial Delivery</div>
                <p className="text-gray-400 text-xs sm:text-sm">Complete platform delivered in 5 working days with all core features functional</p>
              </div>
              <div className="bg-black/30 rounded-xl p-4 sm:p-6 border border-indigo-500/20">
                <div className="text-2xl sm:text-3xl font-black text-indigo-400 mb-2">PHASE 2</div>
                <div className="font-bold text-base sm:text-lg mb-2">Trial Period</div>
                <p className="text-gray-400 text-xs sm:text-sm">Short soft-launch to validate performance, gather feedback, and ensure stability</p>
              </div>
              <div className="bg-black/30 rounded-xl p-4 sm:p-6 border border-purple-500/20">
                <div className="text-2xl sm:text-3xl font-black text-purple-400 mb-2">PHASE 3</div>
                <div className="font-bold text-base sm:text-lg mb-2">Full Launch</div>
                <p className="text-gray-400 text-xs sm:text-sm">Ramp up promotion after trial confirms stability—expected very quickly</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Stack Section */}
      <div className="relative py-12 sm:py-20 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h3 className="text-3xl sm:text-5xl font-black mb-2 sm:mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              TECHNICAL EXCELLENCE
            </h3>
            <p className="text-base sm:text-xl text-gray-400">Built for Performance & Scalability</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 hover:from-gray-700 hover:to-gray-800 transition-all duration-300 border border-gray-700 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2"
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${tech.color} mb-3 sm:mb-4 shadow-lg`}>
                  {React.cloneElement(tech.icon, { className: 'w-5 h-5 sm:w-6 sm:h-6' })}
                </div>
                <h4 className="text-sm sm:text-lg font-bold mb-1 sm:mb-2">{tech.title}</h4>
                <p className="text-xs sm:text-sm text-gray-400">{tech.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 sm:mt-16 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl p-6 sm:p-8 border border-blue-500/30 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold mb-2">Security & Performance First</h4>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  Every component is carefully selected for optimal performance and security. From secure authentication 
                  and API services to Redis caching for lightning-fast responses, your platform is built on enterprise-grade 
                  technology. MongoDB provides scalable data storage, while cloud-based asset management ensures reliability. 
                  Advanced export features and social sharing integrations use trusted external APIs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Your Identity Section */}
      <div className="relative py-12 sm:py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-3xl sm:text-5xl font-black mb-2 sm:mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              YOUR UNIQUE IDENTITY
            </h3>
            <p className="text-base sm:text-xl text-gray-400">Exclusively Designed. Personally Crafted.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-2xl p-6 sm:p-8 border border-blue-500/30">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl w-12 h-12 sm:w-16 sm:h-16 shadow-lg shadow-blue-500/50">
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '26px' }}>
                    <div className="bg-white rounded-sm" style={{ width: '5px', height: '11px' }}></div>
                    <div className="bg-white rounded-sm" style={{ width: '5px', height: '19px' }}></div>
                    <div className="bg-white rounded-full" style={{ width: '5px', height: '5px', marginBottom: '20px' }}></div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-black">This Is Not Normal</h4>
                  <p className="text-blue-300 text-xs sm:text-sm">Your Brand. Your Vision.</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                This isn't a template or a generic solution. From the custom logo to the unique color scheme, 
                every pixel is designed specifically for you. The "This Is Not Normal" brand identity is yours alone—a 
                distinctive mark that sets your platform apart in the polling industry.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-2xl p-6 sm:p-8 border border-purple-500/30">
              <h4 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                STUNNING DESIGN
              </h4>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
                The color palette—blue, navy blue, black, with strategic accent colors—creates a professional, 
                modern aesthetic that commands attention. Every interface element is crafted for maximum visual 
                impact while maintaining excellent usability.
              </p>
              <div className="flex gap-2 sm:gap-3">
                <div className="flex-1 h-10 sm:h-12 bg-blue-600 rounded-lg shadow-lg"></div>
                <div className="flex-1 h-10 sm:h-12 bg-blue-900 rounded-lg shadow-lg"></div>
                <div className="flex-1 h-10 sm:h-12 bg-black rounded-lg shadow-lg border border-gray-700"></div>
                <div className="flex-1 h-10 sm:h-12 bg-indigo-600 rounded-lg shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Update Section */}
      <div className="relative py-12 sm:py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-2xl p-8 sm:p-12 border border-green-500/30 shadow-2xl shadow-green-500/10">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full mb-4 sm:mb-6 shadow-2xl shadow-green-500/50">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            
            <h3 className="text-2xl sm:text-4xl font-black mb-3 sm:mb-4">DEVELOPMENT HAS COMMENCED</h3>
            <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              Your environment is being prepared, and development is underway. Throughout the 5-day build, 
              you'll receive <span className="text-green-400 font-bold">segmented progress updates</span> ensuring 
              complete transparency. Every milestone will be documented and shared with you.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-black/50 rounded-xl p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-black text-green-400 mb-2">
                  <CheckCircle2 className="w-8 h-8 mx-auto" />
                </div>
                <div className="font-bold mb-1 text-sm sm:text-base">Logo & Branding</div>
                <div className="text-xs sm:text-sm text-gray-400">Unique identity created</div>
              </div>
              <div className="bg-black/50 rounded-xl p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-black text-yellow-400 mb-2">
                  <Zap className="w-8 h-8 mx-auto" />
                </div>
                <div className="font-bold mb-1 text-sm sm:text-base">Environment Setup</div>
                <div className="text-xs sm:text-sm text-gray-400">Currently in progress</div>
              </div>
              <div className="bg-black/50 rounded-xl p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-black text-blue-400 mb-2">
                  <Target className="w-8 h-8 mx-auto" />
                </div>
                <div className="font-bold mb-1 text-sm sm:text-base">Core Development</div>
                <div className="text-xs sm:text-sm text-gray-400">Starting soon</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-6 sm:py-8 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg w-8 h-8 sm:w-10 sm:h-10">
              <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '16px' }}>
                <div className="bg-white rounded-sm" style={{ width: '3px', height: '6px' }}></div>
                <div className="bg-white rounded-sm" style={{ width: '3px', height: '11px' }}></div>
                <div className="bg-white rounded-full" style={{ width: '3px', height: '3px', marginBottom: '12px' }}></div>
              </div>
            </div>
            <span className="text-lg sm:text-xl font-black">This Is Not Normal</span>
          </div>
          <p className="text-sm sm:text-base text-gray-500 mb-2">Built exclusively for David Katzner</p>
          <p className="text-xs sm:text-sm text-gray-600">Developed by <span className="text-blue-400 font-semibold">DevPete || Codeforcer</span></p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;