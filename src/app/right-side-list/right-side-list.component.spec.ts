import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStateService } from '../app-state.service';
import { ErrorComponent } from '../error/error.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostsService } from '../posts.service';
import { RightSideListComponent } from './right-side-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('RightSideListComponent', () => {
  let component: RightSideListComponent;
  let fixture: ComponentFixture<RightSideListComponent>;
  let postsService: PostsService;
  let appStateService: AppStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RightSideListComponent, ErrorComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AppStateService, PostsService],
    }).compileComponents();

    fixture = TestBed.createComponent(RightSideListComponent);
    component = fixture.componentInstance;
    postsService = TestBed.inject(PostsService);
    appStateService = TestBed.inject(AppStateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call navigateToAddForm when add post button is clicked', () => {
    const navigateToAddFormSpy = spyOn(component, 'navigateToAddForm');
    const addButton = fixture.nativeElement.querySelector('.btn-primary');
    addButton.click();
    expect(navigateToAddFormSpy).toHaveBeenCalled();
  });

  it('should navigate to the edit post page when edit button is clicked', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');
    const postId = 1; // Replace with a valid post ID

    component.onItemClick(postId);

    expect(navigateSpy).toHaveBeenCalledWith(['/post/edit', postId]);
  });
});
