import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicacionesProductoComponent } from './aplicaciones-producto.component';

describe('AplicacionesProductoComponent', () => {
  let component: AplicacionesProductoComponent;
  let fixture: ComponentFixture<AplicacionesProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AplicacionesProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AplicacionesProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
