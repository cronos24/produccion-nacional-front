import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracteristicasTransformacionComponent } from './caracteristicas-transformacion.component';

describe('CaracteristicasTransformacionComponent', () => {
  let component: CaracteristicasTransformacionComponent;
  let fixture: ComponentFixture<CaracteristicasTransformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaracteristicasTransformacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaracteristicasTransformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
