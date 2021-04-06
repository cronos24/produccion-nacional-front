import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnexarArchivoComponent } from './anexar-archivo.component';

describe('AnexarArchivoComponent', () => {
  let component: AnexarArchivoComponent;
  let fixture: ComponentFixture<AnexarArchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnexarArchivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnexarArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
