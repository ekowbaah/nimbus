import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostsService } from './posts.service';
import { TestBed } from '@angular/core/testing';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
