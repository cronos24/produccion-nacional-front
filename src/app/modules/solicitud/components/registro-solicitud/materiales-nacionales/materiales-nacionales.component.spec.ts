import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialesNacionalesComponent } from './materiales-nacionales.component';

describe('MaterialesNacionalesComponent', () => {
  let component: MaterialesNacionalesComponent;
  let fixture: ComponentFixture<MaterialesNacionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialesNacionalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialesNacionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
