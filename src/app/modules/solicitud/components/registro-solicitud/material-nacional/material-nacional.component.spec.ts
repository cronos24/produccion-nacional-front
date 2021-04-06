import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialNacionalComponent } from './material-nacional.component';

describe('MaterialesExtranjerosComponent', () => {
  let component: MaterialNacionalComponent;
  let fixture: ComponentFixture<MaterialNacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaterialNacionalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialNacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
