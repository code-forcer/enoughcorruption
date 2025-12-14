"use client";
import React, { useState, useEffect } from "react";
import {
  X,
  Home,
  BarChart3,
  Users,
  Settings,
  FileText,
  LogOut,
  Share2,
  Download,
  TrendingUp,
  AlertCircle,
  Camera,
} from "lucide-react";
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
} from "recharts";
import {
  FaUserShield
} from "react-icons/fa";
import {
  MdMenu,
  MdClose,
  MdHome,
  MdInfo,
  MdMail,
  MdNotifications, // plural
  MdPerson,
  MdKeyboardArrowDown, // correct name
  MdLogout,
  MdRocketLaunch,
} from "react-icons/md";

import ContactsManagement from "@/components/ContactManagement";

import { usePathname } from "next/navigation";
import HomeDashboard from "@/components/DashHeader";
import VoteSection from "@/components/VoteSection";
import PollResults from "@/components/ResultsSection";
import BackendStats from "@/components/BackendStats";

import AdminSection from "@/components/AdminSection";

const UnifiedDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedTerms, setSelectedTerms] = useState(new Set());
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [allQuestions, setAllQuestions] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resultsData, setResultsData] = useState(null);
  const [newQuestionText, setNewQuestionText] = useState("");
  const voteData = dashboardData?.voteData || {};
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  //polls change
  // ========= STATE FOR NEXT / PREVIOUS POLL =========
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  // ========= ANIMATION CONTROLLER =========
  const animate = (callback) => {
    setAnimating(true);
    setTimeout(() => {
      callback();
      setTimeout(() => setAnimating(false), 200);
    }, 200);
  };
  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error("Failed to parse user data:", error);
        }
      }
    }
  }, []);
  const isAdmin = user?.role === "admin";
  // ========= NEXT POLL =========
  const nextPoll = () => {
    if (!allQuestions || allQuestions.length === 0) return;

    animate(() => {
      const nextIndex = (currentIndex + 1) % allQuestions.length;
      setCurrentIndex(nextIndex);
      setActiveQuestion(allQuestions[nextIndex]);
    });
  };

  // ========= PREVIOUS POLL =========
  const prevPoll = () => {
    if (!allQuestions || allQuestions.length === 0) return;

    animate(() => {
      const nextIndex =
        currentIndex === 0 ? allQuestions.length - 1 : currentIndex - 1;
      setCurrentIndex(nextIndex);
      setActiveQuestion(allQuestions[nextIndex]);
    });
  };

  // ========= OPTIONAL AUTO ROTATE (DISABLED BY DEFAULT) =========
  // Uncomment to enable auto-rotate every 20 seconds

  useEffect(() => {
    if (!allQuestions.length) return;

    const auto = setInterval(() => nextPoll(), 20000);
    return () => clearInterval(auto);
  }, [allQuestions]);


  // Fade animation classes
  const animationClass = animating
    ? "opacity-0 transition-opacity duration-200"
    : "opacity-100 transition-opacity duration-200";

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Fixed list of 24 terms
  const FIXED_TERMS = [
    "Unconstitutional",
    "Corrupt",
    "Illegal",
    "Outrageous",
    "Embarrassing",
    "Immoral",
    "Disgusting",
    "Grifting",
    "Cheating",
    "Insulting",
    "Sadistic",
    "Moronic",
    "Immature",
    "Dumb/Stupid",
    "Narcissistic",
    "Pathetic",
    "Beyond Words",
    "Nepotism",
    "Cronyism",
    "Incomprehensible",
    "Pandering",
    "Dangerous",
    "Deplorable",
    "Hypocritical",
  ];

  useEffect(() => {
    loadDashboard();
    loadQuestions();
    loadResults();
  }, []);

  useEffect(() => {
    if (activeQuestion) {
      checkIfVoted();
    }
  }, [activeQuestion]);

  const getToken = () => localStorage.getItem("token");
  const loadDashboard = async () => {
    try {
      const res = await fetch(`${API}/api/dashboard`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      setDashboardData(data);
    } catch (error) {
      console.error("Error loading dashboard:", error);
      setDashboardData({
        fullname: "",
        role: "",
        email: "",
        siteid: "",
        userId: "",
        stats: { users: 0, pollsCreated: 0, activePolls: 0, engagements: 0 },
      });
    }
  };

  const loadQuestions = async () => {
    try {
      const res = await fetch(`${API}/api/questions`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();

      // Shuffle the questions array randomly
      const shuffled = (data.data || []).sort(() => Math.random() - 0.5);

      setAllQuestions(shuffled);
      setActiveQuestion(shuffled[0]); // Set first from shuffled array
      setCurrentIndex(0); // Reset index
    } catch (error) {
      console.error("Error loading questions:", error);
      setError("Failed to load questions");
    }
  };

  // Load results
  const loadResults = async (questionId = null) => {
    try {
      const url = questionId
        ? `${API}/api/results/${questionId}`
        : `${API}/api/results`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (res.ok) {
        const data = await res.json();
        setResultsData(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const checkIfVoted = () => {
    if (!activeQuestion) return;
    const votedKey = `voted_${activeQuestion._id}`;
    const voted = localStorage.getItem(votedKey);
    setHasVoted(!!voted);
  };

  const toggleTerm = (term) => {
    if (hasVoted || loading) return;
    const newSelected = new Set(selectedTerms);
    if (newSelected.has(term)) {
      newSelected.delete(term);
    } else {
      newSelected.add(term);
    }
    setSelectedTerms(newSelected);
  };


  const submitVote = async () => {
    if (selectedTerms.size === 0) return;

    setLoading(true);
    try {
      const res = await fetch(`${API}/api/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          terms: Array.from(selectedTerms),
          questionId: activeQuestion._id,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        const votedKey = `voted_${activeQuestion._id}`;
        localStorage.setItem(votedKey, "true");
        setHasVoted(true);
        setSelectedTerms(new Set());

        // ✅ Reload both results AND dashboard **after vote is saved**
        await Promise.all([loadResults(), loadDashboard()]);
        setActiveSection("results");
      } else {
        setError(data.message || "Failed to submit vote");
      }
    } catch (err) {
      console.error(err);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const createQuestion = async () => {
    if (!newQuestionText.trim()) {
      setError("Please enter a question");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API}/api/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ text: newQuestionText }),
      });

      const data = await res.json();

      if (res.ok) {
        showNotification("✅ Question created successfully!");
        setNewQuestionText("");
        await loadQuestions();
      } else {
        setError(data.message || "Failed to create question");
      }
    } catch (error) {
      console.error("Error creating question:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const activateQuestion = async (questionId) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API}/api/questions/activate/${questionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        showNotification("✅ Question activated!");
        await loadQuestions();
        await loadResults();
      } else {
        setError(data.message || "Failed to activate question");
      }
    } catch (error) {
      console.error("Error activating question:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message) => {
    alert(message);
  };
  const exportToCSV = () => {
    if (!resultsData) return;
    const { results, totalVoters, totalSelections } = resultsData;

    let csv = "Rank,Term,Vote Count,% of Selections,% of Voters\n";
    results.forEach((item, i) => {
      csv += `${i + 1},"${item.term}",${item.count
        },${item.percentageOfSelections.toFixed(
          1
        )}%,${item.percentageOfVoters.toFixed(1)}%\n`;
    });

    csv += `\n"Total Voters",${totalVoters}\n`;
    csv += `"Total Selections",${totalSelections}\n`;

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `poll-results-${Date.now()}.csv`;
    a.click();
    alert("✅ CSV file downloaded!");
  };

  const navItems = [
    { icon: Home, label: "Home", section: "home" },
    { icon: BarChart3, label: "Vote", section: "vote" },
    { icon: TrendingUp, label: "Results", section: "results" },
    { icon: FileText, label: "Backend Stats", section: "backend" },
    { icon: Settings, label: "Admin", section: "admin" },
    { icon: FaUserShield, label: "Contact Management", section: "contacts" },

  ];
  // Add admin-only navigation items if user is admin
  if (isAdmin) {
    navItems.push({
      icon: Users,
      label: "Manage Contacts",
      section: "contacts",
      adminOnly: true
    });
  }
  // Chart colors
  const COLORS = [
    "#EF4444",
    "#F59E0B",
    "#EAB308",
    "#10B981",
    "#3B82F6",
    "#8B5CF6",
    "#EC4899",
  ];
  // Helper function to fix unsupported colors before export
  const prepareElementForExport = (element) => {
    const clone = element.cloneNode(true);

    // Find all elements with potentially problematic colors
    const allElements = clone.querySelectorAll('*');
    allElements.forEach(el => {
      const computedStyle = window.getComputedStyle(el);

      // Convert background-color
      if (computedStyle.backgroundColor && computedStyle.backgroundColor.includes('lab')) {
        el.style.backgroundColor = '#0f172a'; // Fallback color
      }

      // Convert color
      if (computedStyle.color && computedStyle.color.includes('lab')) {
        el.style.color = '#ffffff'; // Fallback color
      }

      // Convert border-color
      if (computedStyle.borderColor && computedStyle.borderColor.includes('lab')) {
        el.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      }
    });

    return clone;
  };
  // PDF Export with better library detection
  const exportToPDF = async () => {
    try {
      // Better library detection with longer timeout
      let attempts = 0;
      const maxAttempts = 50; // 10 seconds total

      while (attempts < maxAttempts) {
        if (window.domtoimage && window.jspdf) {
          break; // Both libraries loaded!
        }
        await new Promise(resolve => setTimeout(resolve, 200));
        attempts++;
      }

      // Debug: Log what we found
      console.log('domtoimage:', typeof window.domtoimage);
      console.log('jspdf:', typeof window.jspdf);

      if (!window.domtoimage || !window.jspdf) {
        alert("❌ Libraries failed to load. Please:\n1. Refresh the page\n2. Wait 5 seconds\n3. Try export again");
        return;
      }

      const element = document.getElementById("results-content");
      if (!element) {
        alert("❌ Could not find results to export");
        return;
      }

      // Show loading
      const loadingDiv = document.createElement('div');
      loadingDiv.id = 'pdf-loading';
      loadingDiv.innerHTML = '<div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.9);color:white;padding:20px 40px;border-radius:10px;z-index:9999;font-family:sans-serif;font-size:16px;">Generating PDF...<br/><small>This may take a few seconds</small></div>';
      document.body.appendChild(loadingDiv);

      // Generate image
      const dataUrl = await window.domtoimage.toPng(element, {
        quality: 0.95,
        bgcolor: '#0f172a',
      });

      // Create PDF
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Cleanup
      document.body.removeChild(loadingDiv);

      // Download
      pdf.save(`poll-results-${Date.now()}.pdf`);
      alert("✅ PDF downloaded successfully!");

    } catch (error) {
      console.error("PDF export error:", error);
      const loadingDiv = document.getElementById('pdf-loading');
      if (loadingDiv) document.body.removeChild(loadingDiv);
      alert("❌ Export failed: " + error.message);
    }
  };

  // Image Download with better library detection
  const downloadAsImage = async () => {
    try {
      // Better library detection
      let attempts = 0;
      const maxAttempts = 50;

      while (attempts < maxAttempts) {
        if (window.domtoimage) {
          break;
        }
        await new Promise(resolve => setTimeout(resolve, 200));
        attempts++;
      }

      console.log('domtoimage:', typeof window.domtoimage);

      if (!window.domtoimage) {
        alert("❌ Library failed to load. Please:\n1. Refresh the page\n2. Wait 5 seconds\n3. Try export again");
        return;
      }

      const element = document.getElementById("results-content");
      if (!element) {
        alert("❌ Could not find results to export");
        return;
      }

      // Show loading
      const loadingDiv = document.createElement('div');
      loadingDiv.id = 'image-loading';
      loadingDiv.innerHTML = '<div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.9);color:white;padding:20px 40px;border-radius:10px;z-index:9999;font-family:sans-serif;font-size:16px;">Generating Image...<br/><small>This may take a few seconds</small></div>';
      document.body.appendChild(loadingDiv);

      // Generate image
      const blob = await window.domtoimage.toBlob(element, {
        quality: 0.95,
        bgcolor: '#0f172a',
      });

      // Download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `poll-results-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      // Cleanup
      document.body.removeChild(loadingDiv);
      alert("✅ Image downloaded successfully!");

    } catch (error) {
      console.error("Image export error:", error);
      const loadingDiv = document.getElementById('image-loading');
      if (loadingDiv) document.body.removeChild(loadingDiv);
      alert("❌ Export failed: " + error.message);
    }
  };
  const shareToSocial = (platform) => {
    const questionText = activeQuestion?.text || "Poll Results";
    const topTerm = dashboardData?.top5?.[0]?.term || "N/A";
    const topPercentage = dashboardData?.top5?.[0]?.percentage || "0";

    const text = `${questionText}\n\nTop choice: ${topTerm} (${topPercentage}%)`;
    const url = typeof window !== 'undefined' ? window.location.href : '';

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      // Instagram doesn't have a web share URL, so we'll copy to clipboard
      instagram: null,
    };

    // Special handling for Instagram
    if (platform === 'instagram') {
      // Copy text and URL to clipboard
      const shareText = `${text}\n\n${url}`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert('✅ Copied to clipboard!\n\nPaste this in your Instagram story or post.');
      }).catch(() => {
        alert('📋 Copy this text and paste in Instagram:\n\n' + shareText);
      });
      return;
    }

    if (shareUrls[platform]) {
      const width = 600;
      const height = 600;
      const left = (window.screen.width - width) / 2;
      const top = (window.screen.height - height) / 2;

      window.open(
        shareUrls[platform],
        'share-dialog',
        `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`
      );
    }
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 border border-white/20 rounded-lg p-3 shadow-xl">
          <p className="text-white font-semibold">{payload[0].name}</p>
          <p className="text-blue-400">{payload[0].value} votes</p>
          <p className="text-gray-400 text-sm">
            {(
              (payload[0].value / dashboardData?.stats?.totalSelections) *
              100
            ).toFixed(1)}
            %
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left Section: Logo + Mobile Menu */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10"
              >
                <MdMenu className="w-6 h-6 text-white" />
              </button>

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 shadow-lg">
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
                  <p className="text-xs text-blue-300">Outrage, crowdsourced</p>
                </div>

              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => setActiveSection(item.section)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${activeSection === item.section
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Right Section: Notification + Profile */}
            <div className="flex items-center gap-2 sm:gap-3 relative">
              {/* Notification Button */}
              <button className="relative p-2 rounded-lg hover:bg-white/10">
                <MdNotifications className="w-5 h-5 text-gray-300" />
              </button>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <MdPerson className="w-5 h-5 text-white" />
                  </div>
                  <MdKeyboardArrowDown className="w-4 h-4 text-gray-300  sm:block" />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && dashboardData && (
                  <>
                    {/* Overlay */}
                    <div
                      className="fixed inset-0 z-40 bg-black/50"
                      onClick={() => setIsProfileOpen(false)}
                    ></div>

                    <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-2xl border border-white/10 py-4 z-50">
                      {/* User Info */}
                      <div className="px-4 py-2 border-b border-white/10">
                        <p className="text-sm font-semibold text-white">
                          {dashboardData.fullname} ({dashboardData.role})
                        </p>
                        <p className="text-xs text-gray-400">{dashboardData.email}</p>
                        <p className="text-xs text-gray-400">
                          Site ID: {dashboardData.siteid}
                        </p>
                      </div>

                      {/* Logout */}
                      <button
                        onClick={handleLogOut}
                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-white/10 text-red-400 hover:text-red-300"
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
      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
          <aside className="fixed top-0 left-0 h-full w-72 bg-gray-900 z-50 transform transition-transform duration-300 lg:hidden">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-lg font-black text-white">This Is Not Normal</h2>
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
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm transition-all ${activeSection === item.section
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
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <main className="pt-20 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Error Display */}
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-400 font-semibold">Error</p>
                <p className="text-red-300 text-sm">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-400 hover:text-red-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          {/* Dash Header */}
          <div className="p-6">
            {activeSection === "home" && (
              <HomeDashboard
                dashboardData={dashboardData}
                activeQuestion={activeQuestion}
                setActiveSection={setActiveSection}
              />
            )}

            {activeSection === "vote" && (
              <VoteSection
                activeQuestion={activeQuestion}
                hasVoted={hasVoted}
                selectedTerms={selectedTerms}
                toggleTerm={toggleTerm}
                submitVote={submitVote}
                setSelectedTerms={setSelectedTerms}
                FIXED_TERMS={FIXED_TERMS}
                prevPoll={prevPoll}
                nextPoll={nextPoll}
                animationClass={animationClass}
                loading={loading}
              />
            )}

            {activeSection === "results" && (
              <PollResults
                activeQuestion={activeQuestion}
                resultsData={resultsData}
                dashboardData={dashboardData}
                isClient={isClient}
                exportToCSV={exportToCSV}
                exportToPDF={exportToPDF}
                downloadAsImage={downloadAsImage}
                shareToSocial={shareToSocial}
              />
            )}
          </div>

          {activeSection === "backend" && (
            <BackendStats resultsData={resultsData} />
          )}


          {/* Existing sections like home, vote, results, backend, admin... */}

          {/* CONTACTS SECTION - Add this */}
          {activeSection === "contacts" && (
            <div className="space-y-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-2">Contact Management</h1>
                <p className="text-gray-400">Manage user inquiries and messages</p>
              </div>
              <ContactsManagement />
            </div>
          )}




          {activeSection === "admin" && (
            <AdminSection
              newQuestionText={newQuestionText}
              setNewQuestionText={setNewQuestionText}
              createQuestion={createQuestion}
              allQuestions={allQuestions}
              activateQuestion={activateQuestion}
              loading={loading}
              FIXED_TERMS={FIXED_TERMS}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default UnifiedDashboard;
