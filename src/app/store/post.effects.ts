import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as PostActions from './post.actions';
import { GraphQLService } from '../graphql.service';
import { Post, PostsResponse } from './post.model';

@Injectable()
export class PostEffects {
  constructor(
    private actions$: Actions,
    private graphqlService: GraphQLService
  ) {}

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadPosts),
      switchMap(({ page }) =>
        this.graphqlService.getPosts(page).pipe(
          map((response) =>
            PostActions.loadPostsSuccess(
              response.data as { posts: PostsResponse }
            )
          ),
          catchError((error) => of(PostActions.loadPostsFailure({ error })))
        )
      )
    )
  );

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.createPost),
      switchMap(({ input }) =>
        this.graphqlService.createPost(input.title, input.body)
      ),
      map((post) =>
        PostActions.createPostSuccess(post.data as { createPost: Post })
      ),
      catchError((error) => of(PostActions.createPostFailure({ error })))
    )
  );

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.updatePost),
      switchMap(({ id, input }) => this.graphqlService.updatePost(id, input)),
      map((post) =>
        PostActions.updatePostSuccess(post.data as { updatePost: Post })
      ),
      catchError((error) => of(PostActions.updatePostFailure({ error })))
    )
  );

  removePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.deletePost),
      switchMap(({ id }) => this.graphqlService.deletePost(id)),
      map((post) =>
        PostActions.deletePostSuccess(post.data as { deletePost: boolean })
      ),
      catchError((error) => of(PostActions.deletePostFailure({ error })))
    )
  );
}
