import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracteristicasTecnicasComponent } from './caracteristicas-tecnicas.component';

describe('CaracteristicasTecnicasComponent', () => {
  let component: CaracteristicasTecnicasComponent;
  let fixture: ComponentFixture<CaracteristicasTecnicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaracteristicasTecnicasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaracteristicasTecnicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
