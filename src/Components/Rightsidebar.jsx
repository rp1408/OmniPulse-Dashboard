import React from 'react';
import { 
  Users, 
  ChevronRight, 
  ChevronLeft,
  MessageCircle, 
  TrendingUp 
} from 'lucide-react';

export default function RightSidebar({ rightSidebarOpen, setRightSidebarOpen }) {
  const clients = [
    { name: 'Ramesh', status: 'active', avatar: 'JS', color: 'bg-blue-400' },
    { name: 'Suresh', status: 'pending', avatar: 'SW', color: 'bg-green-400' },
    { name: 'Chagan', status: 'active', avatar: 'MJ', color: 'bg-purple-400' },
    { name: 'Magan', status: 'active', avatar: 'ED', color: 'bg-pink-400' },
    { name: 'Jigo', status: 'pending', avatar: 'AB', color: 'bg-indigo-400' }
  ];

  return (
    <div className="relative">
      <div 
        className={`${rightSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden border-l border-gray-200`}
        style={{ backgroundColor: '#FFE4E6' }}
      >
        <div className="p-5 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" style={{ color: '#2D3748' }} />
              <span className="font-semibold text-sm" style={{ color: '#2D3748' }}>Client Management</span>
            </div>
            <button 
              onClick={() => setRightSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Client Activity Toggle - Soft Pastels Theme */}
          <div className="flex space-x-1.5 mb-5">
            <button 
              className="px-3 py-1.5 rounded-full text-xs font-medium text-white transition-colors"
              style={{ backgroundColor: '#2D3748' }}
            >
              Recent Activity
            </button>
            <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-white hover:bg-gray-50 transition-colors" style={{ color: '#2D3748' }}>
              Clients
            </button>
          </div>

          {/* Clients List - Soft Pastels Theme */}
          <div className="space-y-3 mb-6 flex-1">
            {clients.map((client, index) => (
              <div key={index} className="flex items-center justify-between group">
                <div className="flex items-center space-x-2.5">
                  <div className={`w-8 h-8 rounded-full ${client.color} flex items-center justify-center text-white text-xs font-semibold relative`}>
                    {client.avatar}
                    {client.status === 'active' && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-sm" style={{ color: '#2D3748' }}>{client.name}</div>
                    <div className={`text-xs ${client.status === 'active' ? 'text-green-600' : 'text-orange-600'}`}>
                      {client.status}
                    </div>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-100 rounded-lg transition-all">
                  <MessageCircle className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            ))}
          </div>

          {/* Performance Metrics - Soft Pastels Theme */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-1.5">
                <TrendingUp className="w-4 h-4" style={{ color: '#2D3748' }} />
                <span className="font-semibold text-sm" style={{ color: '#2D3748' }}>Performance</span>
              </div>
              <button className="text-xs font-medium hover:underline" style={{ color: '#2D3748' }}>
                View Details
              </button>
            </div>
            
            <div className="rounded-xl h-28 relative overflow-hidden" style={{ backgroundColor: '#E8F4FD' }}>
              {/* Performance indicators */}
              <div className="absolute top-3 left-3" style={{ color: '#2D3748' }}>
                <div className="text-xl font-bold">94%</div>
                <div className="text-xs opacity-80">Client Satisfaction</div>
              </div>
              <div className="absolute bottom-3 right-3" style={{ color: '#2D3748' }}>
                <div className="text-base font-bold">↗ +12%</div>
                <div className="text-xs opacity-80">This Month</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle button for right sidebar when closed */}
      {!rightSidebarOpen && (
        <button 
          onClick={() => setRightSidebarOpen(true)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2.5 rounded-full shadow-lg text-white z-50 hover:scale-110 transition-transform"
          style={{ backgroundColor: '#2D3748' }}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}