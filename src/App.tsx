import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Feed } from './components/Feed';
import { CreatePost } from './components/CreatePost';
import { Communities } from './components/Communities';
import { Whistle } from './components/Whistle';
import { Leaderboard } from './components/Leaderboard';
import { Profile } from './components/Profile';
import { AuthModal } from './components/AuthModal';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';

function App() {
  const [currentView, setCurrentView] = useState<'feed' | 'communities' | 'whistle' | 'leaderboard' | 'profile'>('feed');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const { isDark } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  if (!isAuthenticated) {
    return <AuthModal />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'communities':
        return <Communities />;
      case 'whistle':
        return <Whistle />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return <Profile />;
      default:
        return <Feed />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <Header onCreatePost={() => setShowCreatePost(true)} />
      
      <main className="max-w-4xl mx-auto px-4 pt-20 pb-24">
        {renderCurrentView()}
      </main>

      <Navigation 
        currentView={currentView} 
        onViewChange={setCurrentView} 
      />

      {showCreatePost && (
        <CreatePost onClose={() => setShowCreatePost(false)} />
      )}
    </div>
  );
}

export default App;