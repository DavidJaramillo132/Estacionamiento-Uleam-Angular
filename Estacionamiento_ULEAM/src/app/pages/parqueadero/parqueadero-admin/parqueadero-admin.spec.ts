import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParqueaderoAdmin } from './parqueadero-admin';

describe('ParqueaderoAdmin', () => {
  let component: ParqueaderoAdmin;
  let fixture: ComponentFixture<ParqueaderoAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParqueaderoAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParqueaderoAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
