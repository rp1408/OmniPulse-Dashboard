import React, { useState, useEffect } from "react";
import { FaInstagram, FaFacebook, FaMeta } from "react-icons/fa6";
import { BarChart3 } from "lucide-react";
import { UseAuth } from "../AuthContext"; // This will now look for AuthContext.jsx
import {
  Eye,
  Users,
  FileText,
  ChevronDown,
  ArrowRight,
  UserCheck,
  Share2,
  TrendingUp,
} from "lucide-react";
import DashboardHeader from "./Header";
import Sidebar from "./Sidebar";
import RightSidebar from "./Rightsidebar";
import Login from "./Login"; // Using Login component
import InstagramDash from "./instagramdash";

export default function Home() {
  const [currentView, setCurrentView] = useState("home");
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [metrics, setMetrics] = useState({
    views: 27600000,
    followers: 219300,
    reports: 1500,
  });
  const [topPerformers, SetTopPerformers] = useState([
    {
      name: "Kishan",
      handle: "@kp",
      percentage: 39,
      color: "bg-gray-800",
    },
    {
      name: "Lalo",
      handle: "@lalo",
      percentage: 18,
      color: "bg-orange-500",
    },
    {
      name: "Happy",
      handle: "@happy",
      percentage: 25,
      color: "bg-blue-500",
    },
  ]);
  const [currentValue, setCurrentValue] = useState(32210);
  const [projects] = useState([
    {
      name: "Lead Generation Campaign",
      duration: "2 weeks",
      status: "In Progress",
      progress: 75,
      icon: <UserCheck className="w-5 h-5" />,
      color: "bg-blue-400",
      details: "120 / 160 leads",
      deadline: "3 days left",
    },
    {
      name: "Social Media Strategy",
      duration: "1 week",
      status: "Planning",
      progress: 25,
      icon: <Share2 className="w-5 h-5" />,
      color: "bg-green-400",
      details: "5 / 20 posts",
      deadline: "7 days left",
    },
    {
      name: "Client Analytics Report",
      duration: "3 days",
      status: "Review",
      progress: 90,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "bg-pink-400",
      details: "18 / 20 reports",
      deadline: "1 day left",
    },
  ]);

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Use AuthContext instead of local state
  const { isLoggedIn, userName, login, logout, isLoading } = UseAuth();

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        views: prev.views + Math.floor(Math.random() * 1000),
        followers: prev.followers + Math.floor(Math.random() * 10),
        reports: prev.reports + Math.floor(Math.random() * 5),
      }));
      setCurrentValue((prev) => prev + Math.floor(Math.random() * 100) - 50);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "m";
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num.toString();
  };

  const handleLoginSuccess = (email) => {
    console.log("Login success with email:", email);
    login(email); // Use AuthContext login function
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    console.log("Logging out");
    logout(); // Use AuthContext logout function
  };

  const handleNavigateToInstagram = (username) => {
    console.log("Navigating to Instagram dashboard for:", username);
    setCurrentView("instagram");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
  };

  // Function to show main login modal
  const handleShowMainLogin = () => {
    console.log("Showing main login modal");
    setIsLoginOpen(true);
  };

  // Show loading if auth is still loading
  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{ backgroundColor: "#F6F9FC" }}
      >
        <div className="text-xl" style={{ color: "#0A2540" }}>
          Loading...
        </div>
      </div>
    );
  }

  // Render Instagram Dashboard if current view is instagram
  if (currentView === "instagram") {
    return <InstagramDash onBackToHome={handleBackToHome} />;
  }

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ backgroundColor: "#F6F9FC" }}
    >
      {/* Left Sidebar */}
      <Sidebar
        isLoggedIn={isLoggedIn}
        userName={userName}
        setIsLoginOpen={setIsLoginOpen}
        handleLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with onShowMainLogin prop */}
        <DashboardHeader
          onNavigateToInstagram={handleNavigateToInstagram}
          onShowMainLogin={handleShowMainLogin}
        />

        {/* Dashboard Content - Updated Color Scheme */}
        <div
          className="flex-1 p-6 overflow-y-auto"
          style={{ backgroundColor: "#F6F9FC" }}
        >
          {/* User Welcome Message */}
          {isLoggedIn && (
            <div
              className="mb-4 text-xl font-semibold"
              style={{ color: "#0A2540" }}
            >
              Welcome, {userName}!
            </div>
          )}

          {/* Top metrics and upgrade section */}
          <div className="flex items-start justify-between mb-8">
            {/* Metrics */}
            <div className="flex space-x-12">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Eye className="w-4 h-4" style={{ color: "#635BFF" }} />
                  <span className="text-sm" style={{ color: "#425466" }}>
                    Views
                  </span>
                  <div className="flex items-center space-x-1 ml-2">
                    <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent border-b-green-500"></div>
                    <span className="text-xs text-green-500">+5.2%</span>
                  </div>
                </div>
                <div
                  className="text-3xl font-bold"
                  style={{ color: "#0A2540" }}
                >
                  {formatNumber(metrics.views)}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Users className="w-4 h-4 text-red-500" />
                  <span className="text-sm" style={{ color: "#425466" }}>
                    Followers
                  </span>
                  <div className="flex items-center space-x-1 ml-2">
                    <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-red-500"></div>
                    <span className="text-xs text-red-500">-2.1%</span>
                  </div>
                </div>
                <div
                  className="text-3xl font-bold"
                  style={{ color: "#0A2540" }}
                >
                  {formatNumber(metrics.followers)}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <FileText className="w-4 h-4" style={{ color: "#635BFF" }} />
                  <span className="text-sm" style={{ color: "#425466" }}>
                    Reports
                  </span>
                  <div className="flex items-center space-x-1 ml-2">
                    <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent border-b-green-500"></div>
                    <span className="text-xs text-green-500">+3.7%</span>
                  </div>
                </div>
                <div
                  className="text-3xl font-bold"
                  style={{ color: "#0A2540" }}
                >
                  {formatNumber(metrics.reports)}
                </div>
              </div>
            </div>

            {/* Upgrade section */}
            <div
              className="rounded-2xl p-4 flex items-center space-x-4 shadow-sm"
              style={{
                backgroundColor: "#F6F9FC",
                border: "1px solid #635BFF",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#635BFF" }}
              >
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: "#635BFF" }}
                  ></div>
                </div>
              </div>
              <div>
                <div
                  className="text-base font-bold"
                  style={{ color: "#0A2540" }}
                >
                  Upgrade Your
                </div>
                <div
                  className="text-base font-bold"
                  style={{ color: "#0A2540" }}
                >
                  Crowd
                </div>
                <div className="text-xs mt-1" style={{ color: "#425466" }}>
                  Pro plan for better results.
                </div>
              </div>
              <button
                className="text-white px-6 py-3 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#635BFF" }}
              >
                NOW
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Activity Chart */}
            <div className="col-span-2">
              <div
                className="bg-white rounded-xl p-6 shadow-sm"
                style={{ border: "1px solid #F6F9FC" }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2
                    className="text-xl font-bold"
                    style={{ color: "#0A2540" }}
                  >
                    Activity
                  </h2>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm" style={{ color: "#425466" }}>
                      Data updates every 3hours
                    </span>
                    <div
                      className="flex items-center space-x-1 text-sm"
                      style={{ color: "#425466" }}
                    >
                      <span>01-07 May</span>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="relative h-56">
                  {/* Y-axis labels */}
                  <div
                    className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs py-4"
                    style={{ color: "#425466" }}
                  >
                    <span>5k</span>
                    <span>4k</span>
                    <span>3k</span>
                    <span>2k</span>
                    <span>1k</span>
                    <span>0</span>
                  </div>

                  {/* Chart area */}
                  <div className="ml-8 h-full relative">
                    <svg className="w-full h-full" viewBox="0 0 400 200">
                      {/* Grid lines */}
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <line
                          key={i}
                          x1="0"
                          y1={20 + i * 30}
                          x2="400"
                          y2={20 + i * 30}
                          stroke="#F6F9FC"
                          strokeWidth="1"
                        />
                      ))}

                      {/* Chart curve */}
                      <path
                        d="M 20 120 Q 80 100, 120 80 T 200 90 T 280 70 T 360 85"
                        fill="none"
                        stroke="#635BFF"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      {/* Data points */}
                      {[
                        [20, 120],
                        [120, 80],
                        [200, 90],
                        [280, 70],
                        [360, 85],
                      ].map((point, index) => (
                        <circle
                          key={index}
                          cx={point[0]}
                          cy={point[1]}
                          r="4"
                          fill="#635BFF"
                          stroke="white"
                          strokeWidth="2"
                        />
                      ))}
                    </svg>

                    {/* X-axis labels */}
                    <div
                      className="absolute bottom-0 left-0 w-full flex justify-between text-xs px-4"
                      style={{ color: "#425466" }}
                    >
                      <span>01</span>
                      <span>02</span>
                      <span>03</span>
                      <span>04</span>
                      <span>05</span>
                      <span>06</span>
                      <span>07</span>
                    </div>
                  </div>

                  {/* Current value */}
                  <div className="absolute top-4 right-4 text-right">
                    <div
                      className="text-2xl font-bold"
                      style={{ color: "#0A2540" }}
                    >
                      {currentValue.toLocaleString()}
                    </div>
                    <div className="text-xs" style={{ color: "#425466" }}>
                      peak users
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top performers */}
            <div
              className="bg-white rounded-xl p-6 shadow-sm"
              style={{ border: "1px solid #F6F9FC" }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold" style={{ color: "#0A2540" }}>
                  Top performers
                </h2>
                <button
                  className="flex items-center text-sm hover:opacity-80"
                  style={{ color: "#635BFF" }}
                >
                  View More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                        style={{
                          backgroundColor:
                            index === 0
                              ? "#0A2540"
                              : index === 1
                              ? "#635BFF"
                              : "#425466",
                        }}
                      >
                        {performer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div
                          className="font-semibold text-sm"
                          style={{ color: "#0A2540" }}
                        >
                          {performer.name}
                        </div>
                        <div className="text-xs" style={{ color: "#425466" }}>
                          {performer.handle}
                        </div>
                      </div>
                    </div>
                    <div
                      className="font-bold text-lg"
                      style={{ color: "#0A2540" }}
                    >
                      {performer.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="mt-8">
            <div
              className="rounded-xl p-6"
              style={{
                backgroundColor: "#F6F9FC",
                border: "1px solid #635BFF",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-shrink-0">
                  <h2
                    className="text-xl font-bold mb-3"
                    style={{ color: "#0A2540" }}
                  >
                    Social Media
                  </h2>
                  <div
                    className="text-sm space-y-1"
                    style={{ color: "#425466" }}
                  >
                    <div>Social Media</div>
                    <div>
                      statistics for{" "}
                      <span
                        className="font-semibold"
                        style={{ color: "#0A2540" }}
                      >
                        1 week
                      </span>
                    </div>
                    <div>period.</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Instagram */}
                  <div className="bg-white rounded-xl p-4 text-center shadow-sm min-w-[100px]">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                      style={{
                        background:
                          "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
                      }}
                    >
                      <FaInstagram className="w-6 h-6 text-white" />
                    </div>
                    <div
                      className="font-semibold text-sm mb-1"
                      style={{ color: "#0A2540" }}
                    >
                      Instagram
                    </div>
                    <div className="text-lg font-bold text-green-500">+4%</div>
                  </div>

                  {/* Facebook */}
                  <div className="bg-white rounded-xl p-4 text-center shadow-sm min-w-[100px]">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                      style={{ backgroundColor: "#1877F2" }}
                    >
                      <FaFacebook className="w-6 h-6 text-white" />
                    </div>
                    <div
                      className="font-semibold text-sm mb-1"
                      style={{ color: "#0A2540" }}
                    >
                      Facebook
                    </div>
                    <div className="text-lg font-bold text-green-500">+2%</div>
                  </div>

                  {/* Meta Business */}
                  <div className="bg-white rounded-xl p-4 text-center shadow-sm min-w-[100px]">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                      style={{ backgroundColor: "#0A2540" }}
                    >
                      <FaMeta className="w-6 h-6 text-white" />
                    </div>
                    <div
                      className="font-semibold text-sm mb-1"
                      style={{ color: "#0A2540" }}
                    >
                      MetaBusiness
                    </div>
                    <div className="text-lg font-bold text-green-500">+2%</div>
                  </div>

                  {/* Check Your Dash */}
                  <div
                    className="rounded-xl p-4 text-center text-white min-w-[100px]"
                    style={{ backgroundColor: "#635BFF" }}
                  >
                    <BarChart3 className="w-8 h-8 mx-auto mb-2" />
                    <div className="font-bold text-sm leading-tight">
                      Check Your
                      <br />
                      Dash
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Cards - Updated Color Scheme */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6"
            style={{ backgroundColor: "transparent" }}
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className="rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                style={{
                  backgroundColor: "white",
                  border:
                    index % 3 === 0
                      ? "1px solid #635BFF"
                      : index % 3 === 1
                      ? "1px solid #0A2540"
                      : "1px solid #425466",
                }}
              >
                <div className="flex items-start space-x-3 mb-5">
                  <div
                    className="p-2.5 rounded-lg text-white"
                    style={{
                      backgroundColor:
                        index % 3 === 0
                          ? "#635BFF"
                          : index % 3 === 1
                          ? "#0A2540"
                          : "#425466",
                    }}
                  >
                    {project.icon}
                  </div>
                  <div className="flex-1">
                    <h4
                      className="font-semibold mb-1 text-sm"
                      style={{ color: "#0A2540" }}
                    >
                      {project.name}
                    </h4>
                    <p className="text-xs" style={{ color: "#425466" }}>
                      {project.duration} • {project.status}
                    </p>
                  </div>
                </div>

                <div className="mb-5">
                  <div
                    className="flex items-center justify-between text-xs mb-2"
                    style={{ color: "#425466" }}
                  >
                    <span>Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div
                    className="w-full rounded-full h-1.5"
                    style={{ backgroundColor: "#F6F9FC" }}
                  >
                    <div
                      className="h-1.5 rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${project.progress}%`,
                        backgroundColor: "#635BFF",
                      }}
                    ></div>
                  </div>
                </div>

                <div className="text-xs" style={{ color: "#425466" }}>
                  <div>{project.details}</div>
                  <div style={{ color: "#0A2540" }} className="font-medium">
                    {project.deadline}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <RightSidebar
        rightSidebarOpen={rightSidebarOpen}
        setRightSidebarOpen={setRightSidebarOpen}
      />

      {/* Main Login Popup - Using Login */}
      {isLoginOpen && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onClose={() => setIsLoginOpen(false)}
        />
      )}
    </div>
  );
}
