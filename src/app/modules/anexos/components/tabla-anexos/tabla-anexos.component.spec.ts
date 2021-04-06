import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAnexosComponent } from './tabla-anexos.component';

describe('TablaAnexosComponent', () => {
  let component: TablaAnexosComponent;
  let fixture: ComponentFixture<TablaAnexosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaAnexosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaAnexosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
