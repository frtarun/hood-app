import React from 'react';
import { User, Settings, Bell, Moon, Sun } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

interface HeaderProps {
  onCreatePost: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCreatePost }) => {
  const { user } = useAuthStore();
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg transition-colors duration-300 border-b ${
      isDark 
        ? 'bg-gray-900/80 border-gray-700' 
        : 'bg-white/80 border-gray-200'
    }`}>
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">🎭</span>
          </div>
          <div>
            <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              गुमनाम 🇮🇳
            </h1>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              गुमनाम सामाजिक नेटवर्क
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${
              isDark 
                ? 'text-gray-300 hover:bg-gray-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button className={`p-2 rounded-full transition-colors ${
            isDark 
              ? 'text-gray-300 hover:bg-gray-700' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}>
            <Bell className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isDark ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              <User className="w-4 h-4" />
            </div>
            <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {user?.pseudonym}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};