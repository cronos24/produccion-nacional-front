import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaLecturaCuidadosaComponent } from './alerta-lectura-cuidadosa.component';

describe('AlertaLecturaCuidadosaComponent', () => {
  let component: AlertaLecturaCuidadosaComponent;
  let fixture: ComponentFixture<AlertaLecturaCuidadosaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertaLecturaCuidadosaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertaLecturaCuidadosaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
