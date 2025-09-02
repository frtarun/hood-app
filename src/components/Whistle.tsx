import React, { useState } from 'react';
import { Megaphone, Building, DollarSign, AlertTriangle, TrendingUp } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

export const Whistle: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'salary' | 'culture' | 'layoffs' | 'hiring'>('all');
  const { isDark } = useThemeStore();

  const whistleblowPosts = [
    {
      id: '1',
      company: 'TechCorp Inc.',
      category: 'salary',
      title: 'Senior Developer Salary Reality Check',
      content: 'They advertised $120k-140k but offered me $95k. After negotiation, got $115k. Benefits are decent but not amazing.',
      anonymous: true,
      upvotes: 45,
      comments: 12,
      verified: true,
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      company: 'StartupXYZ',
      category: 'culture',
      title: 'Toxic Management Alert',
      content: 'CEO publicly humiliated an employee in all-hands meeting. Several people have quit this month. HR does nothing.',
      anonymous: true,
      upvotes: 78,
      comments: 23,
      verified: false,
      timestamp: '5 hours ago'
    },
    {
      id: '3',
      company: 'MegaCorp',
      category: 'layoffs',
      title: 'Stealth Layoffs Coming',
      content: 'Heard from leadership meeting that 15% workforce reduction planned for Q1 2024. They\'re calling it "optimization".',
      anonymous: true,
      upvotes: 156,
      comments: 45,
      verified: true,
      timestamp: '1 day ago'
    },
    {
      id: '4',
      company: 'GrowthCo',
      category: 'hiring',
      title: 'They\'re Hiring But...',
      content: 'Posted 20 job openings but only planning to fill 5. Using fake postings to show "growth" to investors.',
      anonymous: true,
      upvotes: 34,
      comments: 8,
      verified: false,
      timestamp: '3 days ago'
    }
  ];

  const categories = [
    { key: 'all', label: 'All Posts', icon: Megaphone },
    { key: 'salary', label: 'Salaries', icon: DollarSign },
    { key: 'culture', label: 'Culture', icon: Building },
    { key: 'layoffs', label: 'Layoffs', icon: AlertTriangle },
    { key: 'hiring', label: 'Hiring', icon: TrendingUp },
  ];

  const filteredPosts = activeCategory === 'all' 
    ? whistleblowPosts 
    : whistleblowPosts.filter(post => post.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Megaphone className="w-8 h-8 text-white" />
        </div>
        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          व्हिसल 📢
        </h1>
        <p className={`text-sm max-w-md mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          गुमनाम कार्यक्षेत्र की जानकारी, वेतन पारदर्शिता, और कंपनी संस्कृति रिपोर्ट
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {categories.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key as any)}
            className={`p-3 rounded-lg flex flex-col items-center space-y-2 transition-all duration-200 ${
              activeCategory === key
                ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-2 border-red-200 dark:border-red-800'
                : isDark
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-2 border-transparent'
                : 'bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className={`rounded-xl p-6 border transition-all duration-300 hover:shadow-lg ${
            isDark 
              ? 'bg-gray-800 border-gray-700 hover:shadow-gray-900/20' 
              : 'bg-white border-gray-200 hover:shadow-gray-200/50'
          }`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {post.company}
                  </h3>
                  {post.verified && (
                    <div className="flex items-center space-x-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        Verified Employee
                      </span>
                    </div>
                  )}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    post.category === 'salary' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                    post.category === 'culture' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' :
                    post.category === 'layoffs' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                    'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  }`}>
                    {post.category}
                  </span>
                </div>
                <h4 className={`text-lg font-semibold mb-2 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                  {post.title}
                </h4>
              </div>
            </div>

            {/* Content */}
            <p className={`text-base mb-4 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {post.content}
            </p>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button className={`flex items-center space-x-2 transition-colors ${
                  isDark 
                    ? 'text-gray-400 hover:text-red-400' 
                    : 'text-gray-500 hover:text-red-500'
                }`}>
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">{post.upvotes}</span>
                </button>
                
                <button className={`flex items-center space-x-2 transition-colors ${
                  isDark 
                    ? 'text-gray-400 hover:text-blue-400' 
                    : 'text-gray-500 hover:text-blue-500'
                }`}>
                  <Megaphone className="w-4 h-4" />
                  <span className="text-sm font-medium">{post.comments} responses</span>
                </button>
              </div>
              
              <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {post.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Create Whistle Button */}
      <div className="fixed bottom-20 right-4">
        <button className="w-14 h-14 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-105">
          <Megaphone className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};