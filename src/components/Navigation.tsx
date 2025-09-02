import React from 'react';
import { Home, Users, Megaphone, User, Trophy } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

interface NavigationProps {
  currentView: 'feed' | 'communities' | 'whistle' | 'leaderboard' | 'profile';
  onViewChange: (view: 'feed' | 'communities' | 'whistle' | 'leaderboard' | 'profile') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const { isDark } = useThemeStore();

  const navItems = [
    { id: 'feed' as const, icon: Home, label: 'होम' },
    { id: 'communities' as const, icon: Users, label: 'ग्रुप्स' },
    { id: 'whistle' as const, icon: Megaphone, label: 'Whistle' },
    { id: 'leaderboard' as const, icon: Trophy, label: 'रैंक' },
    { id: 'profile' as const, icon: User, label: 'प्रोफाइल' },
  ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 backdrop-blur-lg transition-colors duration-300 border-t ${
      isDark 
        ? 'bg-gray-900/90 border-gray-700' 
        : 'bg-white/90 border-gray-200'
    }`}>
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-around">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onViewChange(id)}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
              currentView === id
                ? 'text-orange-500 bg-orange-50 dark:bg-orange-900/30'
                : isDark
                ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium whitespace-nowrap">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};