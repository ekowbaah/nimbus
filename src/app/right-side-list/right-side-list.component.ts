import { Observable, of, switchMap, tap } from 'rxjs';

import { AppStateService } from '../app-state.service';
import { Component } from '@angular/core';
import { Post } from '../app-state.model';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-right-side-list',
  templateUrl: './right-side-list.component.html',
  styleUrls: ['./right-side-list.component.scss'],
})
export class RightSideListComponent {
  items$ = this.getItems();

  constructor(
    private postsService: PostsService,
    private router: Router,
    private appState: AppStateService
  ) {}

  getItems(): Observable<Post[]> {
    return this.appState.state$.pipe(
      switchMap((state) => {
        if (state.posts.length === 0) {
          return this.postsService.getPosts().pipe(
            tap((posts) => {
              this.appState.setPosts(posts);
            })
          );
        }
        return of(state.posts);
      })
    );
  }
  onItemClick(postId: number): void {
    this.router.navigate(['/post/edit', postId]);
  }

  navigateToAddForm(): void {
    this.router.navigate(['/post/new']);
  }

  deletePost(postId: number): void {
    this.postsService.deletePost(postId).subscribe(() => {
      this.appState.deletePost(postId);
    });
  }
}
