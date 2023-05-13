import { TestBed } from '@angular/core/testing';

import { RouteActiveService } from './route-active.service';

describe('RouteActiveService', () => {
  let service: RouteActiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteActiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
