import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInsumosComponent } from './modal-insumos.component';

describe('ModalInsumosComponent', () => {
  let component: ModalInsumosComponent;
  let fixture: ComponentFixture<ModalInsumosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInsumosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
