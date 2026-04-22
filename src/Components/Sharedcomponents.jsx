import React from 'react';
import { 
  RefreshCw, 
  Download, 
  CheckCircle, 
  Clock, 
  Truck, 
  AlertCircle 
} from 'lucide-react';

// Shared MetricCard Component
export const MetricCard = ({ title, value, icon: Icon, change, color, subtitle, adminOnly = false, vendorOnly = false, userRole }) => {
  if (adminOnly && userRole !== 'admin') return null;
  if (vendorOnly && userRole !== 'vendor') return null;
  
  return (
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
};

// Recent Orders Component (for Admin & Vendor)
export const RecentOrdersSection = ({ recentOrders, userRole, getStatusColor, getStatusIcon }) => {
  if (userRole === 'customer') return null;
  
  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-white/20 p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {userRole === 'admin' ? 'All Recent Orders' : 'My Recent Orders'}
          </h3>
          <p className="text-gray-500">Latest transactions</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
            <RefreshCw size={18} />
          </button>
          <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
            <Download size={18} />
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {recentOrders.map((order, index) => (
          <div
            key={order.id}
            className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
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
                  <span className="text-xs text-gray-500">{order.customer}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{order.location}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-gray-900">₹{order.amount.toLocaleString()}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-gray-500">{order.marketplace}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">{order.time}</span>
              </div>
              {userRole === 'admin' && (
                <div className="flex space-x-2 mt-2">
                  <button className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg hover:bg-blue-200 transition-colors">
                    View
                  </button>
                  <button className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-lg hover:bg-green-200 transition-colors">
                    Update
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};