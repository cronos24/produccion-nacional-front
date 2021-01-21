import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriosRegistroComponent } from './criterios-registro.component';

describe('CriteriosRegistroComponent', () => {
  let component: CriteriosRegistroComponent;
  let fixture: ComponentFixture<CriteriosRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriosRegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriosRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
