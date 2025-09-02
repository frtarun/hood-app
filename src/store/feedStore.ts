import { create } from 'zustand';
import { Post, Comment } from '../types/post';
import { generatePseudonym } from '../utils/pseudonymGenerator';

interface FeedState {
  posts: Post[];
  addPost: (postData: { content: string; tags?: string[]; community: string }) => void;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
}

// Mock initial posts
const initialPosts: Post[] = [
  {
    id: '1',
    content: 'अभी-अभी सीनियर डेवलपर बना हूं लेकिन इंपोस्टर सिंड्रोम बहुत परेशान कर रहा है। क्या किसी और को भी लगता है कि वे सिर्फ अंदाजे से काम कर रहे हैं? 😅',
    author: {
      id: '2',
      pseudonym: 'चुपचापCoder42'
    },
    community: 'करियर',
    tags: ['करियर', 'इंपोस्टर-सिंड्रोम', 'डेवलपमेंट'],
    likes: 23,
    isLiked: false,
    isFollowing: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    comments: [
      {
        id: '1',
        content: 'बिल्कुल समझ सकता हूं! 5 साल हो गए और अभी भी रोज बेसिक चीजें गूगल करता हूं। आपने यह प्रमोशन कमाया है! 🎉',
        author: { id: '3', pseudonym: 'समझदारOwl88' },
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
      }
    ]
  },
  {
    id: '2',
    content: 'सावधान: कंपनी "वर्क-लाइफ बैलेंस" का दावा करती है लेकिन 60+ घंटे काम की उम्मीद करती है। अब नई नौकरी की तलाश शुरू! 😤',
    author: {
      id: '4',
      pseudonym: 'सच्चाईTeller99'
    },
    community: 'Whistle',
    tags: ['वर्क-लाइफ-बैलेंस', 'टॉक्सिक-वर्कप्लेस'],
    likes: 45,
    isLiked: true,
    isFollowing: false,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    comments: []
  },
  {
    id: '3',
    content: 'याद रखें: हर दिन प्रोडक्टिव न होना ठीक है। कभी-कभी आराम ही आपके मानसिक स्वास्थ्य के लिए सबसे अच्छी चीज है। 🧘‍♀️',
    author: {
      id: '5',
      pseudonym: 'ध्यानी_Sage'
    },
    community: 'जीवन',
    tags: ['मानसिक-स्वास्थ्य', 'सेल्फ-केयर', 'प्रोडक्टिविटी'],
    likes: 67,
    isLiked: false,
    isFollowing: true,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    comments: [
      {
        id: '2',
        content: 'बिल्कुल सही! बर्नआउट असली है और आराम आलस्य नहीं है। याद दिलाने के लिए धन्यवाद ❤️',
        author: { id: '6', pseudonym: 'ठीकहोरहाWorkaholic' },
        createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000)
      },
      {
        id: '3',
        content: 'आज यह सुनने की जरूरत थी। बिना अपराधबोध के शाम की छुट्टी ले रहा हूं।',
        author: { id: '7', pseudonym: 'व्यस्तBee123' },
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000)
      }
    ]
  }
];

export const useFeedStore = create<FeedState>((set, get) => ({
  posts: initialPosts,
  
  addPost: (postData) => {
    const newPost: Post = {
      id: Date.now().toString(),
      content: postData.content,
      author: {
        id: '1',
        pseudonym: 'Anonymous' // This would be the current user's pseudonym
      },
      community: postData.community,
      tags: postData.tags || [],
      likes: 0,
      isLiked: false,
      isFollowing: false,
      createdAt: new Date(),
      comments: []
    };
    
    set((state) => ({
      posts: [newPost, ...state.posts]
    }));
  },
  
  toggleLike: (postId) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    }));
  },
  
  addComment: (postId, content) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      content,
      author: {
        id: '1',
        pseudonym: generatePseudonym()
      },
      createdAt: new Date()
    };
    
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...(post.comments || []), newComment]
            }
          : post
      )
    }));
  }
}));