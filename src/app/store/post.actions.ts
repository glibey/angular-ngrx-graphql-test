import { createAction, props } from '@ngrx/store';
import { CreatePost, Post, PostsResponse, UpdatePost } from './post.model';

export const loadPosts = createAction(
  '[Posts] Load Posts',
  props<{ page?: number }>()
);

export const loadPostsSuccess = createAction(
  '[Posts] Load Posts Success',
  props<{ posts: PostsResponse }>()
);
export const loadPostsFailure = createAction(
  '[Posts] Load Posts Failure',
  props<{ error: any }>()
);
export const createPost = createAction(
  '[Posts] Create Post',
  props<CreatePost>()
);
export const createPostSuccess = createAction(
  '[Posts] Create Post Success',
  props<{ createPost: Post }>()
);
export const createPostFailure = createAction(
  '[Posts] Create Post Failure',
  props<{ error: any }>()
);
export const updatePost = createAction(
  '[Posts] Update Post',
  props<UpdatePost>()
);
export const updatePostSuccess = createAction(
  '[Posts] Update Post Success',
  props<{ updatePost: Post }>()
);
export const updatePostFailure = createAction(
  '[Posts] Update Post Failure',
  props<{ error: any }>()
);
export const deletePost = createAction(
  '[Posts] Delete Post',
  props<{ id: number }>()
);
export const deletePostSuccess = createAction(
  '[Posts] Delete Post Success',
  props<{ deletePost: boolean }>()
);
export const deletePostFailure = createAction(
  '[Posts] Delete Post Failure',
  props<{ error: any }>()
);
