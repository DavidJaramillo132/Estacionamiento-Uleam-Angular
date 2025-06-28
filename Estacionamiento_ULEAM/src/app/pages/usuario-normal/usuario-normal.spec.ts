import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioNormal } from './usuario-normal';

describe('UsuarioNormal', () => {
  let component: UsuarioNormal;
  let fixture: ComponentFixture<UsuarioNormal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioNormal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioNormal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
