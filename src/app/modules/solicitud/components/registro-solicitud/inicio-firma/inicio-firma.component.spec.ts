import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioFirmaComponent } from './inicio-firma.component';

describe('InicioFirmaComponent', () => {
  let component: InicioFirmaComponent;
  let fixture: ComponentFixture<InicioFirmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioFirmaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioFirmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
