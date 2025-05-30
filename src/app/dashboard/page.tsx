"use client";
import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Calendar, 
  MessageCircle, 
  TrendingUp, 
  Book, 
  Users, 
  Settings, 
  Bell,
  Sun,
  Moon,
  CloudRain,
  Smile,
  Meh,
  Frown,
  Activity,
  Clock,
  Target,
  Award
} from 'lucide-react';

const Dashboard = () => {
  const [currentMood, setCurrentMood] = useState('neutral');
  const [darkMode, setDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const moodData = [
    { day: 'Mon', mood: 4 },
    { day: 'Tue', mood: 3 },
    { day: 'Wed', mood: 5 },
    { day: 'Thu', mood: 2 },
    { day: 'Fri', mood: 4 },
    { day: 'Sat', mood: 5 },
    { day: 'Sun', mood: 4 }
  ];

  const getMoodIcon = (mood: 'happy' | 'neutral' | 'sad') => {
    switch(mood) {
      case 'happy': return <Smile className="text-green-500" size={24} />;
      case 'sad': return <Frown className="text-red-500" size={24} />;
      default: return <Meh className="text-yellow-500" size={24} />;
    }
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-teal-50 to-green-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-md border-green-100'} border-b sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-teal-600">Vayana</h1>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Your AI Companion</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <Bell className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} cursor-pointer hover:text-teal-500 transition-colors`} size={20} />
              <Settings className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} cursor-pointer hover:text-teal-500 transition-colors`} size={20} />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            {getGreeting()}, Alex! 👋
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            How are you feeling today? Let's check in with your emotional wellness.
          </p>
        </div>

        {/* Quick Mood Check */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-green-100'} rounded-2xl border p-6 mb-8 shadow-lg`}>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Heart className="text-red-500 mr-2" size={24} />
            Quick Mood Check
          </h3>
          <div className="flex space-x-4 mb-4">
            {(['happy', 'neutral', 'sad'] as ('happy' | 'neutral' | 'sad')[]).map((mood) => (
              <button
                key={mood}
                onClick={() => setCurrentMood(mood)}
                className={`p-4 rounded-xl transition-all transform hover:scale-105 ${
                  currentMood === mood 
                    ? 'bg-teal-500 text-white shadow-lg' 
                    : darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {getMoodIcon(mood)}
              </button>
            ))}
          </div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Current mood: <span className="capitalize font-medium">{currentMood}</span>
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Mood Trend */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-green-100'} rounded-2xl border p-6 shadow-lg`}>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <TrendingUp className="text-blue-500 mr-2" size={24} />
                Weekly Mood Trend
              </h3>
              <div className="flex items-end space-x-4 h-32">
                {moodData.map((day, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div 
                      className="bg-gradient-to-t from-teal-500 to-green-400 rounded-t-lg w-8 transition-all duration-300 hover:opacity-80"
                      style={{ height: `${day.mood * 20}%` }}
                    ></div>
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{day.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Sessions */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-green-100'} rounded-2xl border p-6 shadow-lg`}>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <MessageCircle className="text-purple-500 mr-2" size={24} />
                Recent Sessions
              </h3>
              <div className="space-y-4">
                {[
                  { type: 'Chat Session', time: '2 hours ago', duration: '25 min' },
                  { type: 'Voice Chat Session', time: 'Yesterday', duration: '18 min' }
                ].map((session, index) => (
                  <div key={index} className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} hover:shadow-md transition-all`}>
                    <div>
                      <h4 className="font-medium">{session.type}</h4>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{session.time} • {session.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Wellness Score */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-green-100'} rounded-2xl border p-6 shadow-lg`}>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Award className="text-yellow-500 mr-2" size={24} />
                Wellness Score
              </h3>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className={darkMode ? 'text-gray-700' : 'text-gray-200'}
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${75 * 2.51} 251`}
                      className="transition-all duration-300"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#14b8a6" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-teal-600">75</span>
                  </div>
                </div>
              </div>
              <p className={`text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Great progress! Keep up the good work.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section - Insights */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-green-100'} rounded-2xl border p-6 mt-8 shadow-lg`}>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Activity className="text-teal-500 mr-2" size={24} />
            Weekly Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-2">7</div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Consecutive days of check-ins</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">4.2</div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Average mood rating</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Chat sessions this month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;