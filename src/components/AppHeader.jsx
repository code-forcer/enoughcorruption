"use client";

import React from "react";
import {
    MdMenu,
    MdNotifications,
    MdPerson,
    MdKeyboardArrowDown,
    MdLogout,
} from "react-icons/md";
import { X, LogOut } from "lucide-react";

export default function AppHeader({
navItems,
  isAdmin, // ✅ ADD THIS
  activeSection,
  setActiveSection,
  isSidebarOpen,
  setIsSidebarOpen,
  isProfileOpen,
  setIsProfileOpen,
  dashboardData,
  handleLogOut,
}) {
    return (
        <>
            {/* ================= HEADER ================= */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-white/10 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-20">

                        {/* LEFT: LOGO + MENU */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="lg:hidden p-2 rounded-lg hover:bg-white/10"
                            >
                                <MdMenu className="w-6 h-6 text-white" />
                            </button>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 shadow-lg">
                                    <img
                                        src="/trump_logo.jpeg"
                                        alt="This Is Not Normal Logo"
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                <div className="hidden lg:block">
                                    <h4 className="font-black text-white tracking-tight">
                                        This Is Not Normal
                                    </h4>
                                    <p className="text-xs text-blue-300">
                                        Outrage, crowdsourced
                                    </p>
                                </div>
                            </div>
                        </div>
{/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1">
  {navItems
    .filter(item => !item.adminOnly || isAdmin)
    .map(item => (
      <button
        key={item.section}
        onClick={() => setActiveSection(item.section)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
          activeSection === item.section
            ? "bg-blue-600 text-white shadow-lg"
            : "text-gray-300 hover:text-white hover:bg-white/10"
        }`}
      >
        <item.icon className="w-5 h-5" />
        <span>{item.label}</span>
      </button>
    ))}
</nav>



                        {/* RIGHT: NOTIFICATION + PROFILE */}
                        <div className="flex items-center gap-2 sm:gap-3 relative">
                            <button className="relative p-2 rounded-lg hover:bg-white/10">
                                <MdNotifications className="w-5 h-5 text-gray-300" />
                            </button>

                            {/* PROFILE */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10"
                                >
                                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                                        <MdPerson className="w-5 h-5 text-white" />
                                    </div>
                                    <MdKeyboardArrowDown className="w-4 h-4 text-gray-300" />
                                </button>

                                {/* PROFILE DROPDOWN */}
                                {isProfileOpen && dashboardData && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40 bg-black/50"
                                            onClick={() => setIsProfileOpen(false)}
                                        />

                                        <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-2xl border border-white/10 py-4 z-50">
                                            <div className="px-4 py-2 border-b border-white/10">
                                                <p className="text-sm font-semibold text-white">
                                                    {dashboardData.fullname} ({dashboardData.role})
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    {dashboardData.email}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    Site ID: {dashboardData.siteid}
                                                </p>
                                            </div>

                                            <button
                                                onClick={handleLogOut}
                                                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-white/10 text-red-400"
                                            >
                                                <MdLogout className="w-4 h-4" />
                                                <span className="text-sm">Logout</span>
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* ================= MOBILE SIDEBAR ================= */}
            {isSidebarOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />

                    <aside className="fixed top-0 left-0 h-full w-72 bg-gray-900 z-50 lg:hidden">
                        <div className="flex flex-col h-full">

                            <div className="flex items-center justify-between p-6 border-b border-white/10">
                                <h2 className="text-lg font-black text-white">
                                    This Is Not Normal
                                </h2>
                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="p-2 rounded-lg hover:bg-white/10"
                                >
                                    <X className="w-5 h-5 text-gray-300" />
                                </button>
                            </div>

                            <nav className="flex-1 overflow-y-auto p-4">
                                <div className="space-y-1">
                                    {navItems.map((item) => (
                                        <button
                                            key={item.section}
                                            onClick={() => {
                                                setActiveSection(item.section);
                                                setIsSidebarOpen(false);
                                            }}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm ${activeSection === item.section
                                                ? "bg-blue-600 text-white"
                                                : "text-gray-300 hover:text-white hover:bg-white/10"
                                                }`}
                                        >
                                            <item.icon className="w-5 h-5" />
                                            <span>{item.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </nav>

                            <div className="p-4 border-t border-white/10">
                                <button
                                    onClick={handleLogOut}
                                    className="w-full flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </aside>
                </>
            )}
        </>
    );
}
