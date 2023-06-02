import { BehaviorSubject, Observable } from 'rxjs';
import { Post, State } from './app-state.model';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private initialState: State = {
    posts: [],
    error: null,
  };

  private stateSubject: BehaviorSubject<State> = new BehaviorSubject<State>(
    this.initialState
  );
  state$: Observable<State> = this.stateSubject.asObservable();

  setPosts(posts: Post[]): void {
    this.stateSubject.next({ ...this.stateSubject.getValue(), posts });
  }

  addPost(post: Post): void {
    const currentState = this.stateSubject.getValue();
    this.stateSubject.next({
      ...currentState,
      posts: [...currentState.posts, post],
    });
  }

  updatePost(post: Post): void {
    const currentState = this.stateSubject.getValue();
    const updatedPosts = currentState.posts.map((p) =>
      p.id === post.id ? post : p
    );
    this.stateSubject.next({ ...currentState, posts: updatedPosts });
  }

  deletePost(postId: number): void {
    const currentState = this.stateSubject.getValue();
    const updatedPosts = currentState.posts.filter((p) => p.id !== postId);
    this.stateSubject.next({ ...currentState, posts: updatedPosts });
  }

  setError(error: string | null): void {
    this.stateSubject.next({ ...this.stateSubject.getValue(), error });
  }
}
