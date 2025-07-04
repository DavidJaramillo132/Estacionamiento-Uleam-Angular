import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParqueaderoNoAdmin } from './parqueadero-no-admin';

describe('ParqueaderoNoAdmin', () => {
  let component: ParqueaderoNoAdmin;
  let fixture: ComponentFixture<ParqueaderoNoAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParqueaderoNoAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParqueaderoNoAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
