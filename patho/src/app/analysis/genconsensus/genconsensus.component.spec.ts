import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenconsensusComponent } from './genconsensus.component';

describe('GenconsensusComponent', () => {
  let component: GenconsensusComponent;
  let fixture: ComponentFixture<GenconsensusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenconsensusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenconsensusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
