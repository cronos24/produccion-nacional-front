import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSolicutudComponent } from './listar-solicutud.component';

describe('ListarSolicutudComponent', () => {
  let component: ListarSolicutudComponent;
  let fixture: ComponentFixture<ListarSolicutudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSolicutudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSolicutudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
