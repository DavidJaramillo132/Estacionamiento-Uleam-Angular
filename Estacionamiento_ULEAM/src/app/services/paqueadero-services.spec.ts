import { TestBed } from '@angular/core/testing';

import { PaqueaderoServices } from './paqueadero-services';

describe('PaqueaderoServices', () => {
  let service: PaqueaderoServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaqueaderoServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
