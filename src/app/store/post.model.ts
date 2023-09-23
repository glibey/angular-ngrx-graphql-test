export interface Post {
  id: string;
  title: string;
  body?: string;
}

export interface PostsResponse {
  data: Post[];
  meta: {
    totalCount: number;
  };
}

export interface Posts {
  data: Post[];
  totalCount: number;
}

export interface CreatePost {
  input: {
    title: string;
    body: string;
  };
}

export interface UpdatePost {
  id: number;
  input: {
    body: string;
  };
}
