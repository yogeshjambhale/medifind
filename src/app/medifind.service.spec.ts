import { TestBed } from '@angular/core/testing';

import { MedifindService } from './medifind.service';

describe('MedifindService', () => {
  let service: MedifindService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedifindService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
