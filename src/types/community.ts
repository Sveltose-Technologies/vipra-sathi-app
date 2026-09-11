export type PostType = 'question' | 'knowledge' | 'suggestion';

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  verified?: boolean;
}

export interface Comment {
  id: string;
  author: Author;
  content: string;
  createdAt: string; // ISO date string
  likes: number;
}

export interface Post {
  id: string;
  type: PostType;
  title: string;
  content: string;
  author: Author;
  createdAt: string; // ISO date string
  likes: number;
  comments: Comment[];
  tags?: string[];
}
