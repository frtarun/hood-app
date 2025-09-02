import React, { useState } from 'react';
import { X, Hash, Users } from 'lucide-react';
import { useFeedStore } from '../store/feedStore';
import { useThemeStore } from '../store/themeStore';

interface CreatePostProps {
  onClose: () => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onClose }) => {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [community, setCommunity] = useState('General');
  const { addPost } = useFeedStore();
  const { isDark } = useThemeStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      const tagArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);
      addPost({
        content: content.trim(),
        tags: tagArray,
        community
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={`w-full max-w-lg rounded-2xl shadow-2xl ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            गुमनाम पोस्ट बनाएं 📝
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${
              isDark 
                ? 'text-gray-400 hover:bg-gray-700' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Community Selection */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <Users className="w-4 h-4 inline mr-2" />
              समुदाय
            </label>
            <select
              value={community}
              onChange={(e) => setCommunity(e.target.value)}
              className={`w-full p-3 rounded-lg border transition-colors ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
            >
              <option value="General">सामान्य चर्चा</option>
              <option value="Tech">तकनीक 💻</option>
              <option value="Career">करियर सलाह 💼</option>
              <option value="Life">जीवन सलाह 🌱</option>
              <option value="Bollywood">बॉलीवुड 🎬</option>
              <option value="Cricket">क्रिकेट 🏏</option>
              <option value="Food">खाना 🍛</option>
            </select>
          </div>

          {/* Content */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              आपके मन में क्या है?
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              placeholder="अपने विचार गुमनाम रूप से साझा करें..."
              className={`w-full p-4 rounded-lg border resize-none transition-colors ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
              required
            />
            <p className={`text-xs mt-2 ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`}>
              {content.length}/500 अक्षर
            </p>
          </div>

          {/* Tags */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <Hash className="w-4 h-4 inline mr-2" />
              टैग्स (वैकल्पिक)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="करियर, सलाह, सवाल (कॉमा से अलग करें)"
              className={`w-full p-3 rounded-lg border transition-colors ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!content.trim()}
            className="w-full py-3 px-6 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            गुमनाम पोस्ट करें 🚀
          </button>
        </form>
      </div>
    </div>
  );
};