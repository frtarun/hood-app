import React, { useState } from 'react';
import { Users, Lock, Globe, Plus, TrendingUp } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

export const Communities: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'joined' | 'discover'>('joined');
  const { isDark } = useThemeStore();

  const joinedCommunities = [
    {
      id: '1',
      name: 'Tech Talk',
      description: 'Anonymous discussions about technology, startups, and innovation',
      members: 1234,
      isPrivate: false,
      unreadCount: 5,
      trending: true
    },
    {
      id: '2',
      name: 'Career Insights',
      description: 'Share salary info, company culture, and job market insights',
      members: 5678,
      isPrivate: true,
      unreadCount: 2,
      trending: false
    },
    {
      id: '3',
      name: 'Life Advice',
      description: 'Anonymous support and advice for life\'s challenges',
      members: 3456,
      isPrivate: false,
      unreadCount: 0,
      trending: true
    }
  ];

  const discoverCommunities = [
    {
      id: '4',
      name: 'Crypto Anonymous',
      description: 'Share your wins and losses without judgment',
      members: 8901,
      isPrivate: false,
      trending: true
    },
    {
      id: '5',
      name: 'Relationship Vents',
      description: 'Anonymous relationship advice and support',
      members: 2345,
      isPrivate: false,
      trending: false
    },
    {
      id: '6',
      name: 'Work Drama',
      description: 'Office politics and workplace stories',
      members: 4567,
      isPrivate: true,
      trending: true
    }
  ];

  const CommunityCard = ({ community, isJoined = false }: { community: any; isJoined?: boolean }) => (
    <div className={`rounded-xl p-6 border transition-all duration-300 hover:shadow-lg ${
      isDark 
        ? 'bg-gray-800 border-gray-700 hover:shadow-gray-900/20' 
        : 'bg-white border-gray-200 hover:shadow-gray-200/50'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {community.name}
            </h3>
            {community.isPrivate && (
              <Lock className="w-4 h-4 text-amber-500" />
            )}
            {!community.isPrivate && (
              <Globe className="w-4 h-4 text-green-500" />
            )}
            {community.trending && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-red-100 dark:bg-red-900/30 rounded-full">
                <TrendingUp className="w-3 h-3 text-red-600 dark:text-red-400" />
                <span className="text-xs font-medium text-red-600 dark:text-red-400">Hot</span>
              </div>
            )}
          </div>
          
          <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {community.description}
          </p>
          
          <div className="flex items-center space-x-4 text-sm">
            <span className={`flex items-center space-x-1 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <Users className="w-4 h-4" />
              <span>{community.members.toLocaleString()} members</span>
            </span>
            
            {isJoined && community.unreadCount > 0 && (
              <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-xs font-medium">
                {community.unreadCount} new
              </span>
            )}
          </div>
        </div>
        
        <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          isJoined
            ? isDark
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            : 'bg-purple-600 text-white hover:bg-purple-700'
        }`}>
          {isJoined ? 'Joined' : 'Join'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            समुदाय 👥
          </h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            अपनी रुचियों को साझा करने वाले गुमनाम समूहों से जुड़ें
          </p>
        </div>
        
        <button className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>बनाएं</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        {[
          { key: 'joined', label: 'मेरे समुदाय' },
          { key: 'discover', label: 'खोजें' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === key
                ? 'bg-white dark:bg-gray-700 text-orange-600 dark:text-orange-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'joined' ? (
          <>
            {joinedCommunities.map((community) => (
              <CommunityCard key={community.id} community={community} isJoined />
            ))}
          </>
        ) : (
          <>
            {discoverCommunities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};