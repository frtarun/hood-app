export interface User {
  id: string;
  pseudonym: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
}

export interface Post {
  id: string;
  content: string;
  author: User;
  community: string;
  tags?: string[];
  likes: number;
  isLiked: boolean;
  isFollowing: boolean;
  createdAt: Date;
  comments?: Comment[];
}