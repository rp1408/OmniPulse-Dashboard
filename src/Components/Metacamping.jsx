import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, ComposedChart } from 'recharts';
import { LogOut } from 'lucide-react';
import DashboardHeader from './Header';
import Sidebar from './Sidebar';
import Login from './Login'; // Import your existing Login component
import { UseAuth } from '../AuthContext';

const MetaCampaignDashboard = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [metaUserInfo, setMetaUserInfo] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Use AuthContext instead of local state
  const { isLoggedIn, userName, userDetails, login, logout, isLoading } = UseAuth();

  const handleLoginSuccess = (email, userData) => {
    console.log('Login success with email:', email, 'and data:', userData);
    login(email, userData); // Use AuthContext login function with user details
    setIsLoginOpen(false);
    // Store Meta user data for persistence
    window.metaUserData = userData;
    window.metaFormData = userData; // Also store as form data
    console.log('Storing metaUserData:', window.metaUserData);
    
    // Trigger refresh to update display
    setRefreshTrigger(prev => prev + 1);
    
    // Dispatch custom event for real-time updates
    window.dispatchEvent(new CustomEvent('metaUserUpdated'));
    window.dispatchEvent(new CustomEvent('metaUsernameUpdated'));
  };

  const handleLogout = () => {
    console.log('Logging out');
    // Clear Meta username state on logout
    setMetaUserInfo(null);
    setRefreshTrigger(prev => prev + 1);
    logout(); // Use AuthContext logout function
    // Clear Meta user data
    window.metaUserData = null;
    window.metaFormData = null;
  };

  // Function to get Meta user information with comprehensive checking
  const getMetaUserInfo = () => {
    console.log('Checking userDetails:', userDetails);
    console.log('Checking window.metaUserData:', window.metaUserData);
    
    // First priority: Check if there's Meta form data stored globally
    if (window.metaFormData?.email) {
      console.log('Found email in window.metaFormData:', window.metaFormData.email);
      return window.metaFormData.email;
    }
    
    // Second priority: Check if there's Meta form data stored globally with name
    if (window.metaFormData?.name) {
      console.log('Found name in window.metaFormData:', window.metaFormData.name);
      return window.metaFormData.name;
    }
    
    // Third priority: Check userDetails from auth context
    if (userDetails?.email) {
      console.log('Found email in userDetails:', userDetails.email);
      return userDetails.email;
    }
    
    // Fourth priority: Check userDetails name
    if (userDetails?.name) {
      console.log('Found name in userDetails:', userDetails.name);
      return userDetails.name;
    }
    
    // Fifth priority: Check window.metaUserData
    if (window.metaUserData?.email) {
      console.log('Found email in window.metaUserData:', window.metaUserData.email);
      return window.metaUserData.email;
    }
    
    if (window.metaUserData?.name) {
      console.log('Found name in window.metaUserData:', window.metaUserData.name);
      return window.metaUserData.name;
    }
    
    // Fallback: Return "@Ronak" if no user info is found
    console.log('No user info found, returning @Ronak');
    return "@Ronak";
  };

  // Monitor for Meta user info changes with comprehensive event listening
  useEffect(() => {
    const checkMetaUserInfo = () => {
      const userInfo = getMetaUserInfo();
      
      console.log('Current metaUserInfo:', metaUserInfo, 'New userInfo:', userInfo);
      
      if (userInfo !== metaUserInfo) {
        setMetaUserInfo(userInfo);
      }
    };

    // Check immediately
    checkMetaUserInfo();
    
    // Set up periodic checking every second for more responsive updates
    const interval = setInterval(checkMetaUserInfo, 1000);
    
    // Listen for custom events
    const handleMetaUpdate = () => {
      console.log('Meta user updated event triggered');
      setRefreshTrigger(prev => prev + 1);
      checkMetaUserInfo();
    };
    
    // Listen for form submission events
    const handleFormSubmit = (e) => {
      console.log('Form submit event triggered:', e.detail);
      if (e.detail && (e.detail.email || e.detail.name)) {
        // Store the form data globally
        window.metaFormData = e.detail;
        window.metaUserData = e.detail; // Also store as user data
        setRefreshTrigger(prev => prev + 1);
        checkMetaUserInfo();
      }
    };
    
    window.addEventListener('metaUserUpdated', handleMetaUpdate);
    window.addEventListener('metaFormSubmitted', handleFormSubmit);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('metaUserUpdated', handleMetaUpdate);
      window.removeEventListener('metaFormSubmitted', handleFormSubmit);
    };
 }, [metaUserInfo, refreshTrigger, userDetails, isLoggedIn]);

  // Sample data - you can modify this to make it truly dynamic
  const [campaignData] = useState({
    spend: 717000,
    revenue: 15160000,
    roas: 99.4,
    impressions: 2600000,
    cpm: 610,
    clicks: 60400,
    ctr: 3.3,
    purchaseRoas: 200,
    purchases: 775,
    cpc: 13.4
  });

  const [timeSeriesData] = useState([
    { date: '22 Apr', spend: 350, purchaseRoas: 120 },
    { date: '23 Apr', spend: 320, purchaseRoas: 100 },
    { date: '24 Apr', spend: 280, purchaseRoas: 80 },
    { date: '25 Apr', spend: 300, purchaseRoas: 90 },
    { date: '26 Apr', spend: 380, purchaseRoas: 110 },
    { date: '27 Apr', spend: 420, purchaseRoas: 130 },
    { date: '28 Apr', spend: 480, purchaseRoas: 140 },
    { date: '29 Apr', spend: 520, purchaseRoas: 150 },
    { date: '30 Apr', spend: 580, purchaseRoas: 160 },
    { date: '1 May', spend: 600, purchaseRoas: 170 },
    { date: '2 May', spend: 620, purchaseRoas: 180 },
    { date: '3 May', spend: 680, purchaseRoas: 190 },
    { date: '5 May', spend: 720, purchaseRoas: 200 }
  ]);

  const [pieData] = useState([
    { name: 'Outcome: Sales', value: 95.1, color: '#1877F2' },
    { name: 'Outcome: Engagement', value: 4.9, color: '#E5E7EB' }
  ]);

  const [campaignResults] = useState([
    {
      name: 'Campaign n°1',
      spend: 350000,
      purchaseValue: 5200000,
      purchaseRoas: 170,
      impressions: 797866,
      cpm: 439,
      clicks: 9172,
      ctr: 1.15,
      cpc: 38,
      purchases: 101
    },
    {
      name: 'Campaign n°2',
      spend: 136000,
      purchaseValue: 5540000,
      purchaseRoas: 431,
      impressions: 787316,
      cpm: 173,
      clicks: 15530,
      ctr: 1.97,
      cpc: 88,
      purchases: 639
    },
    {
      name: 'Campaign n°3',
      spend: 349300,
      purchaseValue: 1270000,
      purchaseRoas: 364,
      impressions: 242307,
      cpm: 144,
      clicks: 4148,
      ctr: 1.71,
      cpc: 84,
      purchases: 85
    }
  ]);

  // Helper function to format Indian Rupees
  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Helper function to format numbers with Indian number system
  const formatIndianNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const MetricCard = ({ title, value, change, color }) => (
    <div className={`${color} text-white p-4 rounded-lg`}>
      <div className="text-xs opacity-80 mb-1">{title}</div>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs opacity-80">{change}</div>
    </div>
  );

  // Show loading if auth is still loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ backgroundColor: '#FEFEFE' }}>
        <div className="text-xl text-gray-800">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#FEFEFE' }}>
      {/* Fixed Left Sidebar */}
      <Sidebar 
        isLoggedIn={isLoggedIn}
        userName={userName}
        setIsLoginOpen={setIsLoginOpen}
        handleLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Fixed Header */}
        <DashboardHeader />

        {/* Meta Campaign Dashboard Content - Scrollable */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {/* User Welcome Message - Updated to show Meta user info */}
          {isLoggedIn && (
            <div className="mb-6 p-6">
              <div className="text-xl font-semibold text-gray-800">
                Header
              </div>
              <div className="text-xl font-semibold text-gray-800 mt-4">
                Welcome to Meta Campaign Analytics!
              </div>
            </div>
          )}

          {/* Meta Header Section */}
          <div className="bg-gray-900 text-white p-4 mx-6 mt-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">M</span>
                  </div>
                  <span className="text-xl font-bold">Meta</span>
                  <span className="text-gray-400">| Campaign results</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <select className="bg-gray-700 text-white px-3 py-1 rounded text-sm">
                  <option>Account Name</option>
                </select>
                <select className="bg-gray-700 text-white px-3 py-1 rounded text-sm">
                  <option>22 Apr 2025 - 5 May 2025</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Metric Cards */}
            <div className="grid grid-cols-7 gap-4 mb-6">
              <MetricCard 
                title="Spend" 
                value={formatINR(campaignData.spend)} 
                change="↑ 31.2%" 
                color="bg-blue-500"
              />
              <MetricCard 
                title="Revenue" 
                value={formatINR(campaignData.revenue)} 
                change="↑ 25.2%" 
                color="bg-blue-600"
              />
              <MetricCard 
                title="ROAS" 
                value={campaignData.roas} 
                change="↑ 34.6%" 
                color="bg-blue-700"
              />
              <MetricCard 
                title="Impressions" 
                value={`${(campaignData.impressions / 1000000).toFixed(1)}M`} 
                change="↑ 18.7%" 
                color="bg-blue-600"
              />
              <MetricCard 
                title="CPM" 
                value={formatINR(campaignData.cpm)} 
                change="↓ 13.9%" 
                color="bg-red-500"
              />
              <MetricCard 
                title="Clicks" 
                value={`${(campaignData.clicks / 1000).toFixed(1)}K`} 
                change="↑ 12.6%" 
                color="bg-blue-500"
              />
              <MetricCard 
                title="CTR" 
                value={`${campaignData.ctr}%`} 
                change="↑ 4.4%" 
                color="bg-green-500"
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Spend and Purchase Roas Chart */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-sm font-medium mb-4 text-gray-800">Spend and Purchase Roas over time</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={timeSeriesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" fontSize={10} />
                    <YAxis yAxisId="left" orientation="left" fontSize={10} />
                    <YAxis yAxisId="right" orientation="right" fontSize={10} />
                    <Bar yAxisId="left" dataKey="spend" fill="#93C5FD" />
                    <Line yAxisId="right" type="monotone" dataKey="purchaseRoas" stroke="#1F2937" strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-blue-300"></div>
                    <span className="text-xs text-gray-600">Spend</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-1 bg-gray-800"></div>
                    <span className="text-xs text-gray-600">Purchase Roas</span>
                  </div>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-sm font-medium mb-4 text-gray-800">Campaign Objective by Spend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col space-y-2 mt-4">
                  {pieData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                      <span className="text-xs text-gray-600">{item.name}</span>
                      <span className="text-xs font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-blue-900 text-white p-3">
                <h3 className="text-center font-medium">RESULT BY CAMPAIGN NAME</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-600 text-white">
                    <tr className="text-xs">
                      <th className="p-2 text-left">Campaign Name</th>
                      <th className="p-2 text-left">Spend ↑</th>
                      <th className="p-2 text-left">Purchases Values</th>
                      <th className="p-2 text-left">Purchase Roas</th>
                      <th className="p-2 text-left">Impressions</th>
                      <th className="p-2 text-left">CPM</th>
                      <th className="p-2 text-left">Clicks</th>
                      <th className="p-2 text-left">CTR</th>
                      <th className="p-2 text-left">CPC</th>
                      <th className="p-2 text-left">Purchases</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaignResults.map((campaign, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-2 text-blue-600 font-medium text-sm">{campaign.name}</td>
                        <td className="p-2 text-sm">
                          <div className="flex items-center">
                            <div className="w-12 h-2 bg-blue-200 rounded mr-2">
                              <div 
                                className="h-full bg-blue-600 rounded" 
                                style={{ width: `${Math.min((campaign.spend / 350000) * 100, 100)}%` }}
                              ></div>
                            </div>
                            {formatINR(campaign.spend)}
                          </div>
                        </td>
                        <td className="p-2 text-sm">
                          <div className="flex items-center">
                            <div className="w-12 h-2 bg-green-200 rounded mr-2">
                              <div 
                                className="h-full bg-green-600 rounded" 
                                style={{ width: `${Math.min((campaign.purchaseValue / 5540000) * 100, 100)}%` }}
                              ></div>
                            </div>
                            {formatINR(campaign.purchaseValue)}
                          </div>
                        </td>
                        <td className="p-2 text-sm">
                          <div className="flex items-center">
                            <div className="w-12 h-2 bg-blue-200 rounded mr-2">
                              <div 
                                className="h-full bg-blue-600 rounded" 
                                style={{ width: `${Math.min((campaign.purchaseRoas / 431) * 100, 100)}%` }}
                              ></div>
                            </div>
                            {campaign.purchaseRoas}
                          </div>
                        </td>
                        <td className="p-2 text-sm">{formatIndianNumber(campaign.impressions)}</td>
                        <td className="p-2 text-sm">{formatINR(campaign.cpm)}</td>
                        <td className="p-2 text-sm">{formatIndianNumber(campaign.clicks)}</td>
                        <td className="p-2 text-sm">{campaign.ctr}%</td>
                        <td className="p-2 text-sm">{formatINR(campaign.cpc)}</td>
                        <td className="p-2 text-sm">{campaign.purchases}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Login Popup - Now using your existing Login component */}
        {isLoginOpen && (
          <Login
            onLoginSuccess={handleLoginSuccess}
            onClose={() => setIsLoginOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default MetaCampaignDashboard;