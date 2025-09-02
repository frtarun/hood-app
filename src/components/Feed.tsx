import React, { useState } from 'react';
import { PostCard } from './PostCard';
import { useFeedStore } from '../store/feedStore';

export const Feed: React.FC = () => {
  const { posts } = useFeedStore();
  const [filter, setFilter] = useState<'all' | 'trending' | 'following'>('all');

  const filteredPosts = posts.filter(post => {
    if (filter === 'trending') return post.likes > 10;
    if (filter === 'following') return post.isFollowing;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        {[
          { key: 'all', label: 'सभी पोस्ट्स' },
          { key: 'trending', label: 'ट्रेंडिंग 🔥' },
          { key: 'following', label: 'फॉलोइंग' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key as any)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              filter === key
                ? 'bg-white dark:bg-gray-700 text-orange-600 dark:text-orange-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-gray-400 text-2xl">📝</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            अभी तक कोई पोस्ट नहीं
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            गुमनाम रूप से कुछ साझा करने वाले पहले व्यक्ति बनें! 🎉
          </p>
        </div>
      )}
    </div>
  );
};