import React from 'react';
import { Settings, Shield, Bell, HelpCircle, LogOut, User, Activity, Trophy, Star, TrendingUp } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

export const Profile: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { isDark } = useThemeStore();

  const menuItems = [
    {
      icon: Activity,
      label: 'My Activity',
      description: 'View your posts and comments',
      action: () => {}
    },
    {
      icon: Trophy,
      label: 'Leaderboard',
      description: 'See top contributors this week',
      action: () => {}
    },
    {
      icon: Bell,
      label: 'Notifications',
      description: 'Manage notification settings',
      action: () => {}
    },
    {
      icon: Shield,
      label: 'Privacy & Safety',
      description: 'Control your privacy settings',
      action: () => {}
    },
    {
      icon: Settings,
      label: 'Account Settings',
      description: 'Update your account preferences',
      action: () => {}
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      description: 'Get help and contact support',
      action: () => {}
    }
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className={`rounded-xl p-8 text-center border ${
        isDark 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
          isDark ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <User className="w-10 h-10" />
        </div>
        
        <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {user?.pseudonym}
        </h2>
        
        <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          सदस्य बने • {new Date().toLocaleDateString()}
        </p>
        
        <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              42
            </div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              पोस्ट
            </div>
          </div>
          
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              89
            </div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              फॉलोअर्स
            </div>
          </div>
          
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              156
            </div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              फॉलोइंग
            </div>
          </div>
          
          <div className="text-center">
            <div className={`text-2xl font-bold text-orange-500`}>
              #23
            </div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              रैंक
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Stats */}
      <div className={`rounded-xl p-6 border ${
        isDark 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            इस सप्ताह की गतिविधि
          </h3>
          <div className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-medium">
            🔥 Hot Streak
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
            <Star className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              8
            </div>
            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              पोस्ट्स
            </div>
          </div>
          
          <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <TrendingUp className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              234
            </div>
            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              लाइक्स
            </div>
          </div>
        </div>
        
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          आप इस सप्ताह बहुत सक्रिय हैं! 🎉
        </p>
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={item.action}
              className={`w-full p-4 rounded-xl border text-left transition-all duration-200 hover:shadow-sm ${
                isDark 
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {item.label}
                  </h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className={`w-full p-4 rounded-xl border text-left transition-all duration-200 hover:shadow-sm ${
          isDark 
            ? 'bg-red-900/20 border-red-800 hover:bg-red-900/30' 
            : 'bg-red-50 border-red-200 hover:bg-red-100'
        }`}
      >
        <div className="flex items-center space-x-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isDark ? 'bg-red-900/40' : 'bg-red-100'
          }`}>
            <LogOut className="w-5 h-5 text-red-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-red-600">
              Sign Out
            </h4>
            <p className={`text-sm ${isDark ? 'text-red-400' : 'text-red-500'}`}>
              End your anonymous session
            </p>
          </div>
        </div>
      </button>
    </div>
  );
};