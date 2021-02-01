import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostosValorFabricaComponent } from './costos-valor-fabrica.component';

describe('CostosValorFabricaComponent', () => {
  let component: CostosValorFabricaComponent;
  let fixture: ComponentFixture<CostosValorFabricaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostosValorFabricaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostosValorFabricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
