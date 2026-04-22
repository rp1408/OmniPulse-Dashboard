import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  TrendingUp, 
  Package, 
  Users, 
  DollarSign, 
  Eye,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Bell,
  Settings,
  MoreHorizontal,
  AlertCircle,
  CheckCircle,
  Clock,
  Truck,
  Search,
  Plus,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Target,
  Zap,
  Shirt as ShirtIcon,
  Store,
  Globe,
  Edit,
  Trash2,
  UserCheck,
  Shield,
  Crown,
  MessageSquare,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

// Import custom components
import CustomerView from './Customerview';
import VendorView from './Vendorview';
import AdminView from './AdminView';
import { MetricCard, RecentOrdersSection } from './Sharedcomponents';

const MarketplaceDashboard = ({ onBackToHome }) => {
  const [selectedMarketplace, setSelectedMarketplace] = useState('all');
  const [userRole, setUserRole] = useState('customer'); // customer, admin, vendor
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [CurrentTime, setCurrentTime] = useState(new Date());
  const [IsLoginOpen, SetIsLoginOpen] = useState(false);

  // Mock user data
  const userData = {
    customer: { name: 'Rajesh Patel', email: 'rajesh@gmail.com', avatar: 'R' },
    admin: { name: 'Admin User', email: 'admin@company.com', avatar: 'A' },
    vendor: { name: 'Fashion Store', email: 'vendor@store.com', avatar: 'F' }
  };

  // Real marketplace data with actual brand colors and real-looking logos
  const marketplaces = [
    { 
      id: 'all', 
      name: 'All Marketplaces', 
      color: 'bg-gradient-to-r from-slate-800 to-slate-900', 
      logo: <Globe className="w-6 h-6 text-white" />
    },
    { 
      id: 'amazon', 
      name: 'Amazon', 
      color: 'bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-600', 
      logo: (
        <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
          <span className="text-orange-500 text-xs font-bold">a</span>
        </div>
      )
    },
    { 
      id: 'flipkart', 
      name: 'Flipkart', 
      color: 'bg-gradient-to-r from-blue-500 to-indigo-600', 
      logo: (
        <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
          <span className="text-blue-600 text-xs font-bold">F</span>
        </div>
      )
    },
    { 
      id: 'ajio', 
      name: 'AJIO', 
      color: 'bg-gradient-to-r from-red-500 to-pink-600', 
      logo: (
        <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
          <span className="text-red-500 text-xs font-bold">A</span>
        </div>
      )
    },
    { 
      id: 'myntra', 
      name: 'Myntra', 
      color: 'bg-gradient-to-r from-purple-600 to-violet-700', 
      logo: (
        <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
          <ShirtIcon className="w-4 h-4 text-purple-600" />
        </div>
      )
    }
  ];

  // Enhanced realistic data
  const salesData = [
    { month: 'Jan', amazon: 845000, flipkart: 635000, ajio: 425000, myntra: 530000, total: 2435000 },
    { month: 'Feb', amazon: 952000, flipkart: 742000, ajio: 528000, myntra: 635000, total: 2857000 },
    { month: 'Mar', amazon: 1148000, flipkart: 838000, ajio: 632000, myntra: 738000, total: 3356000 },
    { month: 'Apr', amazon: 1361000, flipkart: 948000, ajio: 735000, myntra: 842000, total: 3886000 },
    { month: 'May', amazon: 1458000, flipkart: 1045000, ajio: 838000, myntra: 945000, total: 4286000 },
    { month: 'Jun', amazon: 1665000, flipkart: 1252000, ajio: 942000, myntra: 1148000, total: 5007000 }
  ];

  const metricsData = {
    totalSales: 5007000,
    totalOrders: 12849,
    activeProducts: 48573,
    customers: 156789,
    avgRating: 4.6,
    conversionRate: 3.8,
    returnRate: 2.1,
    profitMargin: 18.5
  };

  const recentOrders = [
    { 
      id: 'AMZ-78945', 
      customer: 'Rajesh Kumar', 
      amount: 12599, 
      status: 'Delivered', 
      marketplace: 'Amazon', 
      time: '2 mins ago',
      product: 'Samsung Galaxy Buds Pro',
      location: 'Mumbai, MH'
    },
    { 
      id: 'FLK-56734', 
      customer: 'Priya Sharma', 
      amount: 8999, 
      status: 'Processing', 
      marketplace: 'Flipkart', 
      time: '5 mins ago',
      product: 'Nike Air Max Shoes',
      location: 'Delhi, DL'
    },
    { 
      id: 'MYN-34521', 
      customer: 'Amit Singh', 
      amount: 6499, 
      status: 'Shipped', 
      marketplace: 'Myntra', 
      time: '8 mins ago',
      product: 'Levi\'s Denim Jacket',
      location: 'Bangalore, KA'
    }
  ];

  // Time update effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const selectedMarketplaceData = marketplaces.find(m => m.id === selectedMarketplace);

  const getStatusColor = (status) => {
    const statusMap = {
      'Delivered': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Processing': 'bg-blue-100 text-blue-800 border-blue-200',
      'Shipped': 'bg-purple-100 text-purple-800 border-purple-200',
      'Confirmed': 'bg-orange-100 text-orange-800 border-orange-200',
      'Out for Delivery': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Active': 'bg-green-100 text-green-800 border-green-200'
    };
    return statusMap[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusIcon = (status) => {
    const iconMap = {
      'Delivered': <CheckCircle className="w-3 h-3" />,
      'Processing': <Clock className="w-3 h-3" />,
      'Shipped': <Truck className="w-3 h-3" />,
      'Confirmed': <CheckCircle className="w-3 h-3" />,
      'Out for Delivery': <Truck className="w-3 h-3" />,
      'Pending': <AlertCircle className="w-3 h-3" />,
      'Active': <CheckCircle className="w-3 h-3" />
    };
    return iconMap[status] || <Clock className="w-3 h-3" />;
  };

  const getRoleIcon = (role) => {
    const roleIcons = {
      'customer': <Users className="w-5 h-5" />,
      'admin': <Shield className="w-5 h-5" />,
      'vendor': <Store className="w-5 h-5" />
    };
    return roleIcons[role];
  };

  const getRoleColor = (role) => {
    const roleColors = {
      'customer': 'bg-gradient-to-r from-blue-500 to-blue-600',
      'admin': 'bg-gradient-to-r from-red-500 to-red-600',
      'vendor': 'bg-gradient-to-r from-green-500 to-green-600'
    };
    return roleColors[role];
  };

  // Role-based header component
  const RoleBasedHeader = () => (
    <div className="bg-white shadow-sm border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 ${getRoleColor(userRole)} rounded-xl flex items-center justify-center text-white shadow-lg`}>
            {getRoleIcon(userRole)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 capitalize">
              {userRole === 'customer' ? 'Customer Dashboard' : 
               userRole === 'admin' ? 'Admin Panel' : 'Vendor Dashboard'}
            </h1>
            <p className="text-gray-600">Welcome, {userData[userRole].name}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Role Switcher for Demo */}
          <div className="relative">
            <select 
              value={userRole} 
              onChange={(e) => setUserRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="customer">Customer View</option>
              <option value="vendor">Vendor View</option>
              <option value="admin">Admin View</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {userData[userRole].avatar}
            </div>
            <span className="text-sm font-medium text-gray-700">{userData[userRole].name}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMainMetrics = () => {
    if (userRole === 'customer') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="My Orders"
            value="24"
            subtitle="This month"
            icon={ShoppingCart}
            change={12.8}
            color="bg-gradient-to-r from-blue-500 to-indigo-600"
            userRole={userRole}
          />
          <MetricCard
            title="Total Spent"
            value="₹45,670"
            subtitle="All time"
            icon={DollarSign}
            change={15.3}
            color="bg-gradient-to-r from-emerald-500 to-green-600"
            userRole={userRole}
          />
          <MetricCard
            title="Saved Items"
            value="156"
            subtitle="Wishlist items"
            icon={Star}
            change={8.2}
            color="bg-gradient-to-r from-yellow-500 to-orange-600"
            userRole={userRole}
          />
          <MetricCard
            title="Loyalty Points"
            value="2,430"
            subtitle="Available points"
            icon={Target}
            change={22.1}
            color="bg-gradient-to-r from-purple-500 to-violet-600"
            userRole={userRole}
          />
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value={`₹${(metricsData.totalSales / 100000).toFixed(1)}L`}
            subtitle="Current month earnings"
            icon={DollarSign}
            change={15.3}
            color="bg-gradient-to-r from-emerald-500 to-green-600"
            userRole={userRole}
          />
          <MetricCard
            title="Total Orders"
            value={metricsData.totalOrders.toLocaleString()}
            subtitle="Orders this month"
            icon={ShoppingCart}
            change={12.8}
            color="bg-gradient-to-r from-blue-500 to-indigo-600"
            userRole={userRole}
          />
          <MetricCard
            title="Active Products"
            value={metricsData.activeProducts.toLocaleString()}
            subtitle="Live inventory"
            icon={Package}
            change={-2.1}
            color="bg-gradient-to-r from-purple-500 to-violet-600"
            adminOnly={true}
            userRole={userRole}
          />
          <MetricCard
            title={userRole === 'admin' ? "All Customers" : "My Products"}
            value={userRole === 'admin' ? `${(metricsData.customers / 1000).toFixed(0)}K+` : "245"}
            subtitle={userRole === 'admin' ? "Active customer base" : "Listed products"}
            icon={userRole === 'admin' ? Users : Package}
            change={18.7}
            color="bg-gradient-to-r from-orange-500 to-red-600"
            userRole={userRole}
          />
        </div>
      );
    }
  };

  const renderRoleBasedContent = () => {
    switch(userRole) {
      case 'customer':
        return (
          <CustomerView 
            recentOrders={recentOrders}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
          />
        );
      case 'vendor':
        return (
          <VendorView 
            salesData={salesData}
            metricsData={metricsData}
          />
        );
      case 'admin':
        return (
          <AdminView 
            salesData={salesData}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Role-based Header */}
      <RoleBasedHeader />

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Marketplace Dropdown - Hidden for customers */}
          {userRole !== 'customer' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`${selectedMarketplaceData?.color} text-white px-6 py-3 rounded-xl flex items-center space-x-3 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
                >
                  {selectedMarketplaceData?.logo}
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-sm">{selectedMarketplaceData?.name}</span>
                    <span className="text-xs opacity-80">Active Platform</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-3 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 z-50 overflow-hidden">
                    {marketplaces.map((marketplace) => (
                      <button
                        key={marketplace.id}
                        onClick={() => {
                          setSelectedMarketplace(marketplace.id);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-4 px-6 py-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group"
                      >
                        <div className={`w-12 h-12 ${marketplace.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                          {marketplace.logo}
                        </div>
                        <div className="flex-1 text-left">
                          <span className="font-bold text-gray-900 block">{marketplace.name}</span>
                          <span className="text-sm text-gray-500">
                            {marketplace.id === 'all' ? 'All platforms combined' : 'E-commerce marketplace'}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Role-based Metrics */}
          {renderMainMetrics()}

          {/* Role-based Content */}
          {renderRoleBasedContent()}

          {/* Common Recent Orders Section (Admin & Vendor) */}
          <RecentOrdersSection 
            recentOrders={recentOrders}
            userRole={userRole}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
          />
        </div>
      </div>
    </div>
  );
};

export default MarketplaceDashboard;