import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterAdministracionComponent } from './footer-administracion.component';

describe('FooterAdministracionComponent', () => {
  let component: FooterAdministracionComponent;
  let fixture: ComponentFixture<FooterAdministracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterAdministracionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterAdministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
