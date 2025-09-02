import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Flag, UserPlus, UserCheck } from 'lucide-react';
import { formatTimeAgo } from '../utils/dateUtils';
import { Post } from '../types/post';
import { useFeedStore } from '../store/feedStore';
import { useThemeStore } from '../store/themeStore';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [isFollowing, setIsFollowing] = useState(post.isFollowing);
  const { toggleLike, addComment } = useFeedStore();
  const { isDark } = useThemeStore();

  const handleLike = () => {
    toggleLike(post.id);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      addComment(post.id, newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div className={`rounded-xl p-6 transition-all duration-300 hover:shadow-lg border ${
      isDark 
        ? 'bg-gray-800 border-gray-700 hover:shadow-gray-900/20' 
        : 'bg-white border-gray-200 hover:shadow-gray-200/50'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isDark ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <span className="text-sm font-medium">
              {post.author.pseudonym.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {post.author.pseudonym}
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {formatTimeAgo(post.createdAt)} • {post.community} • 🇮🇳
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleFollow}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 flex items-center space-x-1 ${
              isFollowing
                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/50'
            }`}
          >
            {isFollowing ? (
              <>
                <UserCheck className="w-3 h-3" />
                <span>फॉलो किया</span>
              </>
            ) : (
              <>
                <UserPlus className="w-3 h-3" />
                <span>फॉलो करें</span>
              </>
            )}
          </button>
          
          <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`p-2 rounded-full transition-colors ${
              isDark 
                ? 'text-gray-400 hover:bg-gray-700' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {showMenu && (
            <div className={`absolute right-0 mt-1 w-48 rounded-lg shadow-lg border z-10 ${
              isDark 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <button className={`w-full px-4 py-2 text-left text-sm flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <Flag className="w-4 h-4" />
                <span>रिपोर्ट करें</span>
              </button>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className={`text-base leading-relaxed ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
          {post.content}
        </p>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 transition-all duration-200 ${
              post.isLiked
                ? 'text-red-500 hover:text-red-600'
                : isDark
                ? 'text-gray-400 hover:text-red-400'
                : 'text-gray-500 hover:text-red-500'
            }`}
          >
            <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{post.likes}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className={`flex items-center space-x-2 transition-colors ${
              isDark 
                ? 'text-gray-400 hover:text-blue-400' 
                : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">{post.comments?.length || 0} टिप्पणी</span>
          </button>

          <button className={`flex items-center space-x-2 transition-colors ${
            isDark 
              ? 'text-gray-400 hover:text-green-400' 
              : 'text-gray-500 hover:text-green-500'
          }`}>
            <Share2 className="w-5 h-5" />
            <span className="text-sm font-medium">शेयर</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className={`border-t pt-4 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          {/* Add Comment */}
          <form onSubmit={handleComment} className="mb-4">
            <div className="flex space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isDark ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <span className="text-xs font-medium">You</span>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="गुमनाम टिप्पणी जोड़ें..."
                  className={`w-full p-3 rounded-lg border transition-colors ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-400' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                  } focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
                />
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-3">
            {post.comments?.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <span className="text-xs font-medium">
                    {comment.author.pseudonym.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <div className={`p-3 rounded-lg ${
                    isDark ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <p className={`text-sm font-medium mb-1 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {comment.author.pseudonym}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {comment.content}
                    </p>
                  </div>
                  <p className={`text-xs mt-1 ml-3 ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {formatTimeAgo(comment.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};