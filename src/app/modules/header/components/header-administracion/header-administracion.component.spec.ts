import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAdministracionComponent } from './header-administracion.component';

describe('HeaderAdministracionComponent', () => {
  let component: HeaderAdministracionComponent;
  let fixture: ComponentFixture<HeaderAdministracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderAdministracionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAdministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
