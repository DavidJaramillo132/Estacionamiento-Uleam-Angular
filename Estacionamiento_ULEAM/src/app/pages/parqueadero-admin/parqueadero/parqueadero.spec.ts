import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Parqueadero } from './parqueadero';

describe('Parqueadero', () => {
  let component: Parqueadero;
  let fixture: ComponentFixture<Parqueadero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Parqueadero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Parqueadero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
