import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Main application login state (for sidebar and controlling access)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Social media login states (separate from main login but requires main login first)
  const [socialMediaLogins, setSocialMediaLogins] = useState({
    instagram: { isLoggedIn: false, userName: '', email: '', username: '', displayName: '' },
    facebook: { isLoggedIn: false, userName: '', email: '', displayName: '' },
    meta: { isLoggedIn: false, userName: '', email: '', displayName: '' },
    marketplace: { isLoggedIn: false, userName: '', email: '', displayName: '' },
  });

  // Check for existing main login state on component mount
  useEffect(() => {
    console.log('=== AuthContext: Loading saved state ===');
    
    // Using in-memory storage for Claude environment compatibility
    const savedLoginState = sessionStorage.getItem('isLoggedIn');
    const savedUserName = sessionStorage.getItem('userName');

    if (savedLoginState === 'true' && savedUserName) {
      console.log('Found saved main login:', savedUserName);
      setIsLoggedIn(true);
      setUserName(savedUserName);
    }

    // Load social media login states only if main user is logged in
    if (savedLoginState === 'true') {
      const savedSocialLogins = sessionStorage.getItem('socialMediaLogins');
      if (savedSocialLogins) {
        try {
          const parsed = JSON.parse(savedSocialLogins);
          console.log('Found saved social logins:', parsed);
          setSocialMediaLogins(parsed);
        } catch (error) {
          console.error('Error loading social media logins:', error);
        }
      }
    }

    setIsLoading(false);
    console.log('=== AuthContext: Loading complete ===');
  }, []);

  // Save social media logins whenever they change
  useEffect(() => {
    if (isLoggedIn) {
      sessionStorage.setItem('socialMediaLogins', JSON.stringify(socialMediaLogins));
      console.log('Social media logins saved:', socialMediaLogins);
    }
  }, [socialMediaLogins, isLoggedIn]);

  // Main application login
  const login = (email) => {
    console.log('=== AuthContext Main Login ===');
    console.log('Email received:', email);
    
    setIsLoggedIn(true);
    setUserName(email);
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('userName', email);
    
    console.log('Main login successful. User:', email);
  };

  // Main application logout (also clears all social media logins)
  const logout = () => {
    console.log('=== AuthContext Main Logout ===');
    
    setIsLoggedIn(false);
    setUserName('');
    
    // Clear all social media logins when main user logs out
    const resetSocialLogins = {
      instagram: { isLoggedIn: false, userName: '', email: '', username: '', displayName: '' },
      facebook: { isLoggedIn: false, userName: '', email: '', displayName: '' },
      meta: { isLoggedIn: false, userName: '', email: '', displayName: '' },
      marketplace: { isLoggedIn: false, userName: '', email: '', displayName: '' },
    };
    
    setSocialMediaLogins(resetSocialLogins);
    
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('socialMediaLogins');
    
    console.log('Complete logout successful');
  };

  // FIXED: Social media login with comprehensive unified name handling
  const socialMediaLogin = (platform, credentials) => {
    if (!isLoggedIn) {
      console.error('❌ Main user must be logged in first before social media login');
      return false;
    }

    console.log(`=== Social Media Login: ${platform.toUpperCase()} ===`);
    console.log('Raw credentials received:', credentials);

    // FIXED: Comprehensive unified name processing with platform-specific logic
    let processedUserName = '';
    let displayName = '';
    let email = '';

    if (platform === 'instagram') {
      // For Instagram: prioritize username over email, ensure @ prefix for display
      if (credentials.username) {
        processedUserName = credentials.username;
        displayName = credentials.username.startsWith('@') ? credentials.username : `@${credentials.username}`;
        email = credentials.email || (credentials.username.includes('@') ? credentials.username : '');
      } else if (credentials.email) {
        processedUserName = credentials.email;
        displayName = credentials.email.includes('@') && !credentials.email.includes('.') 
          ? credentials.email 
          : `@${credentials.email.split('@')[0]}`;
        email = credentials.email;
      } else {
        processedUserName = 'InstagramUser';
        displayName = '@InstagramUser';
        email = '';
      }
    } else if (platform === 'facebook') {
      // FIXED: For Facebook: prioritize email and ensure consistent userName
      if (credentials.email) {
        processedUserName = credentials.email;
        displayName = credentials.email;
        email = credentials.email;
      } else if (credentials.userName) {
        processedUserName = credentials.userName;
        displayName = credentials.userName;
        email = credentials.userName.includes('@') ? credentials.userName : '';
      } else if (credentials.username) {
        processedUserName = credentials.username;
        displayName = credentials.username;
        email = credentials.username.includes('@') ? credentials.username : '';
      } else {
        processedUserName = 'FacebookUser';
        displayName = 'FacebookUser';
        email = '';
      }
    } else if (platform === 'meta') {
      // For Meta Business: prioritize email
      if (credentials.email) {
        processedUserName = credentials.email;
        displayName = credentials.email;
        email = credentials.email;
      } else if (credentials.username) {
        processedUserName = credentials.username;
        displayName = credentials.username;
        email = credentials.username.includes('@') ? credentials.username : '';
      } else {
        processedUserName = 'MetaUser';
        displayName = 'MetaUser';
        email = '';
      }
    } else {
      // For other platforms: prioritize email
      if (credentials.email) {
        processedUserName = credentials.email;
        displayName = credentials.email;
        email = credentials.email;
      } else if (credentials.username) {
        processedUserName = credentials.username;
        displayName = credentials.username;
        email = credentials.username.includes('@') ? credentials.username : '';
      } else {
        processedUserName = `${platform}User`;
        displayName = `${platform}User`;
        email = '';
      }
    }

    // FIXED: Create comprehensive processed credentials with unified naming
    const processedCredentials = {
      ...credentials,
      userName: processedUserName,      // Consistent property name used everywhere
      displayName: displayName,         // For UI display purposes
      email: email,                     // Consistent email handling
      username: credentials.username || processedUserName, // Keep original if exists
      isLoggedIn: true                  // Mark as logged in
    };

    console.log('Final processed credentials:', processedCredentials);

    setSocialMediaLogins((prev) => {
      const updated = {
        ...prev,
        [platform]: processedCredentials
      };
      console.log(`✅ ${platform} login saved:`, updated[platform]);
      return updated;
    });
    
    return true;
  };

  // Social media logout
  const socialMediaLogout = (platform) => {
    console.log(`=== Social Media Logout: ${platform.toUpperCase()} ===`);
    
    setSocialMediaLogins((prev) => ({
      ...prev,
      [platform]: {
        isLoggedIn: false,
        userName: '',
        email: '',
        username: '',
        displayName: ''
      },
    }));
    
    console.log(`${platform} logout successful`);
  };

  // Logout from all social media platforms
  const logoutAllSocialMedia = () => {
    console.log('=== Logout All Social Media ===');
    
    setSocialMediaLogins({
      instagram: { isLoggedIn: false, userName: '', email: '', username: '', displayName: '' },
      facebook: { isLoggedIn: false, userName: '', email: '', displayName: '' },
      meta: { isLoggedIn: false, userName: '', email: '', displayName: '' },
      marketplace: { isLoggedIn: false, userName: '', email: '', displayName: '' },
    });
    sessionStorage.removeItem('socialMediaLogins');
    
    console.log('All social media logouts successful');
  };

  // FIXED: Get social media login status with comprehensive fallback and name handling
  const getSocialMediaStatus = (platform) => {
    const status = socialMediaLogins[platform] || { 
      isLoggedIn: false, 
      userName: '', 
      email: '', 
      username: '', 
      displayName: '' 
    };
    
    // FIXED: Ensure userName property exists and is consistent with comprehensive fallback
    if (status.isLoggedIn && !status.userName) {
      if (platform === 'instagram') {
        status.userName = status.username || status.email || 'InstagramUser';
        status.displayName = status.userName.startsWith('@') ? status.userName : `@${status.userName}`;
      } else if (platform === 'facebook') {
        status.userName = status.email || status.username || 'FacebookUser';
        status.displayName = status.userName;
      } else {
        status.userName = status.email || status.username || `${platform}User`;
        status.displayName = status.userName;
      }
    }
    
    return status;
  };

  // Check if social media login is allowed (main user must be logged in)
  const canAccessSocialMedia = () => {
    return isLoggedIn;
  };

  // FIXED: Instagram specific login function with comprehensive unified naming
  const instagramLogin = (usernameOrEmail) => {
    if (!isLoggedIn) {
      console.error('❌ Main user must be logged in first before Instagram login');
      return false;
    }

    console.log('=== Instagram Direct Login ===');
    console.log('Username or email received:', usernameOrEmail);

    // Process the username/email consistently with comprehensive logic
    const processedUserName = usernameOrEmail || 'InstagramUser';
    const displayName = processedUserName.startsWith('@') ? processedUserName : `@${processedUserName}`;
    const email = processedUserName.includes('@') && processedUserName.includes('.') ? processedUserName : '';

    const instagramData = {
      isLoggedIn: true,
      userName: processedUserName,
      username: processedUserName,
      displayName: displayName,
      email: email
    };

    setSocialMediaLogins((prev) => ({
      ...prev,
      instagram: instagramData
    }));
    
    console.log('✅ Instagram direct login successful:', instagramData);
    return true;
  };

  // FIXED: Facebook specific login function with comprehensive unified naming
  const facebookLogin = (email) => {
    if (!isLoggedIn) {
      console.error('❌ Main user must be logged in first before Facebook login');
      return false;
    }

    console.log('=== Facebook Direct Login ===');
    console.log('Email received:', email);

    const processedUserName = email || 'FacebookUser';

    const facebookData = {
      isLoggedIn: true,
      userName: processedUserName,     // Consistent userName property
      email: processedUserName,        // Keep email consistent
      displayName: processedUserName   // Display name same as email for Facebook
    };

    setSocialMediaLogins((prev) => ({
      ...prev,
      facebook: facebookData
    }));
    
    console.log('✅ Facebook direct login successful:', facebookData);
    return true;
  };

  const value = {
    // Main login (controls access to everything)
    isLoggedIn,
    userName,
    login,
    logout,
    isLoading,

    // Social media login methods
    socialMediaLogin,
    socialMediaLogout,
    logoutAllSocialMedia,
    getSocialMediaStatus,
    socialMediaLogins,
    canAccessSocialMedia,
    
    // Platform specific methods
    instagramLogin,
    facebookLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const UseAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};