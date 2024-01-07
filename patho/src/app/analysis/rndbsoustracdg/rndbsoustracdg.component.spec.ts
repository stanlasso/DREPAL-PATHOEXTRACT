import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RndbsoustracdgComponent } from './rndbsoustracdg.component';

describe('RndbsoustracdgComponent', () => {
  let component: RndbsoustracdgComponent;
  let fixture: ComponentFixture<RndbsoustracdgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RndbsoustracdgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RndbsoustracdgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
