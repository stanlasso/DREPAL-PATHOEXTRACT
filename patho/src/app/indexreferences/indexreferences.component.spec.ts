import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexreferencesComponent } from './indexreferences.component';

describe('IndexreferencesComponent', () => {
  let component: IndexreferencesComponent;
  let fixture: ComponentFixture<IndexreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexreferencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
