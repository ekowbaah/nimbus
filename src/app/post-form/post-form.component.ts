import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CreatePost, Post } from '../app-state.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of, switchMap } from 'rxjs';

import { AppStateService } from '../app-state.service';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFormComponent implements OnInit {
  mode: 'Add' | 'Edit' = 'Add';
  postId: number | null = null;
  postForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    body: new FormControl(null, [Validators.required]),
  });

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private postsService: PostsService,
    private appState: AppStateService
  ) {}

  ngOnInit(): void {
    this.loadPost();
  }

  loadPost(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          if (params['id']) {
            this.mode = 'Edit';
            this.postId = parseInt(params['id'], 10);
            return this.postsService.getPost(this.postId);
          } else {
            this.mode = 'Add';
            return of(null);
          }
        })
      )
      .subscribe((post) => {
        if (post) {
          this.postForm.patchValue(post);
        }
      });
  }

  onSubmit(post: CreatePost): void {
    if (this.mode === 'Add') {
      this.createPost(post);
    } else if (this.mode === 'Edit') {
      if (!this.postId) {
        return;
      }
      this.updatePost({ ...post, id: this.postId });
    }
  }

  createPost(post: CreatePost): void {
    this.postsService.createPost(post).subscribe((newPost) => {
      this.appState.addPost(newPost);
      this.router.navigate(['/']);
    });
  }

  updatePost(post: Post): void {
    this.postsService.updatePost(post).subscribe((updatedPost) => {
      console.log(updatedPost, 'updatedPost');
      this.appState.updatePost(updatedPost);
      this.router.navigate(['/']);
    });
  }
}
