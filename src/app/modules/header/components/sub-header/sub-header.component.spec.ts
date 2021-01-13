import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHeaderComponent } from './sub-header.component';

describe('SubHeaderComponent', (): void => {
  let component: SubHeaderComponent;
  let fixture: ComponentFixture<SubHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubHeaderComponent]
    })
      .compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(SubHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
