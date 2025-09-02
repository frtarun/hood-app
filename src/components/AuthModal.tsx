import React, { useState } from 'react';
import { Eye, EyeOff, Smartphone } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { generatePseudonym } from '../utils/pseudonymGenerator';

export const AuthModal: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const pseudonym = generatePseudonym();
      login({
        id: '1',
        email,
        pseudonym,
        trustScore: 85,
        joinedAt: new Date(),
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎭</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">गुमनाम में आपका स्वागत है</h1>
          <p className="text-orange-200">आपका गुमनाम सामाजिक स्थान 🇮🇳</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </h2>
            <p className="text-gray-600">
              {isSignUp 
                ? 'गुमनाम समुदाय में शामिल हों' 
                : 'अपनी गुमनाम यात्रा जारी रखें'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ईमेल पता
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                पासवर्ड
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Smartphone className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <h4 className="text-sm font-medium text-orange-900">
                      आपकी गुमनाम पहचान
                    </h4>
                    <p className="text-sm text-orange-700 mt-1">
                      हम आपके लिए एक अनोखा छद्म नाम बनाएंगे ताकि आप पूर्ण गुमनामी बनाए रख सकें।
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{isSignUp ? 'खाता बनाया जा रहा है...' : 'साइन इन हो रहे हैं...'}</span>
                </div>
              ) : (
                isSignUp ? 'खाता बनाएं' : 'साइन इन करें'
              )}
            </button>
          </form>

          {/* Switch Mode */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              {isSignUp 
                ? 'पहले से खाता है? साइन इन करें' 
                : "खाता नहीं है? साइन अप करें"
              }
            </button>
          </div>

          {/* Privacy Notice */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              आपकी गोपनीयता हमारी प्राथमिकता है। हम कभी भी आपकी पहचान साझा नहीं करते।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};