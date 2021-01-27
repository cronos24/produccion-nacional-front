import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoProduccionComponent } from './proceso-produccion.component';

describe('ProcesoProduccionComponent', () => {
  let component: ProcesoProduccionComponent;
  let fixture: ComponentFixture<ProcesoProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesoProduccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesoProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
