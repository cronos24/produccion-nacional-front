import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPreSolicitudComponent } from './formulario-pre-solicitud.component';

describe('FormularioPreSolicitudComponent', () => {
  let component: FormularioPreSolicitudComponent;
  let fixture: ComponentFixture<FormularioPreSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioPreSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioPreSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
