import { createReducer, on } from '@ngrx/store';
import { Post, PostsResponse, Posts } from './post.model';
import * as PostsActions from './post.actions';

export const POST_FEATURE_KEY = 'post';

export interface State {
  posts: {
    query?: any;
    items: PostsResponse;
    loading: boolean;
    error: string | null;
  };
  postItem: {
    loading: boolean;
    error: string | null;
    create?: boolean;
    update?: boolean;
    remove?: boolean;
  };
}

export const initialState: State = {
  posts: {
    items: { data: [], meta: { totalCount: 0 } },
    loading: false,
    error: null,
    query: {
      page: 1,
      limit: 10,
    },
  },
  postItem: {
    loading: false,
    error: null,
    create: false,
    update: false,
    remove: false,
  },
};

export const postReducer = createReducer<State>(
  initialState,
  // Load All Posts START
  on(PostsActions.loadPosts, (state: State) => ({
    ...state,
    posts: {
      ...state.posts,
      loading: true,
      query: state.posts.query,
    },
  })),

  on(PostsActions.loadPostsSuccess, (state: State, { posts }) => ({
    ...state,
    posts: {
      ...state.posts,
      loading: false,
      items: { ...posts },
    },
  })),
  on(PostsActions.loadPostsFailure, (state: State, { error }) => ({
    ...state,
    posts: {
      ...state.posts,
      loading: false,
      error,
    },
  })),
  // Load All Posts END

  // Create Post START
  on(PostsActions.createPost, (state: State) => ({
    ...state,
    postItem: {
      ...state.postItem,
      loading: true,
    },
  })),
  on(PostsActions.createPostSuccess, (state: State, { createPost }) => ({
    ...state,
    posts: {
      ...state.posts,
      items: {
        data: [...state.posts.items.data, createPost],
        meta: {
          totalCount: state.posts.items.meta.totalCount + 1,
        },
      },
    },
    postItem: {
      ...state.postItem,
      create: true,
      loading: false,
    },
  })),
  on(PostsActions.createPostFailure, (state: State, { error }) => ({
    ...state,
    postItem: {
      create: false,
      loading: false,
      error,
    },
  })),
  // Create Post END

  // Update Post START
  on(PostsActions.updatePost, (state: State) => ({
    ...state,
    postItem: {
      ...state.postItem,
      loading: true,
    },
  })),
  on(PostsActions.updatePostSuccess, (state: State, { updatePost }) => ({
    ...state,
    posts: {
      ...state.posts,
      items: {
        data: state.posts.items.data.map((post) =>
          post.id === updatePost.id ? updatePost : post
        ),
        meta: {
          totalCount: state.posts.items.meta.totalCount,
        },
      },
    },
    postItem: {
      ...state.postItem,
      update: true,
      loading: false,
    },
  })),
  on(PostsActions.updatePostFailure, (state: State, { error }) => ({
    ...state,
    postItem: {
      update: false,
      loading: false,
      error,
    },
  })),
  // Update Post END

  // Remove Post START
  on(PostsActions.deletePost, (state: State) => ({
    ...state,
    postItem: {
      ...state.postItem,
      loading: true,
    },
  })),
  on(PostsActions.deletePostSuccess, (state: State, { deletePost }) => ({
    ...state,
    postItem: {
      ...state.postItem,
      remove: true,
      loading: false,
    },
  })),
  on(PostsActions.deletePostFailure, (state: State, { error }) => ({
    ...state,
    postItem: {
      remove: false,
      loading: false,
      error,
    },
  }))
  // Remove Post END
);
