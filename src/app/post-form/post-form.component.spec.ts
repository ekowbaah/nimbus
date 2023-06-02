import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppStateService } from '../app-state.service';
import { ErrorComponent } from '../error/error.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostFormComponent } from './post-form.component';
import { PostsService } from '../posts.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;
  let postsService: PostsService;
  let appStateService: AppStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostFormComponent, ErrorComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
    postsService = TestBed.inject(PostsService);
    appStateService = TestBed.inject(AppStateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load post for add mode', () => {
    spyOn(component, 'loadPost').and.callThrough();
    spyOn(component.route.params, 'pipe').and.returnValue(of({})); // Simulating the absence of ID in params
    component.ngOnInit();

    expect(component.loadPost).toHaveBeenCalled();
    expect(component.mode).toBe('Add');
    expect(component.postId).toBeNull();
    expect(component.postForm.value.title).toBeNull();
    expect(component.postForm.value.body).toBeNull();
  });

  it('should create a post', () => {
    spyOn(postsService, 'createPost').and.returnValue(
      of({ id: 1, title: 'Test Title', body: 'Test Body' }) // Simulating the response of createPost
    );
    spyOn(appStateService, 'addPost');
    spyOn(component.router, 'navigate');
    component.mode = 'Add';
    component.postForm.setValue({ title: 'Test Title', body: 'Test Body' });
    component.onSubmit(component.postForm.value);

    expect(postsService.createPost).toHaveBeenCalledWith({
      title: 'Test Title',
      body: 'Test Body',
    });
    expect(appStateService.addPost).toHaveBeenCalledWith({
      id: 1,
      title: 'Test Title',
      body: 'Test Body',
    });
    expect(component.router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should update a post', () => {
    spyOn(postsService, 'updatePost').and.returnValue(
      of({ id: 1, title: 'Test Title Updated', body: 'Test Body Updated' }) // Simulating the response of updatePost
    );
    spyOn(appStateService, 'updatePost');
    spyOn(component.router, 'navigate');
    component.mode = 'Edit';
    component.postId = 1;
    component.postForm.setValue({
      title: 'Test Title Updated',
      body: 'Test Body Updated',
    });
    component.onSubmit(component.postForm.value);

    expect(postsService.updatePost).toHaveBeenCalledWith({
      id: 1,
      title: 'Test Title Updated',
      body: 'Test Body Updated',
    });
    expect(appStateService.updatePost).toHaveBeenCalledWith({
      id: 1,
      title: 'Test Title Updated',
      body: 'Test Body Updated',
    });
    expect(component.router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should not update a post if postId is null', () => {
    spyOn(postsService, 'updatePost');
    spyOn(appStateService, 'updatePost');
    spyOn(component.router, 'navigate');
    component.mode = 'Edit';
    component.postId = null;
    component.postForm.setValue({
      title: 'Test Title Updated',
      body: 'Test Body Updated',
    });
    component.onSubmit(component.postForm.value);

    expect(postsService.updatePost).not.toHaveBeenCalled();
    expect(appStateService.updatePost).not.toHaveBeenCalled();
    expect(component.router.navigate).not.toHaveBeenCalled();
  });
});
