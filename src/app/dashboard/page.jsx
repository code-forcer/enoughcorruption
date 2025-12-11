"use client";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  BarChart3,
  Users,
  Settings,
  FileText,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  User,
  Plus,
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
import ContactsManagement from "@/components/ContactManagement";

import { usePathname } from "next/navigation";
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
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10"
              >
                <Menu className="w-6 h-6 text-white" />
              </button>

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl w-10 h-10 sm:w-12 sm:h-12 shadow-lg">
                  <img src="/trump_logo.jpeg" alt="Enough Logo" />
                </div>
                <div className="sm:block">
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    ENOUGH!
                  </h1>
                  <p className="text-xs text-blue-300">Outrage, crowdsourced</p>
                </div>
              </div>
            </div>

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
            <div className="flex items-center gap-2 sm:gap-3 relative">
              {/* Bell Button */}
              <button className="relative p-2 rounded-lg hover:bg-white/10">
                <Bell className="w-5 h-5 text-gray-300" />
              </button>

              {/* Profile Button */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-300 hidden sm:block" />
                </button>

                {/* Dropdown / Modal */}
                {isProfileOpen && dashboardData && (
                  <>
                    {/* Overlay */}
                    <div
                      className="fixed inset-0 z-40 bg-black/50"
                      onClick={() => setIsProfileOpen(false)}
                    ></div>

                    {/* Dropdown */}
                    <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-2xl border border-white/10 py-4 z-50">
                      {/* User Info */}
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

                      {/* Logout Button */}
                      <button
                        onClick={handleLogOut}
                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-white/10 text-red-400 hover:text-red-300"
                      >
                        <LogOut className="w-4 h-4" />
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
                <h2 className="text-lg font-black text-white">ENOUGH!</h2>
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

          {/* HOME SECTION */}
          {activeSection === "home" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Dashboard Overview
                </h2>
                <p className="text-gray-400">Welcome back!</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-10 h-10 text-blue-400" />
                  </div>
                  <p className="text-gray-400 text-sm mb-1">Total Users</p>
                  <p className="text-3xl font-bold text-white">
                    {dashboardData?.stats?.users || 0}
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <BarChart3 className="w-10 h-10 text-green-400" />
                  </div>
                  <p className="text-gray-400 text-sm mb-1">Active Polls</p>
                  <p className="text-3xl font-bold text-white">
                    {dashboardData?.stats?.activePolls || 0}
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp className="w-10 h-10 text-purple-400" />
                  </div>
                  <p className="text-gray-400 text-sm mb-1">Total Votes</p>
                  <p className="text-3xl font-bold text-white">
                    {resultsData?.totalVoters || 0}
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <FileText className="w-10 h-10 text-orange-400" />
                  </div>
                  <p className="text-gray-400 text-sm mb-1">Total Selections</p>
                  <p className="text-3xl font-bold text-white">
                    {resultsData?.totalSelections || 0}
                  </p>
                </div>
              </div>
              {activeQuestion && (
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
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

                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => setActiveSection("vote")}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                    >
                      Cast Your Vote
                    </button>

                    <button
                      onClick={() => setActiveSection("results")}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                    >
                      View Results
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}
          {/* Vote section */}
          {activeSection === "vote" && (
            <div className="max-w-5xl mx-auto">
              <div className="bg-white/5 border border-white/10 rounded-xl p-8">

                {/* ===================== HEADER ===================== */}
                <div className="mb-6">
                  {/* Title + Date */}
                  <div className={animationClass}>
                    <h2 className="text-3xl font-bold italic text-white mb-2">
                      {activeQuestion ? activeQuestion.text : "No active question"}
                      &nbsp; - &nbsp;<span className="text-white text-sm">
                        {activeQuestion?.pubDate
                          ? new Date(activeQuestion.pubDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )
                          : "No date"}
                      </span>
                    </h2>
                    <div className="flex items-center justify-between">
                      <div>

                        <p className="text-gray-400 mt-2">
                          Select ALL descriptions that apply (multiple selections allowed)
                        </p>
                      </div>

                      {/* Navigation Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={prevPoll}
                          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold transition border border-white/20"
                        >
                          ← Previous
                        </button>

                        <button
                          onClick={nextPoll}
                          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold transition border border-white/20"
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ===================== NO ACTIVE QUESTION ===================== */}
                {!activeQuestion ? (
                  <div className="text-center py-12">
                    <AlertCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">
                      No active question available
                    </p>
                  </div>
                ) : (
                  <>
                    {/* ===================== INSTRUCTIONS ===================== */}
                    {!hasVoted && (
                      <div className="bg-[#0ea4ff]/10 border border-[#0ea4ff]/30 rounded-lg p-4 mb-6">
                        <p className="text-sm text-[#0ea4ff]">
                          <strong>📌 Instructions:</strong> Click on as many terms
                          as you feel apply. One vote per IP address.
                        </p>
                      </div>
                    )}

                    {/* ===================== OPTIONS ===================== */}
                    <div className={animationClass}>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                        {FIXED_TERMS.map((term) => (
                          <button
                            key={term}
                            onClick={() => toggleTerm(term)}
                            disabled={hasVoted || loading}
                            className={`
          p-3 sm:p-4 rounded-lg font-semibold text-xs sm:text-sm transition-all
          min-h-[60px] sm:min-h-[70px]
          flex items-center justify-center text-center
          leading-tight
          ${selectedTerms.has(term)
                                ? "bg-[#0ea4ff] text-white scale-105 shadow-lg shadow-[#0ea4ff]/50"
                                : hasVoted || loading
                                  ? "bg-white/5 text-gray-500 cursor-not-allowed"
                                  : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/10"
                              }
        `}
                          >
                            <span className="line-clamp-3 break-words w-full">
                              {term}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* ===================== BOTTOM BUTTONS ===================== */}
                    {!hasVoted && (
                      <div className="flex items-center justify-between pt-6 border-t border-white/10">
                        <button
                          onClick={() => setSelectedTerms(new Set())}
                          disabled={loading}
                          className="bg-red-400 text-white px-6 py-3 rounded-lg font-semibold transition  border border-white/20"
                        >
                          Clear All
                        </button>

                        <button
                          onClick={submitVote}
                          disabled={loading || selectedTerms.size === 0}
                          className="hover:bg-green-700 bg-[#0c8ed9] text-white px-8 py-3 rounded-lg font-bold text-lg transition"
                        >
                          {loading ? "Submitting..." : "Submit Vote →"}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
          {/* RESULTS SECTION */}
          {activeSection === "results" && (
            <div className="space-y-8" id="results-content">
              {/* HEADER WITH BUTTONS - UPDATED VERSION */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1">
                    Poll Results
                  </h2>
                  <p className="text-gray-400">
                    {activeQuestion
                      ? activeQuestion.text
                      : "No active question"}
                  </p>
                </div>

                {/* Export & Share Buttons */}
                {/* Export & Share Buttons */}
                {isClient && resultsData && (
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={exportToCSV}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-semibold shadow-lg"
                    >
                      <Download size={18} />
                      <span className="hidden sm:inline">CSV</span>
                    </button>

                    <button
                      onClick={exportToPDF}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-semibold shadow-lg"
                    >
                      <Download size={18} />
                      <span className="hidden sm:inline">PDF</span>
                    </button>

                    <button
                      onClick={downloadAsImage}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition font-semibold shadow-lg"
                    >
                      <Camera size={18} />
                      <span className="hidden sm:inline">Image</span>
                    </button>

                    {/* Share Button with Dropdown */}
                    {/* Share Button with Dropdown */}
                    {/* Share Button with Dropdown */}
                    <div className="relative group">
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-semibold shadow-lg">
                        <Share2 size={18} />
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

              {/* Summary Stats - KEEP YOUR EXISTING CODE */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-xl p-6">
                  <p className="text-sm text-blue-300 mb-2">Total Votes Cast</p>
                  <p className="text-4xl font-bold text-white">
                    {dashboardData?.stats?.totalSelections?.toLocaleString() ||
                      "0"}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-xl p-6">
                  <p className="text-sm text-purple-300 mb-2">
                    Most Selected Term
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {dashboardData?.top5?.[0]?.term || "N/A"}
                  </p>
                  <p className="text-sm text-purple-300 mt-1">
                    {dashboardData?.top5?.[0]?.count || 0} votes
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-xl p-6">
                  <p className="text-sm text-green-300 mb-2">Unique Voters</p>
                  <p className="text-4xl font-bold text-white">
                    {dashboardData?.stats?.uniqueVoters?.toLocaleString() ||
                      "0"}
                  </p>
                </div>
              </div>

              {/* ⭐ NEW CHARTS SECTION - ADD THIS HERE ⭐ */}
              {dashboardData?.top5?.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Pie Chart */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-8">
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
                          label={({ term, percentage }) =>
                            `${term}: ${percentage}%`
                          }
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
                  <div className="bg-white/5 border border-white/10 rounded-xl p-8">
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

              {/* Top 5 Visual Chart - KEEP YOUR EXISTING CODE */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
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
                                className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/5 border-2 ${color.border} font-bold text-white`}
                              >
                                {i + 1}
                              </div>
                              <span className="text-lg font-bold text-white">
                                {item.term}
                              </span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span
                                className={`text-2xl font-bold ${color.text}`}
                              >
                                {item.percentage}%
                              </span>
                              <span className="text-sm text-gray-400">
                                {item.count.toLocaleString()} votes
                              </span>
                            </div>
                          </div>
                          <div className="relative h-8 bg-white/5 rounded-full overflow-hidden">
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
                    <p className="text-gray-400 text-center py-8">
                      No votes yet
                    </p>
                  )}
                </div>
              </div>

              {/* Remaining Terms - KEEP YOUR EXISTING CODE */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  All Other Description
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resultsData?.results?.slice(2).map((item) => {
                    return (
                      <div
                        key={item.term}
                        className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-white">
                            {item.term}
                          </span>
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
          )}

          {/* BACKEND STATS SECTION */}
          {activeSection === "backend" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                Backend Statistics
              </h2>

              {resultsData && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Complete Vote Breakdown
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-white/5 border-b border-white/10">
                        <tr>
                          <th className="px-4 py-3 text-gray-300 font-semibold">
                            Rank
                          </th>
                          <th className="px-4 py-3 text-gray-300 font-semibold">
                            Term
                          </th>
                          <th className="px-4 py-3 text-gray-300 font-semibold text-right">
                            Votes
                          </th>
                          <th className="px-4 py-3 text-gray-300 font-semibold text-right">
                            % of Selections
                          </th>
                          <th className="px-4 py-3 text-gray-300 font-semibold text-right">
                            % of Voters
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultsData.results.map((item, i) => (
                          <tr
                            key={item.term}
                            className="border-b border-white/5 hover:bg-white/5"
                          >
                            <td className="px-4 py-3 text-gray-400">
                              #{i + 1}
                            </td>
                            <td className="px-4 py-3 text-white font-semibold">
                              {item.term}
                            </td>
                            <td className="px-4 py-3 text-white text-right">
                              {item.count}
                            </td>
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
                          <td
                            colSpan="2"
                            className="px-4 py-3 text-white font-bold"
                          >
                            TOTALS
                          </td>
                          <td className="px-4 py-3 text-white font-bold text-right">
                            {resultsData.totalSelections}
                          </td>
                          <td className="px-4 py-3 text-blue-400 font-bold text-right">
                            100%
                          </td>
                          <td className="px-4 py-3 text-gray-400 text-right text-sm">
                            {resultsData.totalVoters} voters
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              )}
            </div>
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
          {/* ADMIN SECTION */}
          {activeSection === "admin" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                Admin Panel
              </h2>

              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  Create New Question
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Question Text
                    </label>
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
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg text-white px-6 py-4 rounded-lg font-bold text-lg transition disabled:opacity-50"
                  >
                    {loading ? "Creating..." : "🚀 Create Question"}
                  </button>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  All Questions
                </h3>
                <div className="space-y-3">
                  {allQuestions.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">
                      No questions created yet
                    </p>
                  ) : (
                    allQuestions.map((q) => (
                      <div
                        key={q._id}
                        className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition"
                      >
                        <div className="flex-1">
                          <p className="text-white font-semibold">{q.text}</p>
                          <p className="text-sm text-gray-400 mt-1">
                            Created:{" "}
                            {new Date(q.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          {q.active ? (
                            <span className="bg-green-500/20 text-green-400 text-sm px-3 py-1 rounded-full font-semibold">
                              ✓ Active
                            </span>
                          ) : (
                            <button
                              onClick={() => activateQuestion(q._id)}
                              disabled={loading}
                              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50"
                            >
                              Activate
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  Fixed Term List (24 Descriptions)
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  These descriptions are used for every question
                </p>
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
          )}
        </div>
      </main>
    </div>
  );
};

export default UnifiedDashboard;
