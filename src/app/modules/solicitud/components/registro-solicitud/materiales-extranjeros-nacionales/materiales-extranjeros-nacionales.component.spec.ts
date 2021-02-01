import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialesExtranjerosNacionalesComponent } from './materiales-extranjeros-nacionales.component';

describe('MaterialesExtranjerosNacionalesComponent', () => {
  let component: MaterialesExtranjerosNacionalesComponent;
  let fixture: ComponentFixture<MaterialesExtranjerosNacionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialesExtranjerosNacionalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialesExtranjerosNacionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
