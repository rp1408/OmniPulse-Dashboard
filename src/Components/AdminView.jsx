import React from 'react';
import { 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin, 
  Star, 
  Users, 
  Package, 
  BarChart3, 
  Settings, 
  ChevronDown 
} from 'lucide-react';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AdminView = ({ 
  salesData, 
  getStatusColor, 
  getStatusIcon 
}) => {
  // Vendor data with contact info
  const vendorsData = [
    {
      id: 1,
      name: 'Fashion Hub Store',
      email: 'contact@fashionhub.com',
      phone: '+91 98765 43210',
      address: 'Mumbai, Maharashtra',
      rating: 4.8,
      products: 245,
      sales: '₹12.5L',
      status: 'Active',
      joinDate: '2023-01-15',
      category: 'Fashion & Clothing'
    },
    {
      id: 2,
      name: 'Tech World Electronics',
      email: 'sales@techworld.com',
      phone: '+91 87654 32109',
      address: 'Bangalore, Karnataka',
      rating: 4.6,
      products: 189,
      sales: '₹18.2L',
      status: 'Active',
      joinDate: '2022-11-20',
      category: 'Electronics'
    },
    {
      id: 3,
      name: 'Home Decor Paradise',
      email: 'info@homedecor.com',
      phone: '+91 76543 21098',
      address: 'Delhi, Delhi',
      rating: 4.4,
      products: 156,
      sales: '₹8.9L',
      status: 'Pending',
      joinDate: '2024-02-10',
      category: 'Home & Garden'
    }
  ];

  // Vendor Management Component
  const VendorManagement = () => (
    <div className="bg-white rounded-3xl shadow-2xl border border-white/20 p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Vendor Management</h3>
          <p className="text-gray-500">Manage and monitor all vendors</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Vendor</span>
        </button>
      </div>
      
      <div className="space-y-4">
        {vendorsData.map((vendor) => (
          <div key={vendor.id} className="p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                  {vendor.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-gray-900">{vendor.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(vendor.status)} flex items-center space-x-1`}>
                      {getStatusIcon(vendor.status)}
                      <span>{vendor.status}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Mail className="w-3 h-3" />
                      <span>{vendor.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="w-3 h-3" />
                      <span>{vendor.phone}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{vendor.address}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-sm">
                    <span className="text-gray-600">Category: <span className="font-medium">{vendor.category}</span></span>
                    <span className="text-gray-600">Products: <span className="font-medium">{vendor.products}</span></span>
                    <span className="text-gray-600">Sales: <span className="font-medium">{vendor.sales}</span></span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="font-medium">{vendor.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <VendorManagement />
      
      {/* Admin Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-2xl border border-white/20 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Revenue Analytics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" tickFormatter={(value) => `₹${value/100000}L`} />
              <Tooltip 
                formatter={(value, name) => [`₹${value.toLocaleString()}`, 'Total Sales']} 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area type="monotone" dataKey="total" stroke="#3B82F6" fill="url(#totalGradient)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white rounded-3xl shadow-2xl border border-white/20 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">System Management</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-200">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">Manage Users</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl hover:from-green-100 hover:to-green-200 transition-all duration-200">
              <div className="flex items-center space-x-3">
                <Package className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-900">Product Approval</span>
              </div>
              <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">12 Pending</div>
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all duration-200">
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-gray-900">Analytics Reports</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl hover:from-red-100 hover:to-red-200 transition-all duration-200">
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-red-600" />
                <span className="font-medium text-gray-900">System Settings</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminView;