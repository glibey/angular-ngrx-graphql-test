import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectPostItem,
  selectPosts,
  selectPostsLoading,
} from './store/post.selectors';
import { distinctUntilChanged, map } from 'rxjs';
import { loadPosts } from './store/post.actions';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  posts$ = this.store.select(selectPosts).pipe(
    distinctUntilChanged(),
    map((state) => ({
      items: state.data,
      totalCount: state.meta.totalCount,
    }))
  );

  postsLoading$ = this.store
    .select(selectPostsLoading)
    .pipe(distinctUntilChanged());

  selectPostItem$ = this.store
    .select(selectPostItem)
    .pipe(distinctUntilChanged());

  constructor(private store: Store) {}

  dispatchPosts(page?: number): void {
    this.store.dispatch(loadPosts({ page }));
  }
}
