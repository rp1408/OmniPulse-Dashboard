import React from 'react';
import { 
  ShoppingCart, 
  DollarSign, 
  Star, 
  Target, 
  Search, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  Truck, 
  AlertCircle, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';

const CustomerView = ({ 
  recentOrders, 
  getStatusColor, 
  getStatusIcon 
}) => {
  // Customer Order Tracking Component
  const CustomerOrderTracking = () => (
    <div className="bg-white rounded-3xl shadow-2xl border border-white/20 p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">My Orders</h3>
          <p className="text-gray-500">Track your recent orders</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {recentOrders.slice(0, 3).map((order) => (
          <div key={order.id} className="p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                  {order.marketplace.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-900">{order.id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)} flex items-center space-x-1`}>
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-700 mt-1">{order.product}</p>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-xs text-gray-500">{order.marketplace}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{order.time}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">₹{order.amount.toLocaleString()}</p>
                <button className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors">
                  Track Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

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
    <div className="space-y-6">
      {/* Customer Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CustomerOrderTracking />
        </div>
        <div className="space-y-6">
          {/* Customer Quick Actions */}
          <div className="bg-white rounded-3xl shadow-2xl border border-white/20 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200">
                <Search className="w-5 h-5" />
                <span>Browse Products</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200">
                <Star className="w-5 h-5" />
                <span>My Wishlist</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200">
                <MessageSquare className="w-5 h-5" />
                <span>Customer Support</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerView;