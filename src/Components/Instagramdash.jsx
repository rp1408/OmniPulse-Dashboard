import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Users, 
  TrendingUp
} from 'lucide-react';
import DashboardHeader from './Header';
import Sidebar from './Sidebar';
import Login from './Login';
import { InstagramLogin } from './SocialMediaForms';
import { UseAuth } from '../AuthContext';
import { LogOut } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime = null;
    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);
  
  return <span>{count.toLocaleString()}{suffix}</span>;
};

const ProgressBar = ({ percentage, color = "bg-pink-500" }) => {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setWidth(percentage), 500);
    return () => clearTimeout(timer);
  }, [percentage]);
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className={`h-2 ${color} rounded-full transition-all duration-2000 ease-out`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

const LineChart = () => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  const points = "M50,120 L80,100 L110,80 L140,90 L170,70 L200,60 L230,40 L260,30";
  
  return (
    <div className="h-32 w-full">
      <svg className="w-full h-full" viewBox="0 0 300 140">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0"/>
          </linearGradient>
        </defs>
        
        {[0, 5, 10, 15, 20].map(i => (
          <line key={i} x1="0" y1={20 + (i * 20)} x2="300" y2={20 + (i * 20)} stroke="#f1f5f9" strokeWidth="1"/>
        ))}
        
        <path
          d={`${points} L260,120 L50,120 Z`}
          fill="url(#gradient)"
          className={`transition-opacity duration-1000 ${animate ? 'opacity-100' : 'opacity-0'}`}
        />
        
        <path
          d={points}
          fill="none"
          stroke="#ec4899"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="200"
          strokeDashoffset={animate ? "0" : "200"}
          className="transition-all duration-2000 ease-out"
        />
        
        {[[80,100], [110,80], [140,90], [170,70], [200,60], [230,40], [260,30]].map((point, i) => (
          <circle
            key={i}
            cx={point[0]}
            cy={point[1]}
            r="4"
            fill="#ec4899"
            className={`transition-all duration-500 delay-${i * 200} ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
          />
        ))}
        
        <text x="10" y="25" fill="#64748b" fontSize="10">20K</text>
        <text x="10" y="65" fill="#64748b" fontSize="10">15K</text>
        <text x="10" y="85" fill="#64748b" fontSize="10">10K</text>
        <text x="10" y="105" fill="#64748b" fontSize="10">5K</text>
        <text x="20" y="125" fill="#64748b" fontSize="10">0</text>
        
        <text x="75" y="135" fill="#64748b" fontSize="10">6 Feb</text>
        <text x="135" y="135" fill="#64748b" fontSize="10">13 Feb</text>
        <text x="195" y="135" fill="#64748b" fontSize="10">20 Feb</text>
        <text x="255" y="135" fill="#64748b" fontSize="10">27 Feb</text>
      </svg>
    </div>
  );
};

export default function InstagramDashboard({ onBackToHome }) {
  const [loaded, setLoaded] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showInstagramLogin, setShowInstagramLogin] = useState(false);
  const navigate = useNavigate();

  // AuthContext hooks
  const { 
    isLoggedIn, 
    userName, 
    login, 
    logout, 
    isLoading, 
    getSocialMediaStatus, 
    socialMediaLogin 
  } = UseAuth();

  // Instagram social media login status
  const instagramStatus = getSocialMediaStatus('instagram');

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleLoginSuccess = (email) => {
    console.log('Main login success with email:', email);
    login(email);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    console.log('Logging out');
    logout();
    if (onBackToHome) {
      onBackToHome();
    }
  };

  // FIXED: Complete Connect function - NO AUTOMATIC REDIRECT
  const handleConnectClick = () => {
    console.log('=== Connect Button Clicked ===');
    console.log('Main login status:', isLoggedIn, 'User:', userName);
    console.log('Instagram status:', instagramStatus.isLoggedIn, 'IG User:', instagramStatus.userName);

    // Step 1: Check main login
    if (!isLoggedIn) {
      console.log('❌ Main login required - showing main login modal');
      alert('You must first log in to the main account.!');
      setIsLoginOpen(true);
      return;
    }

    // Step 2: Check Instagram login
    if (!instagramStatus.isLoggedIn) {
      console.log('❌ Instagram login required - showing Instagram form');
      alert('You need to connect your Instagram account!');
      setShowInstagramLogin(true);
      return;
    }

    // Step 3: Both connected - give user option to go to schedule
    console.log('✅ Both accounts connected');
    const goToSchedule = confirm('Instagram connected! Do you want to go to Schedule page now?');
    if (goToSchedule) {
      navigate('/Schedule');
    }
  };

  // FIXED: Instagram login success handler - NO AUTOMATIC REDIRECT
  const handleInstagramLoginSuccess = (platform, userData) => {
    console.log('=== Instagram Login Success ===');
    console.log('Platform:', platform);
    console.log('User Data received:', userData);

    // Create unified user data
    const unifiedUserName = userData.username || userData.email || 'User';
    
    const processedUserData = {
      ...userData,
      userName: unifiedUserName,
      displayName: unifiedUserName.startsWith('@') ? unifiedUserName : `@${unifiedUserName}`
    };

    console.log('Processed user data:', processedUserData);
    
    // Save to AuthContext
    const success = socialMediaLogin('instagram', processedUserData);
    
    if (success) {
      setShowInstagramLogin(false);
      console.log('✅ Instagram connected successfully - staying on current page');
      
      // REMOVED: Automatic redirect
      // User will see updated status and can manually decide to go to schedule
      alert('Instagram connected successfully!');
      
    } else {
      console.error('❌ Instagram login failed in AuthContext');
      alert('Instagram login failed. Please try again.');
    }
  };

  // Show loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ backgroundColor: '#FEFEFE' }}>
        <div className="text-xl text-gray-800">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#FEFEFE' }}>
      {/* Left Sidebar */}
      <Sidebar 
        isLoggedIn={isLoggedIn}
        userName={userName}
        setIsLoginOpen={setIsLoginOpen}
        handleLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader onShowMainLogin={() => setIsLoginOpen(true)} />

        {/* Instagram Dashboard Content */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {/* User Welcome Message - FIXED with unified naming */}
          {isLoggedIn && (
            <div className="mb-6">
              <div className="text-xl font-semibold text-gray-800 mt-4">
                Welcome to Instagram Analytics, {userName}!
                {instagramStatus.isLoggedIn && (
                  <span className="block text-base font-normal text-gray-600 mt-1">
                    Instagram Connected: {instagramStatus.userName}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Instagram Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Instagram Card */}
              <div className={`bg-white rounded-xl shadow-sm p-6 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Instagram</h2>
                    <div className="flex items-center space-x-2">
                      <span className="text-4xl font-bold text-gray-900">
                        <AnimatedCounter end={120.5} suffix="K" />
                      </span>
                      <span className="text-gray-600">Followers</span>
                    </div>
                    <div className="mt-2">
                      <ProgressBar percentage={80} color="bg-pink-500" />
                      <div className="flex justify-between mt-1 text-sm text-gray-600">
                        <span>80%</span>
                        <span>150K</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Latest Post Performance */}
              <div className={`bg-white rounded-xl shadow-sm p-6 transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest post performance</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      <AnimatedCounter end={39} suffix="K" />
                    </div>
                    <div className="text-sm text-gray-600">Impressions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      <AnimatedCounter end={1600} />
                    </div>
                    <div className="text-sm text-gray-600">Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      <AnimatedCounter end={500} />
                    </div>
                    <div className="text-sm text-gray-600">Reposts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      <AnimatedCounter end={217} />
                    </div>
                    <div className="text-sm text-gray-600">Comments</div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-700">
                      <AnimatedCounter end={4} suffix="%" />
                    </span>
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="text-sm text-green-600 mt-1">Engagement rate</div>
                </div>
              </div>
            </div>

            {/* FIXED: Connect Instagram Section with proper validation flow */}
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {/* Left side - Text content */}
              <div className="bg-gray-100 rounded-2xl p-8 flex items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Save more and get visibility for your business
                  </h3>
                  <p className="text-gray-600">
                    Connect your Instagram account to schedule posts and manage your content effectively.
                  </p>
                </div>
              </div>

              {/* Right side - Instagram connect box with status */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center text-center">
                {/* Instagram icon */}
                <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mb-4 border-2 border-pink-200">
                  <svg className="w-8 h-8 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z"/>
                  </svg>
                </div>

                <h4 className="text-lg font-semibold text-gray-900 mb-4">Instagram</h4>

                {/* Dynamic Connect Button based on status */}
                <button 
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
                    isLoggedIn && instagramStatus.isLoggedIn 
                      ? 'bg-green-50 border border-green-300 text-green-700 hover:bg-green-100'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={handleConnectClick}
                >
                  {isLoggedIn && instagramStatus.isLoggedIn ? 'Go to Schedule' : 'Connect'}
                </button>

                {/* Status Display - Shows current connection state */}
                <div className="mt-3 space-y-1 text-sm">
                  {/* Show warnings when not connected */}
                  {!isLoggedIn && (
                    <div className="text-red-600">
                      ⚠ Main account login required
                    </div>
                  )}
                  
                  {isLoggedIn && !instagramStatus.isLoggedIn && (
                    <div className="text-orange-600">
                      ⚠ Instagram account connection required
                    </div>
                  )}
                  
                  {/* Show success status when both are connected */}
                  {isLoggedIn && instagramStatus.isLoggedIn && (
                    <div className="space-y-1">
                      <div className="text-green-600">
                        ✓ Main Account: {userName}
                      </div>
                      <div className="text-green-600">
                        ✓ Instagram: {instagramStatus.userName}
                      </div>
                      <div className="text-blue-600 font-medium mt-2">
                        Ready to schedule content!
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Analytics Overview Section */}
            <div className={`bg-white rounded-xl shadow-sm p-6 transition-all duration-1000 delay-400 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Analytics Overview</h3>
                <div className="text-gray-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-4 p-4 rounded-lg border border-gray-100 hover:border-purple-200 transition-colors">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      <AnimatedCounter end={12} suffix="k" /> Followers
                    </div>
                    <div className="text-sm text-green-500 font-medium">+5% This Week</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-lg border border-gray-100 hover:border-cyan-200 transition-colors">
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      <AnimatedCounter end={3} suffix="k" /> User Reach
                    </div>
                    <div className="text-sm text-green-500 font-medium">+12% This Week</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-lg border border-gray-100 hover:border-orange-200 transition-colors">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      <AnimatedCounter end={15} suffix="%" /> Account Views
                    </div>
                    <div className="text-sm text-green-500 font-medium">+2.5% This Week</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Section */}
            <div className={`bg-white rounded-xl shadow-sm p-6 transition-all duration-1000 delay-600 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Quick Stats</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                <div className="text-center p-4 border border-gray-100 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Likes</div>
                  <div className="text-2xl font-bold text-gray-900">
                    <AnimatedCounter end={82188} />
                  </div>
                  <div className="text-sm text-green-500 mt-1">↑ 16%</div>
                  <div className="text-xs text-gray-400">vs previous year</div>
                </div>

                <div className="text-center p-4 border border-gray-100 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Reach</div>
                  <div className="text-2xl font-bold text-gray-900">
                    <AnimatedCounter end={466} suffix="K" />
                  </div>
                  <div className="text-sm text-green-500 mt-1">↑ 14%</div>
                  <div className="text-xs text-gray-400">vs previous year</div>
                </div>

                <div className="text-center p-4 border border-gray-100 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Reposts</div>
                  <div className="text-2xl font-bold text-gray-900">
                    <AnimatedCounter end={2500} />
                  </div>
                  <div className="text-sm text-green-500 mt-1">↑ 10%</div>
                  <div className="text-xs text-gray-400">vs previous year</div>
                </div>

                <div className="text-center p-4 border border-gray-100 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Comments</div>
                  <div className="text-2xl font-bold text-gray-900">
                    <AnimatedCounter end={6755} />
                  </div>
                  <div className="text-sm text-green-500 mt-1">↑ 648</div>
                  <div className="text-xs text-gray-400">vs previous year</div>
                </div>

                <div className="text-center p-4 border border-gray-100 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Media Saves</div>
                  <div className="text-2xl font-bold text-gray-900">
                    <AnimatedCounter end={7992} />
                  </div>
                  <div className="text-sm text-green-500 mt-1">↑ 1,156</div>
                  <div className="text-xs text-gray-400">vs previous year</div>
                </div>

                <div className="text-center p-4 border border-gray-100 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Impressions</div>
                  <div className="text-2xl font-bold text-gray-900">
                    <AnimatedCounter end={455} suffix="K" />
                  </div>
                  <div className="text-sm text-green-500 mt-1">↑ 4%</div>
                  <div className="text-xs text-gray-400">vs previous year</div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={`bg-white rounded-xl shadow-sm p-6 transition-all duration-1000 delay-600 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Website traffic from Instagram (this month)</h3>
                <div className="mb-4">
                  <div className="text-4xl font-bold text-gray-900">
                    <AnimatedCounter end={212.7} suffix="K" />
                  </div>
                  <div className="text-gray-600">sessions</div>
                  <div className="flex items-center mt-2 text-green-600">
                    <span className="text-sm font-medium">
                      ▲ <AnimatedCounter end={33} suffix="%" /> vs last month
                    </span>
                  </div>
                </div>
                <LineChart />
              </div>

              <div className={`bg-white rounded-xl shadow-sm p-6 transition-all duration-1000 delay-800 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by promo code (this month)</h3>
                <div className="space-y-4">
                  {[
                    { code: 'AXA10', amount: 7.5, color: 'bg-green-500', percentage: 100 },
                    { code: 'RODRI10', amount: 4.6, color: 'bg-pink-500', percentage: 65 },
                    { code: 'MONQUE10', amount: 3.4, color: 'bg-pink-400', percentage: 45 },
                    { code: 'MOVANTE10', amount: 1, color: 'bg-purple-500', percentage: 15 },
                    { code: 'TEE10', amount: 0.6, color: 'bg-red-400', percentage: 8 }
                  ].map((item) => (
                    <div key={item.code} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <span className="text-gray-700 font-medium w-20">{item.code}</span>
                        <div className="flex-1 mx-4">
                          <ProgressBar percentage={item.percentage} color={item.color} />
                        </div>
                      </div>
                      <span className="text-gray-900 font-semibold ml-4">
                        $<AnimatedCounter end={item.amount} suffix="K" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
         
        </div>
      </div>

      {/* Main Login Popup */}
      {isLoginOpen && (
        <Login 
          onLoginSuccess={handleLoginSuccess}
          onClose={() => setIsLoginOpen(false)}
        />
      )}

      {/* Instagram Social Media Login Popup */}
      {showInstagramLogin && (
        <InstagramLogin
          onClose={() => setShowInstagramLogin(false)}
          onBack={() => setShowInstagramLogin(false)}
          onSuccess={handleInstagramLoginSuccess}
          onShowMainLogin={() => {
            setShowInstagramLogin(false);
            setIsLoginOpen(true);
          }}
        />
      )}
    </div>
  );
}