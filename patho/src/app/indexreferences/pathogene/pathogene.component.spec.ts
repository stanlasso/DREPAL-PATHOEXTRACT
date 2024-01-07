import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathogeneComponent } from './pathogene.component';

describe('PathogeneComponent', () => {
  let component: PathogeneComponent;
  let fixture: ComponentFixture<PathogeneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PathogeneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PathogeneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
