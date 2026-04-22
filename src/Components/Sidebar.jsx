import React, { useState } from 'react';
import { Menu, User, UserCheck, Clock, Share2, Megaphone, Bell, FolderOpen, TrendingUp, Plus, UserPlus, Users, CheckCircle, Tag, AlertCircle, LogOut } from 'lucide-react';

function Sidebar({ isLoggedIn, userName, setIsLoginOpen, handleLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const businessFeatures = [
    {
      name: 'Lead Management',
      icon: <UserCheck className="w-4 h-4" />,
      color: 'text-blue-600',
      subItems: [
        { name: 'Add New Leads', icon: <UserPlus className="w-4 h-4" /> },
        { name: 'Assign to Employee', icon: <Users className="w-4 h-4" /> },
        { name: 'Lead Status Tracking', icon: <CheckCircle className="w-4 h-4" /> },
        { name: 'Lead Tags (Hot/Warm/Cold)', icon: <Tag className="w-4 h-4" /> },
        { name: 'Follow-up Reminders', icon: <AlertCircle className="w-4 h-4" /> },
      ],
    },
    {
      name: 'Follow-up System',
      icon: <Clock className="w-4 h-4" />,
      color: 'text-blue-600',
      subItems: [
        { name: 'Add Follow-up Date/Time', icon: <Clock className="w-4 h-4" /> },
        { name: 'Daily Task View', icon: <CheckCircle className="w-4 h-4" /> },
        { name: 'WhatsApp/Email Reminders', icon: <AlertCircle className="w-4 h-4" /> },
        { name: 'Snooze/Complete Follow-up', icon: <CheckCircle className="w-4 h-4" /> },
        { name: 'Voice/Text Notes', icon: <FolderOpen className="w-4 h-4" /> },
      ],
    },
    {
      name: 'Social Media Management',
      icon: <Share2 className="w-4 h-4" />,
      color: 'text-blue-600',
      subItems: [
        { name: 'Content Calendar Upload', icon: <FolderOpen className="w-4 h-4" /> },
        { name: 'Post Creation/Approval', icon: <CheckCircle className="w-4 h-4" /> },
        { name: 'Post Status Management', icon: <TrendingUp className="w-4 h-4" /> },
        { name: 'Performance Analytics', icon: <TrendingUp className="w-4 h-4" /> },
      ],
    },
    {
      name: 'Marketing Campaign Tracker',
      icon: <Megaphone className="w-4 h-4" />,
      color: 'text-blue-600',
      subItems: [
        { name: 'Meta Ads Campaign', icon: <Megaphone className="w-4 h-4" /> },
        { name: 'Cold Email Tracker', icon: <Share2 className="w-4 h-4" /> },
        { name: 'Cold Call Log', icon: <Users className="w-4 h-4" /> },
        { name: 'B2B Marketplace Status', icon: <TrendingUp className="w-4 h-4" /> },
      ],
    },
    {
      name: 'Notification System',
      icon: <Bell className="w-4 h-4" />,
      color: 'text-blue-600',
      subItems: [
        { name: 'Daily Alerts', icon: <Bell className="w-4 h-4" /> },
        { name: 'Dashboard Notifications', icon: <AlertCircle className="w-4 h-4" /> },
        { name: 'Employee Notifications', icon: <Users className="w-4 h-4" /> },
      ],
    },
    {
      name: 'Client Project View',
      icon: <FolderOpen className="w-4 h-4" />,
      color: 'text-blue-600',
      subItems: [
        { name: 'Service Progress', icon: <TrendingUp className="w-4 h-4" /> },
        { name: 'Leads Generated', icon: <UserCheck className="w-4 h-4" /> },
        { name: 'Monthly Reports', icon: <FolderOpen className="w-4 h-4" /> },
        { name: 'Notes & Invoicing', icon: <CheckCircle className="w-4 h-4" /> },
      ],
    },
    {
      name: 'Analytics & Reporting',
      icon: <TrendingUp className="w-4 h-4" />,
      color: 'text-blue-600',
      subItems: [
        { name: 'Leads by Source', icon: <TrendingUp className="w-4 h-4" /> },
        { name: 'Conversion Rate', icon: <CheckCircle className="w-4 h-4" /> },
        { name: 'Follow-up Success Rate', icon: <TrendingUp className="w-4 h-4" /> },
        { name: 'Client-wise Report', icon: <FolderOpen className="w-4 h-4" /> },
        { name: 'Employee Performance', icon: <Users className="w-4 h-4" /> },
      ],
    },
  ];

  // Handle profile click - login if not logged in, logout if logged in
  const handleProfileClick = () => {
    console.log('Sidebar: handleProfileClick called, isLoggedIn:', isLoggedIn);
    if (!isLoggedIn) {
      console.log('Sidebar: Setting isLoginOpen to true');
      setIsLoginOpen(true);
      setSidebarOpen(false);
    } else {
      console.log('Sidebar: Logging out');
      handleLogout();
    }
  };

  // Properly extract user name - handle both string and object userName
  const getUserDisplayName = () => {
    console.log('Sidebar: getUserDisplayName called:', { isLoggedIn, userName, userNameType: typeof userName });

    if (!isLoggedIn) return 'User';
    if (!userName) return 'User';

    if (typeof userName === 'string') {
      const cleanName = userName.trim();
      console.log('Sidebar: String userName found:', cleanName);
      return cleanName || 'User';
    }

    if (typeof userName === 'object') {
      if (userName.name && typeof userName.name === 'string') {
        const cleanName = userName.name.trim();
        console.log('Sidebar: Object userName.name found:', cleanName);
        return cleanName || 'User';
      }
      if (userName.email && typeof userName.email === 'string') {
        const emailName = userName.email.split('@')[0];
        console.log('Sidebar: Object userName.email fallback found:', emailName);
        return emailName || 'User';
      }
    }

    console.log('Sidebar: Using fallback name: User');
    return 'User';
  };

  return (
    <div className="p-4 flex justify-center">
      <div
        className={`${sidebarOpen ? 'w-64 rounded-2xl' : 'w-16 rounded-full'} h-[calc(100vh-2rem)] transition-all duration-300 flex flex-col py-4 shadow-lg`}
        style={{ backgroundColor: '#E8F4FD' }}
      >
        {/* Logo/Menu Button */}
        <div className="flex items-center justify-center px-4 mb-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-white hover:bg-opacity-30 p-2 rounded-full transition-all duration-200 cursor-pointer hover:scale-105"
            style={{ color: '#ea0000ff' }}
          >
            <Menu className="w-5 h-5" />
          </button>
          {sidebarOpen && (
            <h2 className="font-bold text-sm ml-3" style={{ color: '#2D3748' }}>
              Business Tools
            </h2>
          )}
        </div>

        {/* Business Features Section - Soft Pastels Theme */}
        {sidebarOpen && (
          <div className="px-4 mb-2 flex-1 overflow-y-auto">
            <h3 className="font-semibold mb-3 text-xs opacity-80" style={{ color: '#2D3748' }}>
              BUSINESS FEATURES
            </h3>
            <div className="space-y-1">
              {businessFeatures.map((feature, index) => (
                <div key={index} className="relative">
                  <button
                    className="flex items-center space-x-2.5 p-2.5 rounded-xl hover:bg-[#b0ebf6] hover:shadow-md transition-all duration-200 text-left group cursor-pointer w-full"
                    onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                  >
                    <div className="p-1 rounded-lg" style={{ backgroundColor: '#F0F8E8' }}>
                      <span style={{ color: '#2D3748' }}>{feature.icon}</span>
                    </div>
                    <span className="font-medium text-xs flex-1" style={{ color: '#2D3748' }}>
                      {feature.name}
                    </span>
                    <Plus
                      className={`w-3 h-3 opacity-70 hover:opacity-100 transition-all ${
                        activeDropdown === index ? 'rotate-45' : ''
                      }`}
                      style={{ color: '#ea0000ff' }}
                    />
                  </button>

                  {/* Submenu Items - Flat List Structure */}
                  {activeDropdown === index && (
                    <div className="mt-1 space-y-1">
                      {feature.subItems.map((subItem, subIndex) => (
                        <button
                          key={subIndex}
                          className="flex items-center space-x-2.5 p-2 ml-4 rounded-lg hover:bg-white hover:bg-opacity-50 transition-all duration-200 text-left cursor-pointer w-full group"
                        >
                          <div className="p-1 rounded-md" style={{ backgroundColor: '#F0F8E8', opacity: 0.8 }}>
                            <span style={{ color: '#2D3748' }}>{subItem.icon}</span>
                          </div>
                          <span className="font-medium text-xs" style={{ color: '#2D3748' }}>
                            {subItem.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Collapsed Business Features Icons */}
        {!sidebarOpen && (
          <div className="flex flex-col items-center space-y-3 flex-1 overflow-y-auto">
            {businessFeatures.map((feature, index) => (
              <div key={index} className="relative group">
                <button
                  className="hover:bg-white hover:bg-opacity-40 p-2 rounded-full transition-all duration-200 cursor-pointer hover:scale-110 hover:shadow-md"
                  title={feature.name}
                  style={{ color: '#2D3748' }}
                >
                  {feature.icon}
                </button>
                <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus className="w-3 h-3 bg-white rounded-full p-0.5 shadow-sm" style={{ color: '#2D3748' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* User Profile Section */}
        <div className={`${sidebarOpen ? 'px-3 mt-auto' : 'flex justify-center mt-auto'}`}>
          <button
            className={`hover:bg-white hover:bg-opacity-30 p-2 rounded-full transition-all duration-200 cursor-pointer hover:scale-110 flex items-center ${
              sidebarOpen ? 'space-x-2 w-full' : ''
            }`}
            onClick={handleProfileClick}
            title={!sidebarOpen ? (isLoggedIn ? `Logout ${getUserDisplayName()}` : 'Login') : ''}
          >
            <div className="w-7 h-7 rounded-full bg-white bg-opacity-40 flex items-center justify-center">
              {isLoggedIn ? (
                <LogOut className="w-4 h-4" style={{ color: '#2D3748' }} />
              ) : (
                <User className="w-4 h-4" style={{ color: '#2D3748' }} />
              )}
            </div>
            {sidebarOpen && isLoggedIn && (
              <span className="font-medium text-sm truncate" style={{ color: '#2D3748' }}>
                {getUserDisplayName()}
              </span>
            )}
            {sidebarOpen && !isLoggedIn && (
              <span className="font-medium text-sm" style={{ color: '#2D3748' }}>
                Login
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;