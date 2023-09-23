import { CreatePost } from './../store/post.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createPost } from '../store/post.actions';
import { selectPostItem, selectPostItemLoading } from '../store/post.selectors';
import { distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreatePostService {
  postItemLoading$ = this.store
    .select(selectPostItemLoading)
    .pipe(distinctUntilChanged());
  selectPostItem$ = this.store
    .select(selectPostItem)
    .pipe(distinctUntilChanged());

  constructor(private store: Store) {}

  dispatchCreatePost(payload: CreatePost): void {
    this.store.dispatch(createPost(payload));
  }
}
