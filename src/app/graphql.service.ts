import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { Post } from './store/post.model';

@Injectable({
  providedIn: 'root',
})
export class GraphQLService {
  constructor(private apollo: Apollo) {}

  getPosts(page?: number) {
    return this.apollo.watchQuery({
      query: gql`
        query ($options: PageQueryOptions) {
          posts(options: $options) {
            data {
              id
              title
            }
            meta {
              totalCount
            }
          }
        }
      `,
      variables: {
        options: {
          paginate: {
            page: page ?? 1,
            limit: 9,
          },
        },
      },
    }).valueChanges;
  }
  createPost(title: string, body: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation createPost($title: String!, $body: String!) {
          createPost(input: { title: $title, body: $body }) {
            id
            title
            body
          }
        }
      `,
      variables: { title, body },
    });
  }

  updatePost(id: number, input: { body: string }) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($id: ID!, $input: UpdatePostInput!) {
          updatePost(id: $id, input: $input) {
            id
            body
          }
        }
      `,
      variables: { id, input },
    });
  }

  deletePost(id: number) {
    return this.apollo.mutate({
      mutation: gql`
        mutation deletePost($id: ID!) {
          deletePost(id: $id)
        }
      `,
      variables: { id },
    });
  }
}
