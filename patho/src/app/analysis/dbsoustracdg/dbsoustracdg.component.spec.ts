import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbsoustracdgComponent } from './dbsoustracdg.component';

describe('DbsoustracdgComponent', () => {
  let component: DbsoustracdgComponent;
  let fixture: ComponentFixture<DbsoustracdgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbsoustracdgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbsoustracdgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
