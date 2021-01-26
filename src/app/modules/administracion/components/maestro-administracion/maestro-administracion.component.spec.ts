import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroAdministracionComponent } from './maestro-administracion.component';

describe('MaestroAdministracionComponent', () => {
  let component: MaestroAdministracionComponent;
  let fixture: ComponentFixture<MaestroAdministracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaestroAdministracionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroAdministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
