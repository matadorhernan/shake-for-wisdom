import { TestBed } from '@angular/core/testing';

import { WisdomService } from './wisdom.service';

describe('WisdomService', () => {
  let service: WisdomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WisdomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
