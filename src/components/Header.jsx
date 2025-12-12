"use client";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  Info,
  Mail,
  BarChart3,
  Rocket,
  Users,
  ChevronRight,
} from "lucide-react";
export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: "Home", href: "/#home" },
    { icon: <Info className="w-5 h-5" />, label: "About", href: "/#about" },

    { icon: <Mail className="w-5 h-5" />, label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-gray-900/95 backdrop-blur-lg border-b border-white/10 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: Logo */}
            <a href="/#home" className="flex items-center gap-3 group z-10">
              <div className="flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl w-10 h-10 sm:w-12 sm:h-12 shadow-lg shadow-blue-500/50 group-hover:shadow-blue-500/70 group-hover:scale-105 transition-all">
                <img src="/trump_logo.jpeg" alt="This Is Not Normal Logo" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  This Is Not Normal
                </h1>
                <p className="text-xs text-blue-300 sm:block">
                  Outrage, crowdsourced
                </p>
              </div>
            </a>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>

            {/* Right: CTA Button + Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Get Started Button */}
              <a
                href="/login"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-lg font-bold text-sm text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all transform hover:scale-105"
              >
                <Rocket className="w-4 h-4" />
                <span>Let's Go!</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                <Menu className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-gray-900 to-gray-950 z-50 transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl w-10 h-10 shadow-lg shadow-blue-500/50">
                <img src="/favicon.ico" alt="This Is Not Normal Logo" />
              </div>
              <div>
                <h2 className="text-lg font-black text-white">This Is Not Normal</h2>
                <p className="text-xs text-blue-300">Outrage, crowdsourced</p>
              </div>
            </div>
            <button
              onClick={closeSidebar}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6 text-gray-300" />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 overflow-y-auto p-6">
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={closeSidebar}
                  className="flex items-center justify-between group px-4 py-4 rounded-xl font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 group-hover:bg-blue-600/20 transition-colors">
                      {item.icon}
                    </div>
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>

            {/* CTA in Sidebar */}
            <div className="mt-8 p-6 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl border border-blue-500/30">
              <h3 className="text-lg font-bold text-white mb-2">
                Ready to Start?
              </h3>
              <p className="text-sm text-gray-300 mb-4">
               Fill your outrages in minutes and make your voice heard!
              </p>
              <a
                href="/login"
                onClick={closeSidebar}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-lg font-bold text-white shadow-lg shadow-blue-500/30 transition-all"
              >
                <Rocket className="w-5 h-5" />
                <span>Lets Go!</span>
              </a>
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-6 border-t border-white/10">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-2">Need help?</p>
              <a
                href="#contact"
                onClick={closeSidebar}
                className="text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
