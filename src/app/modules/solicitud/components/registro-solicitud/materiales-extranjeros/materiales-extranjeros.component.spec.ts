import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialesExtranjerosComponent } from './materiales-extranjeros.component';

describe('MaterialesExtranjerosComponent', () => {
  let component: MaterialesExtranjerosComponent;
  let fixture: ComponentFixture<MaterialesExtranjerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialesExtranjerosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialesExtranjerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
