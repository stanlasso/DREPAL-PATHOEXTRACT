import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngdatareadComponent } from './mngdataread.component';

describe('MngdatareadComponent', () => {
  let component: MngdatareadComponent;
  let fixture: ComponentFixture<MngdatareadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MngdatareadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MngdatareadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
