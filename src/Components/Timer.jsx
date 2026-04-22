import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Filter, Share, MoreHorizontal } from 'lucide-react';

// Social Media Icons Components
const TwitterIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#1DA1F2">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="url(#instagram-gradient)">
    <defs>
      <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#405DE6" />
        <stop offset="25%" stopColor="#5851DB" />
        <stop offset="50%" stopColor="#833AB4" />
        <stop offset="75%" stopColor="#C13584" />
        <stop offset="100%" stopColor="#E1306C" />
      </linearGradient>
    </defs>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const Timer = () => {
  const [SelectedSources, SetSelectedSources] = useState({ all: true, source1: true, source2: false });
  const [SelectedMessageTypes, SetSelectedMessageTypes] = useState({ all: true, type1: true, type2: true });
  const [SelectedTags, SetSelectedTags] = useState({ all: true });

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Calendar data for February 2023
  const calendarData = {
    1: { twitter: 2, instagram: 1 },
    2: { twitter: 2 },
    6: { twitter: 4, instagram: 2, facebook: 1, tag: 'Spring Promo' },
    7: { twitter: 3, instagram: 1, tag: 'Spring Promo' },
    8: { twitter: 4, facebook: 1, instagram: 2, tag: 'Spring Promo' },
    9: { twitter: 2, instagram: 2, tag: 'Spring Promo' },
    10: { twitter: 3, facebook: 1, tag: 'Spring Promo' },
    11: { twitter: 1, facebook: 1, tag: 'Spring Promo' },
    12: { twitter: 2, instagram: 2 },
    13: { twitter: 4, instagram: 4 },
    14: { twitter: 3, instagram: 2 },
    15: { twitter: 2, instagram: 2 },
    16: { twitter: 3, instagram: 2 },
    17: { twitter: 2, facebook: 1 },
    18: { twitter: 4, instagram: 2 },
    19: {},
    20: {},
    21: {},
    22: {},
    23: {},
    24: {},
    25: {}
  };

  const campaigns = [
    
  ];

  const renderCalendarDay = (day, dayIndex) => {
    const data = calendarData[day] || {};
    const campaign = campaigns.find(c => c.days.includes(day));
    
    return (
      <div 
        key={day || dayIndex} 
        className={`min-h-24 border border-gray-200 p-2 ${campaign ? campaign.color : 'bg-white'}`}
      >
        <div className="font-medium text-sm mb-1">{day}</div>
        
        {/* Weekly Update */}
        {[1, 8, 15, 22].includes(day) && (
          <div className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded mb-1">
            Weekly Update
          </div>
        )}
        
        {/* Social Media Posts */}
        <div className="space-y-1">
          {data.twitter && (
            <div className="flex items-center text-xs">
              <TwitterIcon className="w-3 h-3 mr-1" />
              <span>{data.twitter}</span>
            </div>
          )}
          {data.instagram && (
            <div className="flex items-center text-xs">
              <InstagramIcon className="w-3 h-3 mr-1" />
              <span>{data.instagram}</span>
            </div>
          )}
          {data.facebook && (
            <div className="flex items-center text-xs">
              <FacebookIcon className="w-3 h-3 mr-1" />
              <span>{data.facebook}</span>
            </div>
          )}
        </div>
        
        {/* Tags */}
        {data.tag && (
          <div className="mt-1">
            <span className="bg-purple-200 text-purple-800 text-xs px-1 py-0.5 rounded">
              {data.tag}
            </span>
          </div>
        )}
      </div>
    );
  };

  const getDaysInMonth = () => {
    const days = [];
    const firstDay = new Date(2023, 1, 1).getDay(); // February 2023
    const daysInMonth = new Date(2023, 2, 0).getDate();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <ChevronLeft className="w-5 h-5 cursor-pointer" />
              <span className="text-sm text-gray-600">Today</span>
              <ChevronRight className="w-5 h-5 cursor-pointer" />
            </div>
            <h1 className="text-xl font-semibold">February 2023</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex bg-gray-100 rounded">
              <button className="px-3 py-1 text-sm">📋</button>
              <button className="px-3 py-1 text-sm">📅</button>
            </div>
            <button className="px-3 py-1 text-sm border rounded">List</button>
            <button className="px-3 py-1 text-sm border rounded">Week</button>
            <button className="px-3 py-1 text-sm bg-gray-800 text-white rounded">Month</button>
            <button className="px-3 py-1 text-sm border rounded flex items-center">
              <MoreHorizontal className="w-4 h-4" />
            </button>
            <button className="px-3 py-1 text-sm border rounded flex items-center">
              <Share className="w-4 h-4 mr-1" />
              Share
            </button>
            <button className="px-3 py-1 text-sm border rounded flex items-center">
              <Filter className="w-4 h-4 mr-1" />
              Filters
            </button>
          </div>
        </div>
        
        {/* Filter Row */}
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center">
            <span className="mr-2">Sources:</span>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-red-400 rounded-full"></span>
              <span>0</span>
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>1</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="mr-2">Message Types:</span>
            <div className="flex items-center space-x-2">
              <FacebookIcon className="w-3 h-3" />
              <span>1</span>
              <InstagramIcon className="w-3 h-3" />
              <span>2</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="mr-2">Tags:</span>
            <span className="text-gray-600">Tags, All</span>
          </div>
          
          <button className="text-blue-600 text-sm">Reset filters</button>
        </div>
      </div>

      {/* Campaign Bars */}
      <div className="p-4 space-y-1">
        {campaigns.map((campaign, index) => (
          <div key={index} className={`${campaign.color} px-3 py-1 rounded text-sm flex justify-between items-center`}>
            <span className="font-medium">{campaign.name}</span>
            <span className="text-xs text-gray-600">{campaign.dates}</span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Days of week header */}
        <div className="grid grid-cols-7 mb-2">
          {daysOfWeek.map(day => (
            <div key={day} className="font-medium text-sm text-gray-600 p-2 text-center">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-0 border border-gray-200">
          {getDaysInMonth().map((day, index) => renderCalendarDay(day, index))}
        </div>
      </div>
    </div>
  );
};

export default Timer;

