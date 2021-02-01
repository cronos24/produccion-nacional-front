import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroSolicitudComponent } from './maestro-solicitud.component';

describe('MaestroSolicitudComponent', () => {
  let component: MaestroSolicitudComponent;
  let fixture: ComponentFixture<MaestroSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaestroSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
