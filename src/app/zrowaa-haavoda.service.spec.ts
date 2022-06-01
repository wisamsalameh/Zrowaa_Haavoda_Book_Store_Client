import { TestBed } from '@angular/core/testing';

import { ZrowaaHaavodaService } from './zrowaa-haavoda.service';

describe('ZrowaaHaavodaService', () => {
  let service: ZrowaaHaavodaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZrowaaHaavodaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
