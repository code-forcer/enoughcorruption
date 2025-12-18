"use client";
import React, { useState, useEffect } from "react";
import {
  X,
  Home,
  BarChart3,
  Users,
  FileText,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import {
  FaUserShield
} from "react-icons/fa";
import AppHeader from "@/components/AppHeader";
import ContactsManagement from "@/components/ContactManagement";
import { usePathname } from "next/navigation";
import HomeDashboard from "@/components/DashHeader";
import VoteSection from "@/components/VoteSection";
import PollResults from "@/components/ResultsSection";
import BackendStats from "@/components/BackendStats";
import AdminSection from "@/components/AdminSection";
import GFooter from "@/components/GlobalFooter";
import { useMemo } from "react";

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
  // Guest controls
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const isGuest = !token;
  // load helper:
  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  };

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
    window.location.href = "/";
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


  const loadDashboard = async () => {
    try {
      const res = await fetch(`${API}/api/dashboard`, {
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : {}, // 👈 GUEST = NO AUTH HEADER
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
      const token = getToken();

      const res = await fetch(`${API}/api/questions`, {
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : {}, // 👈 GUEST = NO AUTH HEADER
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      const shuffled = (data.data || []).sort(() => Math.random() - 0.5);

      setAllQuestions(shuffled);
      setActiveQuestion(shuffled[0] || null);
      setCurrentIndex(0);
    } catch (error) {
      console.error("Error loading questions:", error);
      setError("Welcome Guest, Failed to load questions");
    }
  };

  // Load results
  const loadResults = async (questionId = null) => {
    try {
      const url = questionId
        ? `${API}/api/results/${questionId}`
        : `${API}/api/results`;

      const res = await fetch(url, {
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : {}, // 👈 GUEST = NO AUTH HEADER
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
    if (selectedTerms.size === 0 || !activeQuestion) return;

    setLoading(true);

    try {
      const token = getToken();

      const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const res = await fetch(`${API}/api/vote`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          terms: Array.from(selectedTerms),
          questionId: activeQuestion._id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Vote failed");
      }

      // ✅ Prevent double voting (guest + auth)
      const votedKey = `voted_${activeQuestion._id}`;
      localStorage.setItem(votedKey, "true");

      setHasVoted(true);
      setSelectedTerms(new Set());

      await Promise.all([loadResults(), loadDashboard()]);
      setActiveSection("results");

    } catch (err) {
      console.error(err);
      setError(err.message || "Network error");
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

  const baseNavItems = [
    { icon: Home, label: "Home", section: "home" },
    { icon: BarChart3, label: "Vote", section: "vote" },
    { icon: TrendingUp, label: "Results", section: "results" },
    { icon: FileText, label: "Backend Stats", section: "backend" }
  ];
  // Add admin-only navigation items if user is admin
  const isAdmin = dashboardData?.role === "admin";

  const navItems = useMemo(() => {
    return [
      ...baseNavItems,
      ...(isAdmin
        ? [
          {
            icon: Users,
            label: "Admin",
            section: "admin",
            adminOnly: true,
          },
          {
            icon: FaUserShield,
            label: "Contact Management",
            section: "contacts",
            adminOnly: true,
          },
        ]
        : []),
    ];
  }, [isAdmin]);

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
const prepareCleanReport = async () => {
  console.log('prepareCleanReport called');
  console.log('window.domtoimage:', window.domtoimage);
  console.log('window.jspdf:', window.jspdf);
  
  // Check if libraries are loaded
  if (!window.domtoimage || !window.jspdf) {
    console.error('Libraries not loaded');
    alert('PDF libraries are still loading. Please try again in a moment.');
    return;
  }
  
  console.log('Libraries loaded successfully');
  const domtoimage = window.domtoimage;
  const { jsPDF } = window.jspdf;

  // Create a clean container for export
  const exportContainer = document.createElement('div');
  exportContainer.id = 'clean-export-container';
  exportContainer.style.cssText = `
    position: fixed;
    top: -10000px;
    left: -10000px;
    width: 1400px;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    padding: 60px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  `;

    // Header Section
    const header = document.createElement('div');
    header.style.cssText = `
      text-align: center;
      margin-bottom: 50px;
      padding-bottom: 30px;
      border-bottom: 3px solid rgba(59, 130, 246, 0.3);
    `;
    header.innerHTML = `
      <h1 style="
        color: #ffffff;
        font-size: 48px;
        font-weight: 900;
        margin: 0 0 15px 0;
        letter-spacing: -1px;
        text-shadow: none;
        border: none;
        outline: none;
      ">📊 Poll Analytics Report</h1>
      <h2 style="
        color: #94a3b8;
        font-size: 28px;
        font-weight: 600;
        margin: 0;
        text-shadow: none;
        border: none;
        outline: none;
      ">${activeQuestion?.text || 'Survey Results'}</h2>
      <p style="
        color: #64748b;
        font-size: 16px;
        margin: 15px 0 0 0;
        text-shadow: none;
        border: none;
        outline: none;
      ">Generated on ${new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}</p>
    `;
    exportContainer.appendChild(header);

    // Key Metrics Section
    const metricsSection = document.createElement('div');
    metricsSection.style.cssText = `
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      margin-bottom: 50px;
    `;

    const metrics = [
      {
        icon: '🗳️',
        label: 'Total Votes',
        value: dashboardData?.stats?.totalSelections?.toLocaleString() || '0',
        color: '#3b82f6'
      },
      {
        icon: '🏆',
        label: 'Top Choice',
        value: dashboardData?.top5?.[0]?.term || 'N/A',
        subValue: `${dashboardData?.top5?.[0]?.percentage || 0}%`,
        color: '#8b5cf6'
      },
      {
        icon: '👥',
        label: 'Participants',
        value: dashboardData?.stats?.uniqueVoters?.toLocaleString() || '0',
        color: '#10b981'
      }
    ];

    metrics.forEach(metric => {
      const card = document.createElement('div');
      card.style.cssText = `
        background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
        border: 2px solid rgba(255,255,255,0.1);
        border-radius: 16px;
        padding: 30px;
        text-align: center;
        box-shadow: none;
      `;
      card.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 15px;">${metric.icon}</div>
        <p style="
          color: #94a3b8;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0 0 10px 0;
          text-shadow: none;
          border: none;
        ">${metric.label}</p>
        <p style="
          color: #ffffff;
          font-size: 36px;
          font-weight: 900;
          margin: 0;
          text-shadow: none;
          border: none;
          ${metric.value.length > 20 ? 'font-size: 24px;' : ''}
        ">${metric.value}</p>
        ${metric.subValue ? `
          <p style="
            color: ${metric.color};
            font-size: 24px;
            font-weight: 700;
            margin: 8px 0 0 0;
            text-shadow: none;
            border: none;
          ">${metric.subValue}</p>
        ` : ''}
      `;
      metricsSection.appendChild(card);
    });
    exportContainer.appendChild(metricsSection);

    // Top 5 Rankings Section
    const rankingsSection = document.createElement('div');
    rankingsSection.style.cssText = `margin-bottom: 50px;`;
    
    const rankingsTitle = document.createElement('h3');
    rankingsTitle.style.cssText = `
      color: #ffffff;
      font-size: 32px;
      font-weight: 900;
      margin: 0 0 30px 0;
      text-shadow: none;
      border: none;
      outline: none;
    `;
    rankingsTitle.textContent = '🏆 Top 5 Rankings';
    rankingsSection.appendChild(rankingsTitle);

    const rankingsContainer = document.createElement('div');
    rankingsContainer.style.cssText = `display: flex; flex-direction: column; gap: 20px;`;

    if (dashboardData?.top5?.length > 0) {
      dashboardData.top5.forEach((item, i) => {
        const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'];
        const color = colors[i];
        
        const rankCard = document.createElement('div');
        rankCard.style.cssText = `
          background: linear-gradient(90deg, ${color}15 0%, transparent 100%);
          border: 2px solid ${color}40;
          border-radius: 12px;
          padding: 25px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: none;
        `;

        const leftSection = document.createElement('div');
        leftSection.style.cssText = `display: flex; align-items: center; gap: 20px; flex: 1;`;
        leftSection.innerHTML = `
          <div style="
            width: 60px;
            height: 60px;
            background: ${color}30;
            border: 3px solid ${color};
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            font-weight: 900;
            color: #ffffff;
            flex-shrink: 0;
            box-shadow: none;
            text-shadow: none;
          ">${i + 1}</div>
          <div style="flex: 1; min-width: 0;">
            <p style="
              color: #ffffff;
              font-size: 24px;
              font-weight: 700;
              margin: 0 0 5px 0;
              text-shadow: none;
              border: none;
              word-wrap: break-word;
            ">${item.term}</p>
            <p style="
              color: #94a3b8;
              font-size: 14px;
              margin: 0;
              text-shadow: none;
              border: none;
            ">${item.count.toLocaleString()} votes</p>
          </div>
        `;

        const rightSection = document.createElement('div');
        rightSection.style.cssText = `text-align: right; margin-left: 20px;`;
        rightSection.innerHTML = `
          <p style="
            color: ${color};
            font-size: 42px;
            font-weight: 900;
            margin: 0;
            text-shadow: none;
            border: none;
          ">${item.percentage}%</p>
        `;

        rankCard.appendChild(leftSection);
        rankCard.appendChild(rightSection);
        rankingsContainer.appendChild(rankCard);
      });
    }

    rankingsSection.appendChild(rankingsContainer);
    exportContainer.appendChild(rankingsSection);

    // Other Results Section
    const otherResults = resultsData?.results?.slice(5).filter(item => item.count > 0) || [];
    if (otherResults.length > 0) {
      const othersSection = document.createElement('div');
      
      const othersTitle = document.createElement('h3');
      othersTitle.style.cssText = `
        color: #ffffff;
        font-size: 32px;
        font-weight: 900;
        margin: 0 0 30px 0;
        text-shadow: none;
        border: none;
        outline: none;
      `;
      othersTitle.textContent = '📋 Additional Results';
      othersSection.appendChild(othersTitle);

      const othersGrid = document.createElement('div');
      othersGrid.style.cssText = `
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
      `;

      otherResults.forEach((item, index) => {
        const percentage = item.percentageOfSelections || 0;
        const card = document.createElement('div');
        card.style.cssText = `
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 20px;
          box-shadow: none;
        `;
        card.innerHTML = `
          <p style="
            color: #ffffff;
            font-size: 18px;
            font-weight: 700;
            margin: 0 0 10px 0;
            text-shadow: none;
            border: none;
            word-wrap: break-word;
          ">${item.term}</p>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <p style="
              color: #94a3b8;
              font-size: 14px;
              margin: 0;
              text-shadow: none;
              border: none;
            ">${item.count.toLocaleString()} votes</p>
            <p style="
              color: #3b82f6;
              font-size: 20px;
              font-weight: 900;
              margin: 0;
              text-shadow: none;
              border: none;
            ">${percentage.toFixed(1)}%</p>
          </div>
        `;
        othersGrid.appendChild(card);
      });

      othersSection.appendChild(othersGrid);
      exportContainer.appendChild(othersSection);
    }

    // Footer
    const footer = document.createElement('div');
    footer.style.cssText = `
      text-align: center;
      margin-top: 50px;
      padding-top: 30px;
      border-top: 2px solid rgba(255, 255, 255, 0.1);
    `;
    footer.innerHTML = `
      <p style="
        color: #64748b;
        font-size: 14px;
        margin: 0;
        text-shadow: none;
        border: none;
      ">Analytics Dashboard @https://thisisnotnormal.social • ${new Date().getFullYear()}</p>
    `;
    exportContainer.appendChild(footer);

    document.body.appendChild(exportContainer);
  console.log('Container added');
  
  try {
    // Wait for render
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('Capturing image...');
    const dataUrl = await domtoimage.toPng(exportContainer, {
      quality: 1,
      bgcolor: '#0f172a',
      width: 1400,
      height: exportContainer.scrollHeight
    });

    console.log('Creating PDF...');
    const imgWidth = 210;
    const imgHeight = (exportContainer.scrollHeight * imgWidth) / 1400;
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageHeight = 297;
    
    let position = 0;
    pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
    
    // Handle multiple pages
    let heightLeft = imgHeight;
    while (heightLeft > pageHeight) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    const fileName = `poll-report-${Date.now()}.pdf`;
    pdf.save(fileName);
    
    alert('✅ PDF exported successfully!');
  } catch (error) {
    console.error('PDF Error:', error);
    alert('❌ Failed to generate PDF: ' + error.message);
  } finally {
    if (document.body.contains(exportContainer)) {
      document.body.removeChild(exportContainer);
    }
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
      {/* ================= HEADER ================= */}
      <AppHeader
        navItems={navItems}
        isAdmin={isAdmin}   // ✅ passed
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
        dashboardData={dashboardData}
        handleLogOut={handleLogOut}
      />

      {/* Main Content */}
      <main className="pt-20 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Guest Controls */}
          {isGuest && (
            <div className="mb-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <p className="text-yellow-300 text-sm">
                You are viewing and participating as a guest. Login to manage polls.
              </p>

              <a
                href="/login"
                className="inline-block mt-3 px-4 py-2 bg-yellow-500 text-black rounded-lg font-semibold"
              >
                Login / Register
              </a>
            </div>
          )}
          {/* Guest Controls */}
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
            {/* Vote section */}
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
            {/* Result section */}
            {activeSection === "results" && (
              <PollResults
                activeQuestion={activeQuestion}
                resultsData={resultsData}
                dashboardData={dashboardData}
                isClient={isClient}
                animationClass={animationClass}
                exportToCSV={exportToCSV}
                prepareCleanReport={prepareCleanReport}
                shareToSocial={shareToSocial}
              />
            )}
          </div>
          {/* Backend stats */}
          {activeSection === "backend" && (
            <BackendStats resultsData={resultsData} />
          )}
          {/* CONTACTS SECTION - Add this */}
          {activeSection === "contacts" && isAdmin && (
            <div className="space-y-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-2">Contact Management</h1>
                <p className="text-gray-400">Manage user inquiries and messages</p>
              </div>
              <ContactsManagement />
            </div>
          )}
          {activeSection === "admin" && isAdmin && (
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
      <GFooter />
    </div>
  );
};

export default UnifiedDashboard;
