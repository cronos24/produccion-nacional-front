import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarAnexoComponent } from './eliminar-anexo.component';

describe('EliminarAnexoComponent', () => {
  let component: EliminarAnexoComponent;
  let fixture: ComponentFixture<EliminarAnexoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarAnexoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarAnexoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
