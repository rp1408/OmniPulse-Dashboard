import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Users, 
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './Header';
import Sidebar from './Sidebar';
import Login from './Login';
import { FacebookLogin } from './SocialMediaForms';
import { UseAuth } from '../AuthContext';

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

const ProgressBar = ({ percentage, color = "bg-blue-500" }) => {
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
          <linearGradient id="fbGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1877f2" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#1877f2" stopOpacity="0"/>
          </linearGradient>
        </defs>
        
        {[0, 5, 10, 15, 20].map(i => (
          <line key={i} x1="0" y1={20 + (i * 20)} x2="300" y2={20 + (i * 20)} stroke="#f1f5f9" strokeWidth="1"/>
        ))}
        
        <path
          d={`${points} L260,120 L50,120 Z`}
          fill="url(#fbGradient)"
          className={`transition-opacity duration-1000 ${animate ? 'opacity-100' : 'opacity-0'}`}
        />
        
        <path
          d={points}
          fill="none"
          stroke="#1877f2"
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
            fill="#1877f2"
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

export default function FacebookDashboard({ onBackToHome }) {
  const [loaded, setLoaded] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showFacebookLogin, setShowFacebookLogin] = useState(false);
  
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

  // Facebook social media login status
  const facebookStatus = getSocialMediaStatus('facebook');

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleLoginSuccess = (email) => {
    console.log('=== Facebook Dashboard: Main login success ===');
    console.log('Email received:', email);
    login(email);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    console.log('=== Facebook Dashboard: Complete logout ===');
    logout();
    if (onBackToHome) {
      onBackToHome();
    }
  };

  // FIXED: Connect button handler - proper validation flow without auto-redirect
  const handleConnectClick = () => {
    console.log('=== Facebook Connect Button Clicked ===');
    console.log('Main login status:', isLoggedIn, 'User:', userName);
    console.log('Facebook status:', facebookStatus.isLoggedIn, 'FB User:', facebookStatus.userName);

    // Step 1: Check main login first
    if (!isLoggedIn) {
      console.log('❌ Main login required');
      alert('You must first log in to the main account!');
      setIsLoginOpen(true);
      return;
    }

    // Step 2: Check Facebook connection
    if (!facebookStatus.isLoggedIn) {
      console.log('❌ Facebook connection required');
      alert('You need to connect your Facebook account!');
      setShowFacebookLogin(true);
      return;
    }

    // Step 3: Both connected - user stays on dashboard, can optionally go to schedule
    console.log('✅ Both accounts connected - offering schedule option');
    const goToSchedule = confirm(`Facebook connected successfully!\n\nMain Account: ${userName}\nFacebook: ${facebookStatus.userName}\n\nWould you like to go to Schedule page?`);
    if (goToSchedule) {
      navigate('/Schedule');
    } else {
      alert('You can access Schedule anytime from the menu!');
    }
  };

  // FIXED: Facebook login success handler - proper name sync without auto-redirect
  const handleFacebookLoginSuccess = (platform, userData) => {
    console.log('=== Facebook Dashboard: Facebook login success ===');
    console.log('Platform:', platform);
    console.log('Raw user data received:', userData);

    // FIXED: Create properly unified user data with consistent naming
    const unifiedUserName = userData.email || userData.userName || userData.username || 'FacebookUser';
    
    const processedUserData = {
      email: unifiedUserName, // Facebook uses email as primary identifier
      userName: unifiedUserName, // Consistent naming across app
      displayName: unifiedUserName, // For UI display
      isLoggedIn: true
    };

    console.log('Processed Facebook user data:', processedUserData);
    
    // Save to AuthContext with proper error handling
    const success = socialMediaLogin('facebook', processedUserData);
    
    if (success) {
      setShowFacebookLogin(false);
      console.log('✅ Facebook connected successfully - staying on Facebook dashboard');
      
      // FIXED: No automatic redirect - user stays on current page with success message
      alert(`Facebook connected successfully!\n\nMain Account: ${userName}\nFacebook: ${processedUserData.userName}\n\nYou can now schedule content.`);
      
    } else {
      console.error('❌ Facebook login failed in AuthContext');
      alert('Facebook connection failed. Please try again.');
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

        {/* Facebook Dashboard Content */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {/* FIXED: User Welcome Message with proper name display */}
          {isLoggedIn && (
            <div className="mb-6">
              <div className="text-xl font-semibold text-gray-800">
                Welcome to Facebook Analytics, {userName}!
                {facebookStatus.isLoggedIn && (
                  <span className="block text-base font-normal text-gray-600 mt-1">
                    Facebook Connected: {facebookStatus.userName}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Facebook Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Facebook Card */}
              <div className={`bg-white rounded-xl shadow-sm p-6 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Facebook</h2>
                    <div className="flex items-center space-x-2">
                      <span className="text-4xl font-bold text-gray-900">
                        <AnimatedCounter end={95.2} suffix="K" />
                      </span>
                      <span className="text-gray-600">Followers</span>
                    </div>
                    <div className="mt-2">
                      <ProgressBar percentage={75} color="bg-blue-500" />
                      <div className="flex justify-between mt-1 text-sm text-gray-600">
                        <span>75%</span>
                        <span>120K</span>
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
                      <AnimatedCounter end={52} suffix="K" />
                    </div>
                    <div className="text-sm text-gray-600">Reach</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      <AnimatedCounter end={2100} />
                    </div>
                    <div className="text-sm text-gray-600">Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      <AnimatedCounter end={680} />
                    </div>
                    <div className="text-sm text-gray-600">Shares</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      <AnimatedCounter end={294} />
                    </div>
                    <div className="text-sm text-gray-600">Comments</div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-700">
                      <AnimatedCounter end={6} suffix="%" />
                    </span>
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="text-sm text-green-600 mt-1">Engagement rate</div>
                </div>
              </div>
            </div>

            {/* FIXED: Connect Facebook Section with proper status display */}
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {/* Left side - Text content */}
              <div className="bg-gray-100 rounded-2xl p-8 flex items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Connect with your audience through Facebook
                  </h3>
                  <p className="text-gray-600">
                    Connect your Facebook account to schedule posts and manage your content effectively.
                  </p>
                </div>
              </div>

              {/* FIXED: Right side - Facebook connect box with accurate status */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center text-center">
                {/* Facebook icon */}
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 border-2 border-blue-200">
                  <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>

                <h4 className="text-lg font-semibold text-gray-900 mb-4">Facebook</h4>

                {/* FIXED: Connect button with proper styling based on connection status */}
                <button 
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
                    isLoggedIn && facebookStatus.isLoggedIn 
                      ? 'bg-green-50 border border-green-300 text-green-700 hover:bg-green-100'
                      : 'bg-blue-600 text-white hover:bg-blue-700 border border-blue-600'
                  }`}
                  onClick={handleConnectClick}
                >
                  {isLoggedIn && facebookStatus.isLoggedIn ? 'Go to Schedule' : 'Connect Facebook'}
                </button>

                {/* FIXED: Status Display - Shows accurate real-time connection state */}
                <div className="mt-3 space-y-1 text-sm">
                  {/* Warning states - only show when actually not connected */}
                  {!isLoggedIn && (
                    <div className="text-red-600 bg-red-50 px-3 py-1 rounded-full">
                      ⚠ Main account login required
                    </div>
                  )}
                  
                  {isLoggedIn && !facebookStatus.isLoggedIn && (
                    <div className="text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                      ⚠ Facebook connection required
                    </div>
                  )}
                  
                  {/* Success state - only show when both are actually connected */}
                  {isLoggedIn && facebookStatus.isLoggedIn && (
                    <div className="space-y-1 bg-green-50 p-3 rounded-lg">
                      <div className="text-green-600 font-medium">
                        ✓ Main Account: {userName}
                      </div>
                      <div className="text-green-600 font-medium">
                        ✓ Facebook: {facebookStatus.userName}
                      </div>
                      <div className="text-blue-600 font-semibold mt-2 bg-blue-50 px-2 py-1 rounded">
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
                <div className="flex items-center space-x-4 p-4 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      <AnimatedCounter end={18} suffix="k" /> Followers
                    </div>
                    <div className="text-sm text-green-500 font-medium">+8% This Week</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-lg border border-gray-100 hover:border-cyan-200 transition-colors">
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      <AnimatedCounter end={5} suffix="k" /> Page Views
                    </div>
                    <div className="text-sm text-green-500 font-medium">+15% This Week</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-lg border border-gray-100 hover:border-orange-200 transition-colors">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      <AnimatedCounter end={12} suffix="%" /> Engagement
                    </div>
                    <div className="text-sm text-green-500 font-medium">+3.2% This Week</div>
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
                    <AnimatedCounter end={62188} />
                  </div>
                  <div className="text-sm text-green-500 mt-1">↑ 12%</div>
                  <div className="text-xs text-gray-400">vs previous year</div>
                </div>

                <div className="text-center p-4 border border-gray-100 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Reach</div>
                  <div className="text-2xl font-bold text-gray-900">
                    <AnimatedCounter end={386} suffix="K" />
                  </div>
                  <div className="text-sm text-green-500 mt-1">↑ 18%</div>
                  <div className="text-xs text-gray-400">vs previous year</div>
                </div>

                <div className="text-center p-4 border border-gray-100 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Shares</div>
                  <div className="text-2xl font-bold text-gray-900">
                    <AnimatedCounter end={1800} />
                  </div>
                  <div className="text-sm text-green-500 mt-1">↑ 15%</div>
                  <div className="text-xs text-gray-400">vs previous year</div>
                </div>

                <div className="text-center p-4 border border-gray-100 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Comments</div>
                  <div className="text-2xl font-bold text-gray-900">
                    <AnimatedCounter end={5455} />
                  </div>
                  <div className="text-sm text-green-500 mt-1">↑ 520</div>
                  <div className="text-xs text-gray-400">vs previous year</div>
                </div>

                <div className="text-center p-4 border border-gray-100 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Ad Clicks</div>
                  <div className="text-2xl font-bold text-gray-900">
                    <AnimatedCounter end={6992} />
                  </div>
                  <div className="text-sm text-green-500 mt-1">↑ 856</div>
                  <div className="text-xs text-gray-400">vs previous year</div>
                </div>

                <div className="text-center p-4 border border-gray-100 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Page Views</div>
                  <div className="text-2xl font-bold text-gray-900">
                    <AnimatedCounter end={325} suffix="K" />
                  </div>
                  <div className="text-sm text-green-500 mt-1">↑ 6%</div>
                  <div className="text-xs text-gray-400">vs previous year</div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={`bg-white rounded-xl shadow-sm p-6 transition-all duration-1000 delay-600 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Website traffic from Facebook (this month)</h3>
                <div className="mb-4">
                  <div className="text-4xl font-bold text-gray-900">
                    <AnimatedCounter end={182.4} suffix="K" />
                  </div>
                  <div className="text-gray-600">sessions</div>
                  <div className="flex items-center mt-2 text-green-600">
                    <span className="text-sm font-medium">
                      ▲ <AnimatedCounter end={28} suffix="%" /> vs last month
                    </span>
                  </div>
                </div>
                <LineChart />
              </div>

              <div className={`bg-white rounded-xl shadow-sm p-6 transition-all duration-1000 delay-800 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ad performance by campaign (this month)</h3>
                <div className="space-y-4">
                  {[
                    { campaign: 'Brand Awareness', amount: 5.2, color: 'bg-blue-500', percentage: 100 },
                    { campaign: 'Lead Generation', amount: 3.8, color: 'bg-green-500', percentage: 75 },
                    { campaign: 'Conversion Campaign', amount: 2.9, color: 'bg-purple-500', percentage: 55 },
                    { campaign: 'Engagement Boost', amount: 1.5, color: 'bg-orange-500', percentage: 30 },
                    { campaign: 'Video Views', amount: 0.8, color: 'bg-red-400', percentage: 15 }
                  ].map((item) => (
                    <div key={item.campaign} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <span className="text-gray-700 font-medium w-20 text-xs">{item.campaign}</span>
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

      {/* Facebook Social Media Login Popup */}
      {showFacebookLogin && (
        <FacebookLogin
          onClose={() => setShowFacebookLogin(false)}
          onBack={() => setShowFacebookLogin(false)}
          onSuccess={handleFacebookLoginSuccess}
          onShowMainLogin={() => {
            setShowFacebookLogin(false);
            setIsLoginOpen(true);
          }}
        />
      )}
    </div>
  );
}