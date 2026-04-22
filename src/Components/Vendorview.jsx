import React from 'react';
import { 
  Package, 
  Plus, 
  Download, 
  CheckCircle, 
  Clock, 
  Edit, 
  Eye, 
  BarChart3, 
  MessageSquare 
} from 'lucide-react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const VendorView = ({ salesData, metricsData }) => {
  const MetricCard = ({ title, value, icon: Icon, change, color, subtitle }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <div className={`p-2 rounded-xl ${color} shadow-lg transform hover:scale-110 transition-transform duration-200`}>
              <Icon size={20} className="text-white" />
            </div>
            <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">{title}</p>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-400 mb-2">{subtitle}</p>
          )}
          {change !== undefined && (
            <div className={`flex items-center space-x-1 ${change > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {change > 0 ? <span>↗</span> : <span>↘</span>}
              <span className="text-sm font-bold">{Math.abs(change)}%</span>
              <span className="text-xs text-gray-400">vs last month</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Vendor Product Management */}
      <div className="bg-white rounded-3xl shadow-2xl border border-white/20 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">My Products</h3>
            <p className="text-gray-500">Manage your product listings</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Bulk Upload</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
            <div className="flex items-center justify-between">
              <Package className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">245</span>
            </div>
            <p className="text-sm font-medium text-gray-700 mt-2">Total Products</p>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
            <div className="flex items-center justify-between">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">198</span>
            </div>
            <p className="text-sm font-medium text-gray-700 mt-2">Active Products</p>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl">
            <div className="flex items-center justify-between">
              <Clock className="w-8 h-8 text-yellow-600" />
              <span className="text-2xl font-bold text-gray-900">8</span>
            </div>
            <p className="text-sm font-medium text-gray-700 mt-2">Pending Approval</p>
          </div>
        </div>
        
        {/* Sample Product List */}
        <div className="space-y-4">
          {[
            { name: 'Samsung Galaxy Buds Pro', price: '₹12,599', stock: 45, status: 'Active', sales: 234 },
            { name: 'Nike Air Max Shoes', price: '₹8,999', stock: 23, status: 'Active', sales: 156 },
            { name: 'Levi\'s Denim Jacket', price: '₹6,499', stock: 12, status: 'Low Stock', sales: 89 }
          ].map((product, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">{product.name}</h4>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                    <span>Price: <span className="font-medium">{product.price}</span></span>
                    <span>Stock: <span className={`font-medium ${product.stock < 20 ? 'text-red-600' : 'text-green-600'}`}>{product.stock}</span></span>
                    <span>Sales: <span className="font-medium">{product.sales}</span></span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {product.status}
                  </span>
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Vendor Sales Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-2xl border border-white/20 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">My Sales Performance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" tickFormatter={(value) => `₹${value/100000}L`} />
              <Tooltip 
                formatter={(value, Name) => [`₹${value.toLocaleString()}`, 'My Sales']} 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: 'none',
                  borderRadius: '12px'
                }}
              />
              <Line type="monotone" dataKey="amazon" stroke="#FF9500" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white rounded-3xl shadow-2xl border border-white/20 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200">
              <Plus className="w-5 h-5" />
              <span>Add New Product</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200">
              <Package className="w-5 h-5" />
              <span>Manage Inventory</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200">
              <BarChart3 className="w-5 h-5" />
              <span>View Analytics</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200">
              <MessageSquare className="w-5 h-5" />
              <span>Customer Messages</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorView;