export interface Post {
  id: number;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
}

export interface CreatePostInput {
  title: string;
  content: string;
  tags?: string[];
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
