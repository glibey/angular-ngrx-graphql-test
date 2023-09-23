// src/app/store/post.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, POST_FEATURE_KEY } from './post.reducer';

// Get the feature state for posts
export const selectPostState = createFeatureSelector<State>(POST_FEATURE_KEY);

export const selectPostQuery = createSelector(
  selectPostState,
  (state) => state.posts.query
);

// Get the list of posts
export const selectPosts = createSelector(
  selectPostState,
  (state) => state.posts.items
);

// Get the loading state
export const selectPostsLoading = createSelector(
  selectPostState,
  (state) => state.posts.loading
);

// Get the error state
export const selectPostsError = createSelector(
  selectPostState,
  (state) => state.posts.error
);

export const selectPostItem = createSelector(
  selectPostState,
  (state) => state.postItem
);

export const selectPostItemLoading = createSelector(
  selectPostState,
  (state) => state.postItem.loading
);
