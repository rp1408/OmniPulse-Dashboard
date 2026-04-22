import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

import { Search, User, Plus, X, LogOut, Home, Camera } from "lucide-react";
import { FaInstagram, FaFacebook, FaShoppingCart } from "react-icons/fa";

// Import social media login components from separate file
import { InstagramLogin, FacebookLogin, MetaBusinessLogin } from './SocialMediaForms';
import { UseAuth } from '../AuthContext';

// Global state to persist user data across components (replaces localStorage)
window.userLoginState = window.userLoginState || {
  connectedPlatforms: new Set(),
  userLoginData: {
    instagram: null,
    facebook: null,
    meta: null,
    marketplace: null
  }
};

function DashboardHeader({ onShowMainLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [connectDropdownOpen, setConnectDropdownOpen] = useState(false);
  const [loginModal, setLoginModal] = useState(null);
  const [connectedPlatforms, setConnectedPlatforms] = useState(window.userLoginState.connectedPlatforms);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [userLoginData, setUserLoginData] = useState(window.userLoginState.userLoginData);

  // Use AuthContext to get real-time social media status
  const { getSocialMediaStatus, socialMediaLogin, socialMediaLogout } = UseAuth();

  // Get real-time status from AuthContext for both Instagram and Facebook
  const instagramStatusFromAuth = getSocialMediaStatus('instagram');
  const facebookStatusFromAuth = getSocialMediaStatus('facebook'); // FIXED: Added Facebook status
  const metaStatusFromAuth = getSocialMediaStatus('meta');

  // FIXED: Update local state when AuthContext status changes for ALL platforms
  useEffect(() => {
    console.log('=== Header: Social Media Status Updated ===');
    console.log('Instagram status:', instagramStatusFromAuth);
    console.log('Facebook status:', facebookStatusFromAuth); // FIXED: Log Facebook status
    console.log('Meta status:', metaStatusFromAuth);
    
    // Update connected platforms based on AuthContext
    const newConnectedPlatforms = new Set();
    
    if (instagramStatusFromAuth.isLoggedIn) {
      newConnectedPlatforms.add('instagram');
    }
    
    // FIXED: Add Facebook platform detection
    if (facebookStatusFromAuth.isLoggedIn) {
      newConnectedPlatforms.add('facebook');
    }
    
    if (metaStatusFromAuth.isLoggedIn) {
      newConnectedPlatforms.add('meta');
    }

    // Update header's connected platforms
    setConnectedPlatforms(newConnectedPlatforms);
    window.userLoginState.connectedPlatforms = newConnectedPlatforms;

    // Update header's user login data
    const newUserLoginData = {
      instagram: instagramStatusFromAuth.isLoggedIn ? {
        username: instagramStatusFromAuth.userName,
        userName: instagramStatusFromAuth.userName,
        email: instagramStatusFromAuth.email || instagramStatusFromAuth.userName
      } : null,
      
      // FIXED: Add Facebook user login data
      facebook: facebookStatusFromAuth.isLoggedIn ? {
        email: facebookStatusFromAuth.userName,
        userName: facebookStatusFromAuth.userName,
        displayName: facebookStatusFromAuth.userName
      } : null,
      
      meta: metaStatusFromAuth.isLoggedIn ? {
        email: metaStatusFromAuth.userName,
        userName: metaStatusFromAuth.userName,
        displayName: metaStatusFromAuth.userName
      } : null,
      
      marketplace: userLoginData.marketplace // Keep existing marketplace data
    };

    setUserLoginData(newUserLoginData);
    window.userLoginState.userLoginData = newUserLoginData;

    console.log('Header updated with all platform data:', newUserLoginData);
    
  }, [ instagramStatusFromAuth.isLoggedIn, 
    instagramStatusFromAuth.userName,
    facebookStatusFromAuth.isLoggedIn,    // FIXED: Added Facebook dependencies
    facebookStatusFromAuth.userName,
    metaStatusFromAuth.isLoggedIn,
    metaStatusFromAuth.userName ]);

  // Load connected platforms and user login data from global state (secure approach)
  useEffect(() => {
    setConnectedPlatforms(window.userLoginState.connectedPlatforms);
    setUserLoginData(window.userLoginState.userLoginData);
  }, []);

  // Save connected platforms to global state whenever it changes
  useEffect(() => {
    window.userLoginState.connectedPlatforms = connectedPlatforms;
  }, [connectedPlatforms]);

  // Save user login data to global state whenever it changes
  useEffect(() => {
    window.userLoginState.userLoginData = userLoginData;
  }, [userLoginData]);

  // Handle signout functionality - clears all platforms from AuthContext
  const handleSignout = () => {
    console.log('=== Header: Complete signout ===');
    
    // Logout from all social media platforms in AuthContext
    ['instagram', 'facebook', 'meta', 'marketplace'].forEach(platform => {
      socialMediaLogout(platform);
    });
    
    // Reset local header state
    const resetData = {
      instagram: null,
      facebook: null,
      meta: null,
      marketplace: null
    };
    setUserLoginData(resetData);
    window.userLoginState.userLoginData = resetData;
    
    const resetPlatforms = new Set();
    setConnectedPlatforms(resetPlatforms);
    window.userLoginState.connectedPlatforms = resetPlatforms;
    
    // Close any open dropdowns
    setConnectDropdownOpen(false);
    setProfileDropdownOpen(false);
    
    console.log('Complete signout from header successful');
  };

  // Handle logout for specific platform - updates AuthContext
  const handlePlatformLogout = (platformKey) => {
    console.log(`=== Header: Logging out from ${platformKey} ===`);
    
    // 1. Update AuthContext first (most important)
    socialMediaLogout(platformKey);
    
    // 2. Update local header state
    setUserLoginData(prev => {
      const updated = {
        ...prev,
        [platformKey]: null
      };
      window.userLoginState.userLoginData = updated;
      return updated;
    });
    
    setConnectedPlatforms(prev => {
      const newSet = new Set(prev);
      newSet.delete(platformKey);
      window.userLoginState.connectedPlatforms = newSet;
      return newSet;
    });

    console.log(`${platformKey} logout complete from header`);
  };

  const socialPlatforms = [
    {
      name: "Instagram",
      icon: <FaInstagram className="w-5 h-5 text-white" />,
      color: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]",
      key: "instagram",
    },
    {
      name: "Facebook",
      icon: <FaFacebook className="w-5 h-5 text-white" />,
      color: "bg-[#1877F2]",
      key: "facebook",
    },
    {
      name: "Meta Business",
      icon: (
        <div className="w-5 h-5 bg-[#0064E0] rounded flex items-center justify-center text-white text-xs font-bold">
          M
        </div>
      ),
      color: "bg-[#0064E0]",
      key: "meta",
    },
    {
      name: "Marketplace",
      icon: <FaShoppingCart className="w-5 h-5 text-white" />,
      color: "bg-[#28A745]",
      key: "marketplace",
    },
  ];

  const handlePlatformClick = (platformKey) => {
    setLoginModal(platformKey);
    setConnectDropdownOpen(false);
  };

  const closeModal = () => {
    setLoginModal(null);
  };

  const backToDropdown = () => {
    setLoginModal(null);
    setConnectDropdownOpen(true);
  };

  const handlePlatformSuccess = (platformKey, userData) => {
    console.log(`=== Header: Platform ${platformKey} connected ===`);
    console.log('User data:', userData);
    
    // Update connected platforms
    setConnectedPlatforms((prev) => {
      const newSet = new Set([...prev, platformKey]);
      window.userLoginState.connectedPlatforms = newSet;
      return newSet;
    });

    // Update user login data
    setUserLoginData(prev => {
      const updated = {
        ...prev,
        [platformKey]: userData
      };
      window.userLoginState.userLoginData = updated;
      return updated;
    });

    // FIXED: Update AuthContext for all platforms, not just Instagram
    console.log(`Header: Updating AuthContext with ${platformKey} data`);
    socialMediaLogin(platformKey, userData);
  };

  // Get the current page platform based on route
  const getCurrentPagePlatform = () => {
    const pathname = location.pathname.toLowerCase();
    if (pathname.includes('instagram')) return 'instagram';
    if (pathname.includes('facebook')) return 'facebook';
    if (pathname.includes('meta')) return 'meta';
    if (pathname.includes('marketplace')) return 'marketplace';
    return null;
  };

  // FIXED: Get display name using AuthContext data for all platforms
  const getDisplayName = () => {
    const currentPagePlatform = getCurrentPagePlatform();
    
    // FIXED: For current page platform, prioritize AuthContext data
    if (currentPagePlatform === 'instagram' && instagramStatusFromAuth.isLoggedIn) {
      return instagramStatusFromAuth.userName;
    }
    
    if (currentPagePlatform === 'facebook' && facebookStatusFromAuth.isLoggedIn) {
      return facebookStatusFromAuth.userName;
    }
    
    if (currentPagePlatform === 'meta' && metaStatusFromAuth.isLoggedIn) {
      return metaStatusFromAuth.userName;
    }
    
    // If we're on a specific platform page, prioritize that platform's data
    if (currentPagePlatform && connectedPlatforms.has(currentPagePlatform) && userLoginData[currentPagePlatform]) {
      const platformData = userLoginData[currentPagePlatform];
      
      if (currentPagePlatform === "instagram") {
        if (platformData.username) {
          return platformData.username.startsWith('@') ? platformData.username : `@${platformData.username}`;
        }
        return platformData.email || platformData.username;
      } else {
        return platformData.email || platformData.userName;
      }
    }
    
    // FIXED: Fallback to any connected platform using AuthContext data
    if (instagramStatusFromAuth.isLoggedIn) {
      return instagramStatusFromAuth.userName;
    }
    if (facebookStatusFromAuth.isLoggedIn) {
      return facebookStatusFromAuth.userName;
    }
    if (metaStatusFromAuth.isLoggedIn) {
      return metaStatusFromAuth.userName;
    }
    if (connectedPlatforms.has("marketplace") && userLoginData.marketplace) {
      return userLoginData.marketplace.email;
    }
    return "Connect";
  };

  // FIXED: Get the primary connected platform using AuthContext for all platforms
  const getPrimaryPlatform = () => {
    const currentPagePlatform = getCurrentPagePlatform();
    
    // If we're on a specific platform page and AuthContext says it's connected, use it
    if (currentPagePlatform === 'instagram' && instagramStatusFromAuth.isLoggedIn) {
      return 'instagram';
    }
    
    if (currentPagePlatform === 'facebook' && facebookStatusFromAuth.isLoggedIn) {
      return 'facebook';
    }
    
    if (currentPagePlatform === 'meta' && metaStatusFromAuth.isLoggedIn) {
      return 'meta';
    }
    
    // If we're on a specific platform page and that platform is connected, use it
    if (currentPagePlatform && connectedPlatforms.has(currentPagePlatform)) {
      return currentPagePlatform;
    }
    
    // FIXED: Fallback to any connected platform, prioritizing AuthContext data
    if (instagramStatusFromAuth.isLoggedIn) return "instagram";
    if (facebookStatusFromAuth.isLoggedIn) return "facebook";
    if (metaStatusFromAuth.isLoggedIn) return "meta";
    if (connectedPlatforms.has("marketplace")) return "marketplace";
    return null;
  };

  // Get the icon for the primary platform
  const getPrimaryPlatformIcon = () => {
    const primaryPlatform = getPrimaryPlatform();
    if (!primaryPlatform) {
      return (
        <div className="w-6 h-6 rounded bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] flex items-center justify-center">
          <FaInstagram className="w-4 h-4 text-white" />
        </div>
      );
    }

    switch (primaryPlatform) {
      case "instagram":
        return (
          <div className="w-6 h-6 rounded bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] flex items-center justify-center">
            <FaInstagram className="w-4 h-4 text-white" />
          </div>
        );
      case "facebook":
        return (
          <div className="w-6 h-6 rounded bg-[#1877F2] flex items-center justify-center">
            <FaFacebook className="w-4 h-4 text-white" />
          </div>
        );
      case "meta":
        return (
          <div className="w-6 h-6 bg-[#0064E0] rounded flex items-center justify-center text-white text-xs font-bold">
            M
          </div>
        );
      case "marketplace":
        return (
          <div className="w-6 h-6 rounded bg-[#28A745] flex items-center justify-center">
            <FaShoppingCart className="w-4 h-4 text-white" />
          </div>
        );
      default:
        return (
          <div className="w-6 h-6 rounded bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] flex items-center justify-center">
            <FaInstagram className="w-4 h-4 text-white" />
          </div>
        );
    }
  };

  return (
    <>
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Business Dashboard
            </h2>
            {/* Navigation buttons - Home, Instagram Dash, Facebook Dash with white background and red shadow */}
            <div className="flex items-center space-x-2 ml-6">
              <button
                onClick={() => navigate('/Home')}
                className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-[0_2px_8px_rgba(239,68,68,0.3)] hover:shadow-[0_4px_12px_rgba(239,68,68,0.4)] transition-shadow duration-200"
                title="Home"
              >
                <Home className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={() => navigate('/Instagramdash')}
                className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-[0_2px_8px_rgba(239,68,68,0.3)] hover:shadow-[0_4px_12px_rgba(239,68,68,0.4)] transition-shadow duration-200"
                title="Instagram Dashboard"
              >
                <FaInstagram className="w-5 h-5 text-[#E1306C]" />
              </button>
              <button
                onClick={() => navigate('/Facebookdash')}
                className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-[0_2px_8px_rgba(239,68,68,0.3)] hover:shadow-[0_4px_12px_rgba(239,68,68,0.4)] transition-shadow duration-200"
                title="Facebook Dashboard"
              >
                <FaFacebook className="w-5 h-5 text-[#1877F2]" />
              </button>
              <button
                onClick={() => navigate('/Metacamping')}
                className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-[0_2px_8px_rgba(239,68,68,0.3)] hover:shadow-[0_4px_12px_rgba(239,68,68,0.4)] transition-shadow duration-200"
                title="Meta Dashboard"
              >
                <div className="w-5 h-5 bg-[#0064E0] rounded flex items-center justify-center text-white text-xs font-bold">
                  M
                </div>
              </button>
              <button
                onClick={() => navigate('/Marketplace')}
                className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-[0_2px_8px_rgba(239,68,68,0.3)] hover:shadow-[0_4px_12px_rgba(239,68,68,0.4)] transition-shadow duration-200"
                title="Marketplace Dashboard"
              >
                <FaShoppingCart className="w-5 h-5 text-[#28A745]" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="flex items-center bg-white rounded-lg shadow-sm border px-3 py-2">
                <div className="flex items-center space-x-2">
                  {getPrimaryPlatformIcon()}
                  <span 
                    className="text-sm font-medium text-gray-800 cursor-default transition-colors max-w-32 truncate"
                    title={getDisplayName()}
                  >
                    {getDisplayName()}
                  </span>
                  {/* Logout button - properly calls handlePlatformLogout */}
                  {getPrimaryPlatform() && (
                    <button
                      onClick={() => handlePlatformLogout(getPrimaryPlatform())}
                      className="ml-2 p-1 hover:bg-gray-100 rounded transition-colors text-gray-600 hover:text-red-600"
                      title="Logout"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => setConnectDropdownOpen(!connectDropdownOpen)}
                  className="ml-3 p-1 hover:bg-gray-100 rounded transition-colors text-gray-800"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {connectDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setConnectDropdownOpen(false)}
                  ></div>
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border z-20">
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-gray-800">
                          Add Connect ID
                        </span>
                        <button
                          onClick={() => setConnectDropdownOpen(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        {socialPlatforms.map((platform, index) => {
                          // FIXED: Check connection status from AuthContext for all platforms
                          let isConnected = false;
                          if (platform.key === 'instagram') {
                            isConnected = instagramStatusFromAuth.isLoggedIn;
                          } else if (platform.key === 'facebook') {
                            isConnected = facebookStatusFromAuth.isLoggedIn;
                          } else if (platform.key === 'meta') {
                            isConnected = metaStatusFromAuth.isLoggedIn;
                          } else {
                            isConnected = connectedPlatforms.has(platform.key);
                          }

                          return (
                            <button
                              key={index}
                              className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                              onClick={() => handlePlatformClick(platform.key)}
                            >
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-6 h-6 rounded ${platform.color} flex items-center justify-center`}
                                >
                                  {platform.icon}
                                </div>
                                <span className="text-sm text-gray-800">
                                  {platform.name}
                                </span>
                                {/* FIXED: Show green checkmark based on AuthContext status */}
                                {isConnected && (
                                  <span className="text-xs text-green-600 font-medium">✓</span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500 text-center">
                          Connect your social media accounts to manage campaigns
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-green-100 hover:bg-green-200 transition-colors"
              >
                <User className="w-4 h-4 text-gray-800" />
              </button>

              {profileDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setProfileDropdownOpen(false)}
                  ></div>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border z-20">
                    <div className="p-2">
                      <button className="w-full flex items-center p-2 hover:bg-gray-100 rounded text-sm text-gray-800">
                        <span className="mr-2">👤</span> Profile
                      </button>
                      <button className="w-full flex items-center p-2 hover:bg-gray-100 rounded text-sm text-gray-800">
                        <span className="mr-2">🏷️</span> Tags
                      </button>
                      <button className="w-full flex items-center p-2 hover:bg-gray-100 rounded text-sm text-gray-800">
                        <span className="mr-2">🔒</span> Privacy
                      </button>
                      <button className="w-full flex items-center p-2 hover:bg-gray-100 rounded text-sm text-gray-800">
                        <span className="mr-2">⚙️</span> Settings
                      </button>
                      <button 
                        onClick={handleSignout}
                        className="w-full flex items-center p-2 hover:bg-gray-100 rounded text-sm text-gray-800"
                      >
                        <span className="mr-2">↪️</span> Log out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Login Modals */}
      {loginModal === "instagram" && (
        <InstagramLogin
          onClose={closeModal}
          onBack={backToDropdown}
          onSuccess={handlePlatformSuccess}
          onShowMainLogin={onShowMainLogin}
          isAlreadyConnected={instagramStatusFromAuth.isLoggedIn}
        />
      )}
      {loginModal === "facebook" && (
        <FacebookLogin
          onClose={closeModal}
          onBack={backToDropdown}
          onSuccess={handlePlatformSuccess}
          onShowMainLogin={onShowMainLogin}
          isAlreadyConnected={facebookStatusFromAuth.isLoggedIn} // FIXED: Use AuthContext status
        />
      )}
      {loginModal === "meta" && (
        <MetaBusinessLogin
          onClose={closeModal}
          onBack={backToDropdown}
          onSuccess={handlePlatformSuccess}
          onShowMainLogin={onShowMainLogin}
          isAlreadyConnected={metaStatusFromAuth.isLoggedIn} // FIXED: Use AuthContext status
        />
      )}
    </>
  );
}

export default DashboardHeader;