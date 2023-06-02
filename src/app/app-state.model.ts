export type State = {
  posts: Post[];
  error: string | null;
};

export type Post = {
  id: number;
  title: string;
  body: string;
};

export type CreatePost = Omit<Post, 'id'>;
