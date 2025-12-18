"use client";
import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';

const LogoGenerator = () => {
  const [activeView, setActiveView] = useState('all');

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold mb-4">This Is Not Normal Logo & Favicon Generator for This Is Not Normal</h1>
          <p className="text-gray-600 mb-6">
            Click on each design to view it larger. Right-click to save the image or take screenshots.
          </p>
          
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveView('all')}
              className={`px-4 py-2 rounded-lg font-semibold ${
                activeView === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              View All
            </button>
            <button
              onClick={() => setActiveView('favicon')}
              className={`px-4 py-2 rounded-lg font-semibold ${
                activeView === 'favicon' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              Favicons Only
            </button>
            <button
              onClick={() => setActiveView('social')}
              className={`px-4 py-2 rounded-lg font-semibold ${
                activeView === 'social' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              Social Images
            </button>
          </div>
        </div>

        {/* Favicon Sizes */}
        {(activeView === 'all' || activeView === 'favicon') && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* 16x16 Favicon */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-center">16x16 Favicon</h3>
              <div className="flex justify-center mb-4">
                <div className="bg-blue-600 flex items-center justify-center" style={{ width: '16px', height: '16px' }}>
                  <div style={{ display: 'flex', gap: '1px', alignItems: 'flex-end', height: '10px' }}>
                    <div className="bg-white" style={{ width: '2px', height: '4px' }}></div>
                    <div className="bg-white" style={{ width: '2px', height: '7px' }}></div>
                    <div className="bg-white rounded-full" style={{ width: '2px', height: '2px', marginBottom: '8px' }}></div>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm text-gray-600">Save as: icon-16x16.png</div>
            </div>

            {/* 32x32 Favicon */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-center">32x32 Favicon</h3>
              <div className="flex justify-center mb-4">
                <div className="bg-blue-600 flex items-center justify-center" style={{ width: '32px', height: '32px' }}>
                  <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '20px' }}>
                    <div className="bg-white rounded-sm" style={{ width: '4px', height: '8px' }}></div>
                    <div className="bg-white rounded-sm" style={{ width: '4px', height: '14px' }}></div>
                    <div className="bg-white rounded-full" style={{ width: '4px', height: '4px', marginBottom: '16px' }}></div>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm text-gray-600">Save as: icon-32x32.png</div>
            </div>

            {/* 180x180 Apple Touch Icon */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-center">180x180 Apple Icon</h3>
              <div className="flex justify-center mb-4">
                <div className="bg-blue-600 flex items-center justify-center rounded-2xl" style={{ width: '180px', height: '180px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '90px' }}>
                    <div className="bg-white rounded" style={{ width: '20px', height: '40px' }}></div>
                    <div className="bg-white rounded" style={{ width: '20px', height: '70px' }}></div>
                    <div className="bg-white rounded-full" style={{ width: '20px', height: '20px', marginBottom: '70px' }}></div>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm text-gray-600">Save as: apple-touch-icon.png</div>
            </div>
          </div>
        )}

        {/* Logo Variations */}
        {(activeView === 'all' || activeView === 'favicon') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Dark Background Logo (200x200) */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-center">200x200 Logo (Dark)</h3>
              <div className="flex justify-center mb-4">
                <div className="bg-gray-900 flex items-center justify-center rounded-lg" style={{ width: '200px', height: '200px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', height: '100px' }}>
                    <div className="bg-white rounded" style={{ width: '25px', height: '45px' }}></div>
                    <div className="bg-white rounded" style={{ width: '25px', height: '75px' }}></div>
                    <div className="bg-white rounded-full" style={{ width: '25px', height: '25px', marginBottom: '75px' }}></div>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm text-gray-600">Save as: logo-dark-200.png</div>
            </div>

            {/* White Background Logo (200x200) */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 text-center">200x200 Logo (Light)</h3>
              <div className="flex justify-center mb-4">
                <div className="bg-white flex items-center justify-center rounded-lg border-2 border-gray-200" style={{ width: '200px', height: '200px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', height: '100px' }}>
                    <div className="bg-gray-900 rounded" style={{ width: '25px', height: '45px' }}></div>
                    <div className="bg-gray-900 rounded" style={{ width: '25px', height: '75px' }}></div>
                    <div className="bg-gray-900 rounded-full" style={{ width: '25px', height: '25px', marginBottom: '75px' }}></div>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm text-gray-600">Save as: logo-light-200.png</div>
            </div>
          </div>
        )}

        {/* Social Media Images */}
        {(activeView === 'all' || activeView === 'social') && (
          <div className="space-y-8">
            {/* OG Image (1200x630) */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-center">1200x630 Open Graph Image</h3>
              <div className="flex justify-center mb-4 overflow-hidden">
                <div 
                  className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900"
                  style={{ width: '1200px', height: '630px', transform: 'scale(0.4)', transformOrigin: 'top center' }}
                >
                  {/* Hexagon Pattern Background */}
                  <div className="absolute inset-0 opacity-10">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute border-2 border-green-400"
                        style={{
                          width: '80px',
                          height: '80px',
                          clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                          left: `${(i * 15) % 90}%`,
                          top: `${(i * 20) % 80}%`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex items-center justify-between h-full px-20">
                    {/* Left: Icon */}
                    <div className="flex items-center justify-center bg-blue-600 rounded-3xl" style={{ width: '250px', height: '250px' }}>
                      <div style={{ display: 'flex', gap: '25px', alignItems: 'flex-end', height: '150px' }}>
                        <div className="bg-white rounded-lg" style={{ width: '40px', height: '70px' }}></div>
                        <div className="bg-white rounded-lg" style={{ width: '40px', height: '120px' }}></div>
                        <div className="bg-white rounded-full" style={{ width: '40px', height: '40px', marginBottom: '110px' }}></div>
                      </div>
                    </div>

                    {/* Right: Text */}
                    <div className="text-right">
                      <h1 className="text-white font-black mb-6" style={{ fontSize: '120px', letterSpacing: '2px' }}>
                        This Is Not Normal
                      </h1>
                      <p className="text-gray-300 font-semibold" style={{ fontSize: '35px' }}>
                        Outrage, crowdsourced & LIVE RESULTS
                      </p>
                      <p className="text-blue-400 font-medium mt-4" style={{ fontSize: '32px' }}>
                        Instant insights. Engaged audiences.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm text-gray-600">
                Save as: og-image.png (Use browser zoom out to screenshot at full size)
              </div>
            </div>

            {/* Twitter Image (1200x630) */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-center">1200x630 Twitter Card</h3>
              <div className="flex justify-center mb-4 overflow-hidden">
                <div 
                  className="relative bg-gradient-to-r from-blue-600 to-indigo-700"
                  style={{ width: '1200px', height: '630px', transform: 'scale(0.4)', transformOrigin: 'top center' }}
                >
                  {/* Animated circles */}
                  <div className="absolute top-20 right-20 w-40 h-40 bg-white/10 rounded-full"></div>
                  <div className="absolute bottom-20 left-20 w-60 h-60 bg-white/5 rounded-full"></div>

                  {/* Content */}
                  <div className="relative mt-5 z-10 flex flex-col items-center justify-center h-full text-center px-20">
                    {/* Icon */}
                    <div className="flex items-center justify-center bg-white rounded-3xl mb-12" style={{ width: '200px', height: '200px' }}>
                      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', height: '120px' }}>
                        <div className="bg-blue-600 rounded-lg" style={{ width: '32px', height: '56px' }}></div>
                        <div className="bg-blue-600 rounded-lg" style={{ width: '32px', height: '96px' }}></div>
                        <div className="bg-blue-600 rounded-full" style={{ width: '32px', height: '32px', marginBottom: '88px' }}></div>
                      </div>
                    </div>

                    {/* Text */}
                    <h1 className="text-white font-black mb-8" style={{ fontSize: '80px', letterSpacing: '4px' }}>
                      This Is Not Normal
                    </h1>
                    <p className="text-white/90 font-bold" style={{ fontSize: '35px' }}>
                      CREATE POLLS • GET REAL-TIME RESULTS
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm text-gray-600">
                Save as: twitter-image.png (Use browser zoom out to screenshot at full size)
              </div>
            </div>

            {/* Simple Banner with Stats (1200x630) */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-center">1200x630 Alternative Banner</h3>
              <div className="flex justify-center mb-4 overflow-hidden">
                <div 
                  className="relative bg-gray-900"
                  style={{ width: '1200px', height: '630px', transform: 'scale(0.4)', transformOrigin: 'top center' }}
                >
                  {/* Chart visualization */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-10">
                    {/* Bar chart */}
                    <div className="flex gap-8 items-end" style={{ height: '400px' }}>
                      <div className="flex flex-col items-center gap-4">
                        <div className="bg-green-400 rounded-t-lg" style={{ width: '80px', height: '300px' }}></div>
                        <div className="text-white font-bold text-3xl">YES</div>
                        <div className="text-green-400 font-bold text-4xl">78%</div>
                      </div>
                      <div className="flex flex-col items-center gap-4">
                        <div className="bg-blue-400 rounded-t-lg" style={{ width: '80px', height: '150px' }}></div>
                        <div className="text-white font-bold text-3xl">NO</div>
                        <div className="text-blue-400 font-bold text-4xl">22%</div>
                      </div>
                    </div>
                  </div>

                  {/* Left content */}
                  <div className="absolute left-10 top-1/2 -translate-y-1/2">
                    <div className="flex items-center gap-8 mb-12">
                      <div className="flex items-center justify-center bg-blue-600 rounded-2xl" style={{ width: '150px', height: '150px' }}>
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', height: '90px' }}>
                          <div className="bg-white rounded" style={{ width: '24px', height: '42px' }}></div>
                          <div className="bg-white rounded" style={{ width: '24px', height: '72px' }}></div>
                          <div className="bg-white rounded-full" style={{ width: '24px', height: '24px', marginBottom: '66px' }}></div>
                        </div>
                      </div>
                      <h1 className="text-white font-black" style={{ fontSize: '100px' }}>
                        This Is Not Normal
                      </h1>
                    </div>
                    <p className="text-white font-bold mb-4" style={{ fontSize: '40px' }}>
                      Outrage, crowdsourced & Live Results
                    </p>
                    <p className="text-gray-400 font-semibold" style={{ fontSize: '36px' }}>
                      Instant insights. Engaged audiences.
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm text-gray-600">
                Alternative social sharing image with chart visualization
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mt-8">
          <h3 className="font-bold text-lg mb-3 text-blue-900">📸 How to Save These Images on Fedora Linux:</h3>
          <ol className="space-y-2 text-gray-700">
            <li><strong>1. For small icons (16x16, 32x32):</strong> Right-click → "Save Image As" or use Spectacle/GNOME Screenshot</li>
            <li><strong>2. For larger images:</strong> Use GNOME Screenshot (Shift+PrtSc) or Spectacle to capture specific areas</li>
            <li><strong>3. For social images:</strong> Zoom out browser (Ctrl + -) first to fit the full 1200x630 size, then screenshot</li>
            <li><strong>4. Alternative:</strong> Use Firefox's built-in screenshot tool (Right-click → "Take Screenshot" → "Save visible")</li>
            <li><strong>5. Install tools:</strong> <code className="bg-gray-200 px-2 py-1 rounded">sudo dnf install spectacle</code> or <code className="bg-gray-200 px-2 py-1 rounded">gnome-screenshot</code></li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default LogoGenerator;