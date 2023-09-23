import { Injectable } from '@angular/core';
import { selectPostItem } from '../store/post.selectors';
import { distinctUntilChanged } from 'rxjs';
import { Store } from '@ngrx/store';
import { deletePost, updatePost } from '../store/post.actions';
import { UpdatePost } from '../store/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private store: Store) {}

  dispatchUpdatePost(payload: UpdatePost): void {
    this.store.dispatch(updatePost(payload));
  }

  dispatchRemovePost(payload: { id: number }): void {
    this.store.dispatch(deletePost(payload));
  }
}
