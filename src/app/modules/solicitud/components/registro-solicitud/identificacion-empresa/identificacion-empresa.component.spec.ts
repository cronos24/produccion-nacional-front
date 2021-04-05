import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificacionEmpresaComponent } from './identificacion-empresa.component';

describe('IdentificacionEmpresaComponent', () => {
  let component: IdentificacionEmpresaComponent;
  let fixture: ComponentFixture<IdentificacionEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentificacionEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificacionEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
