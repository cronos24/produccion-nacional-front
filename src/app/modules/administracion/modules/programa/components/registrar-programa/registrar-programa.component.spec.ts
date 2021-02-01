import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarProgramaComponent } from './registrar-programa.component';

describe('RegistrarProgramaComponent', () => {
  let component: RegistrarProgramaComponent;
  let fixture: ComponentFixture<RegistrarProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarProgramaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
