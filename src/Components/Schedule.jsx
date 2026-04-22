import React, { useState } from 'react';
import { Settings, Clock, Play, Square, ChevronDown, Calendar, User, LogOut, AlertCircle, ArrowLeft } from 'lucide-react';
import { UseAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import { InstagramLogin, FacebookLogin } from './SocialMediaForms'; // Import both forms

// Facebook Icon Component
const FacebookIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

// Instagram Icon Component
const InstagramIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#E4405F">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z"/>
  </svg>
);

const SocialMediaScheduler = () => {
  const navigate = useNavigate();
  
  // Use AuthContext
  const { 
    isLoggedIn, 
    userName, 
    login, 
    logout,
    getSocialMediaStatus,
    socialMediaLogin,
    isLoading
  } = UseAuth();

  // Login modals state
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showInstagramLogin, setShowInstagramLogin] = useState(false);
  const [showFacebookLogin, setShowFacebookLogin] = useState(false); // Add Facebook login modal state

  // FIXED: Get social media status with consistent naming
  const instagramStatus = getSocialMediaStatus('instagram');
  const facebookStatus = getSocialMediaStatus('facebook');

  // Facebook settings - ALL TIMERS START AS INACTIVE
  const [fbPostsPerDay, setFbPostsPerDay] = useState('1 post');
  const [fbPostsDuration, setFbPostsDuration] = useState('1 month');
  const [fbReelsPerDay, setFbReelsPerDay] = useState('1 reel');
  const [fbReelsDuration, setFbReelsDuration] = useState('1 week');
  const [fbPostsTimerActive, setFbPostsTimerActive] = useState(false);
  const [fbReelsTimerActive, setFbReelsTimerActive] = useState(false);
  
  // Instagram settings - ALL TIMERS START AS INACTIVE
  const [igPostsPerDay, setIgPostsPerDay] = useState('1 post');
  const [igPostsDuration, setIgPostsDuration] = useState('1 month');
  const [igReelsPerDay, setIgReelsPerDay] = useState('1 reel');
  const [igReelsDuration, setIgReelsDuration] = useState('1 month');
  const [igPostsTimerActive, setIgPostsTimerActive] = useState(false);
  const [igReelsTimerActive, setIgReelsTimerActive] = useState(false);

  const postsOptions = ['1 post', '2 posts', '3 posts', '4 posts', '5 posts'];
  const reelsOptions = ['1 reel', '2 reels', '3 reels', '4 reels', '5 reels'];
  const durationOptions = ['1 week', '2 weeks', '1 month', '2 months', '3 months'];

  // FIXED: Main login handler with consistent naming
  const handleLoginSuccess = (userEmail) => {
    console.log('=== Schedule Page Main Login Success ===');
    console.log('User email:', userEmail);
    login(userEmail);
    setIsLoginOpen(false);
  };

  // FIXED: Instagram login success handler with unified naming
  const handleInstagramLoginSuccess = (platform, userData) => {
    console.log('=== Schedule Page Instagram Login Success ===');
    console.log('Platform:', platform);
    console.log('User data received:', userData);

    // Create unified user data - ensure consistent naming
    const unifiedUserName = userData.username || userData.email || 'User';
    
    const processedUserData = {
      ...userData,
      userName: unifiedUserName, // Consistent property name
      displayName: unifiedUserName.startsWith('@') ? unifiedUserName : `@${unifiedUserName}`
    };

    console.log('Processed user data:', processedUserData);
    
    const success = socialMediaLogin('instagram', processedUserData);
    
    if (success) {
      setShowInstagramLogin(false);
      console.log('✅ Instagram connected successfully in Schedule page');
    } else {
      console.error('❌ Instagram login failed in AuthContext');
      alert('Instagram login failed. Please try again.');
    }
  };

  // FIXED: Facebook login success handler with unified naming
  const handleFacebookLoginSuccess = (platform, userData) => {
    console.log('=== Schedule Page Facebook Login Success ===');
    console.log('Platform:', platform);
    console.log('User data received:', userData);

    // Create unified user data - ensure consistent naming
    const unifiedUserName = userData.email || userData.userName || 'FacebookUser';
    
    const processedUserData = {
      ...userData,
      userName: unifiedUserName, // Consistent property name used everywhere
      displayName: unifiedUserName,
      email: unifiedUserName // Ensure email is also set
    };

    console.log('Processed user data:', processedUserData);
    
    const success = socialMediaLogin('facebook', processedUserData);
    
    if (success) {
      setShowFacebookLogin(false);
      console.log('✅ Facebook connected successfully in Schedule page');
    } else {
      console.error('❌ Facebook login failed in AuthContext');
      alert('Facebook login failed. Please try again.');
    }
  };

  // Logout handler
  const handleLogout = () => {
    logout();
    // Reset all timers when logging out
    setFbPostsTimerActive(false);
    setFbReelsTimerActive(false);
    setIgPostsTimerActive(false);
    setIgReelsTimerActive(false);
    navigate('/Home');
  };

  // FIXED: Timer handlers with proper authentication checks
  const handleTimerAction = (timerSetter, currentState, timerName, platform) => {
    console.log(`=== Timer Action: ${timerName} on ${platform} ===`);
    console.log('Current state:', currentState);
    console.log('Main login:', isLoggedIn, 'User:', userName);
    
    // Check main login first
    if (!isLoggedIn) {
      alert('Please log in with your main account first!');
      setIsLoginOpen(true);
      return;
    }

    // Check platform-specific login with consistent naming
    if (platform === 'instagram') {
      console.log('Instagram status:', instagramStatus);
      if (!instagramStatus.isLoggedIn) {
        alert('Please connect your Instagram account first!');
        setShowInstagramLogin(true);
        return;
      }
    }

    if (platform === 'facebook') {
      console.log('Facebook status:', facebookStatus);
      if (!facebookStatus.isLoggedIn) {
        alert('Please connect your Facebook account first!');
        setShowFacebookLogin(true);
        return;
      }
    }

    // If all checks pass, toggle timer
    const newState = !currentState;
    timerSetter(newState);
    
    console.log(`✅ Timer ${newState ? 'started' : 'stopped'} for ${timerName}`);
    alert(`${timerName} Timer ${newState ? 'Started' : 'Stopped'}!`);
  };

  const CustomDropdown = ({ value, options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        >
          <span className="text-gray-700">{value}</span>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none first:rounded-t-md last:rounded-b-md text-sm"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const connectInstagram = () => {
    if (!isLoggedIn) {
      alert('Please log in with your main account first!');
      setIsLoginOpen(true);
      return;
    }
    setShowInstagramLogin(true);
  };

  const connectFacebook = () => {
    if (!isLoggedIn) {
      alert('Please log in with your main account first!');
      setIsLoginOpen(true);
      return;
    }
    setShowFacebookLogin(true);
  };

  const getNextReminder = (active, type) => {
    if (!active) return null;
    const now = new Date();
    now.setDate(now.getDate() + 1);
    return `Next reminder: ${now.toLocaleDateString('en-GB')}, 17:14:${type === 'posts' ? '12' : '13'}`;
  };

  // Show loading if auth is still loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-xl text-gray-800">Loading...</div>
      </div>
    );
  }

  // Main Scheduler Interface
  return (
    <div className="max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* FIXED: Header with unified user info display */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/Instagramdash')}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              title="Back to Instagram Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back</span>
            </button>
            <Calendar className="w-6 h-6 text-gray-600" />
            <h1 className="text-xl font-medium text-gray-900">Content Posting Timers</h1>
          </div>
          
          {/* FIXED: User Profile Box with unified naming */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <div className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Main:</span>
                    <span className="text-sm font-semibold text-blue-600">{userName}</span>
                    {instagramStatus.isLoggedIn && (
                      <>
                        <span className="text-gray-400">|</span>
                        <span className="text-sm font-medium text-gray-700">IG:</span>
                        <span className="text-sm font-semibold text-pink-600">{instagramStatus.userName}</span>
                      </>
                    )}
                    {facebookStatus.isLoggedIn && (
                      <>
                        <span className="text-gray-400">|</span>
                        <span className="text-sm font-medium text-gray-700">FB:</span>
                        <span className="text-sm font-semibold text-blue-600">{facebookStatus.userName}</span>
                      </>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="text-sm">Login</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Authentication Warning */}
      {!isLoggedIn && (
        <div className="mx-6 mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
            <p className="text-yellow-800">Please log in to start and manage your content timers.</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* FIXED: Facebook Section with unified naming and connect functionality */}
          {facebookStatus.isLoggedIn ? (
            <div className="bg-white rounded-lg border border-gray-200">
              {/* Facebook Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FacebookIcon className="w-6 h-6" />
                    <h2 className="text-lg font-medium text-gray-900">Facebook Content Schedule</h2>
                  </div>
                  <span className="text-green-600 text-sm font-medium">
                    Connected as {facebookStatus.userName}
                  </span>
                </div>
              </div>

              {/* Facebook Timer Settings */}
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-medium text-gray-900">Facebook Timer Settings</h3>
                  <Settings className="w-5 h-5 text-gray-400" />
                </div>

                {/* Facebook Posts Timer */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-medium text-gray-900">Posts Timer</h4>
                    <div className="flex items-center space-x-3">
                      {fbPostsTimerActive && (
                        <span className="text-green-600 text-sm font-medium flex items-center">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                          Active
                        </span>
                      )}
                      <button 
                        onClick={() => handleTimerAction(setFbPostsTimerActive, fbPostsTimerActive, 'Facebook Posts', 'facebook')}
                        className={`flex items-center space-x-2 px-3 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                          fbPostsTimerActive 
                            ? 'bg-red-600 text-white hover:bg-red-700' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {fbPostsTimerActive ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        <span>{fbPostsTimerActive ? 'Stop' : 'Start'}</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Posts per day
                      </label>
                      <CustomDropdown
                        value={fbPostsPerDay}
                        options={postsOptions}
                        onChange={setFbPostsPerDay}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Duration (days)
                      </label>
                      <CustomDropdown
                        value={fbPostsDuration}
                        options={durationOptions}
                        onChange={setFbPostsDuration}
                      />
                    </div>
                  </div>

                  {fbPostsTimerActive && (
                    <div className="text-blue-600 text-sm flex items-center mt-2">
                      <Clock className="w-4 h-4 mr-1" />
                      {getNextReminder(fbPostsTimerActive, 'posts')}
                    </div>
                  )}
                </div>

                {/* Facebook Reels Timer */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-medium text-gray-900">Reels Timer</h4>
                    <div className="flex items-center space-x-3">
                      {fbReelsTimerActive && (
                        <span className="text-green-600 text-sm font-medium flex items-center">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                          Active
                        </span>
                      )}
                      <button 
                        onClick={() => handleTimerAction(setFbReelsTimerActive, fbReelsTimerActive, 'Facebook Reels', 'facebook')}
                        className={`flex items-center space-x-2 px-3 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                          fbReelsTimerActive 
                            ? 'bg-red-600 text-white hover:bg-red-700' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {fbReelsTimerActive ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        <span>{fbReelsTimerActive ? 'Stop' : 'Start'}</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Reels per day
                      </label>
                      <CustomDropdown
                        value={fbReelsPerDay}
                        options={reelsOptions}
                        onChange={setFbReelsPerDay}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Duration (days)
                      </label>
                      <CustomDropdown
                        value={fbReelsDuration}
                        options={durationOptions}
                        onChange={setFbReelsDuration}
                      />
                    </div>
                  </div>

                  {fbReelsTimerActive && (
                    <div className="text-blue-600 text-sm flex items-center mt-2">
                      <Clock className="w-4 h-4 mr-1" />
                      {getNextReminder(fbReelsTimerActive, 'reels')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Facebook Not Connected */
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FacebookIcon className="w-6 h-6 opacity-50" />
                    <h2 className="text-lg font-medium text-gray-900">Facebook Content Schedule</h2>
                  </div>
                </div>
              </div>

              <div className="p-12 text-center">
                <FacebookIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-gray-500 mb-6">Please connect your Facebook account to set up timers</p>
                {!isLoggedIn && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                    You need to login first before connecting social media accounts
                  </div>
                )}
                <button 
                  onClick={connectFacebook}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  Connect Facebook
                </button>
              </div>
            </div>
          )}

          {/* FIXED: Instagram Section with unified naming */}
          {instagramStatus.isLoggedIn ? (
            <div className="bg-white rounded-lg border border-gray-200">
              {/* Instagram Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <InstagramIcon className="w-6 h-6" />
                    <h2 className="text-lg font-medium text-gray-900">Instagram Content Schedule</h2>
                  </div>
                  <span className="text-green-600 text-sm font-medium">
                    Connected as {instagramStatus.userName}
                  </span>
                </div>
              </div>

              {/* Instagram Timer Settings */}
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-medium text-gray-900">Instagram Timer Settings</h3>
                  <Settings className="w-5 h-5 text-gray-400" />
                </div>

                {/* Instagram Posts Timer */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-medium text-gray-900">Posts Timer</h4>
                    <div className="flex items-center space-x-3">
                      {igPostsTimerActive && (
                        <span className="text-green-600 text-sm font-medium flex items-center">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                          Active
                        </span>
                      )}
                      <button 
                        onClick={() => handleTimerAction(setIgPostsTimerActive, igPostsTimerActive, 'Instagram Posts', 'instagram')}
                        className={`flex items-center space-x-2 px-3 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                          igPostsTimerActive 
                            ? 'bg-red-600 text-white hover:bg-red-700' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {igPostsTimerActive ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        <span>{igPostsTimerActive ? 'Stop' : 'Start'}</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Posts per day
                      </label>
                      <CustomDropdown
                        value={igPostsPerDay}
                        options={postsOptions}
                        onChange={setIgPostsPerDay}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Duration (days)
                      </label>
                      <CustomDropdown
                        value={igPostsDuration}
                        options={durationOptions}
                        onChange={setIgPostsDuration}
                      />
                    </div>
                  </div>

                  {igPostsTimerActive && (
                    <div className="text-blue-600 text-sm flex items-center mt-2">
                      <Clock className="w-4 h-4 mr-1" />
                      {getNextReminder(igPostsTimerActive, 'posts')}
                    </div>
                  )}
                </div>

                {/* Instagram Reels Timer */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-medium text-gray-900">Reels Timer</h4>
                    <div className="flex items-center space-x-3">
                      {igReelsTimerActive && (
                        <span className="text-green-600 text-sm font-medium flex items-center">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                          Active
                        </span>
                      )}
                      <button 
                        onClick={() => handleTimerAction(setIgReelsTimerActive, igReelsTimerActive, 'Instagram Reels', 'instagram')}
                        className={`flex items-center space-x-2 px-3 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                          igReelsTimerActive 
                            ? 'bg-red-600 text-white hover:bg-red-700' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {igReelsTimerActive ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        <span>{igReelsTimerActive ? 'Stop' : 'Start'}</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Reels per day
                      </label>
                      <CustomDropdown
                        value={igReelsPerDay}
                        options={reelsOptions}
                        onChange={setIgReelsPerDay}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Duration (days)
                      </label>
                      <CustomDropdown
                        value={igReelsDuration}
                        options={durationOptions}
                        onChange={setIgReelsDuration}
                      />
                    </div>
                  </div>

                  {igReelsTimerActive && (
                    <div className="text-blue-600 text-sm flex items-center mt-2">
                      <Clock className="w-4 h-4 mr-1" />
                      {getNextReminder(igReelsTimerActive, 'reels')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Instagram Not Connected */
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <InstagramIcon className="w-6 h-6 opacity-50" />
                    <h2 className="text-lg font-medium text-gray-900">Instagram Content Schedule</h2>
                  </div>
                </div>
              </div>

              <div className="p-12 text-center">
                <InstagramIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-gray-500 mb-6">Please connect your Instagram account to set up timers</p>
                {!isLoggedIn && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                    You need to login first before connecting social media accounts
                  </div>
                )}
                <button 
                  onClick={connectInstagram}
                  className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors"
                >
                  Connect Instagram
                </button>
              </div>
            </div>
          )}
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

      {/* FIXED: Facebook Social Media Login Popup */}
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
};

export default SocialMediaScheduler;