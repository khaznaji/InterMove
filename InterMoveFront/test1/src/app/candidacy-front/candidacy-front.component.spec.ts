import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidacyFrontComponent } from './candidacy-front.component';

describe('CandidacyFrontComponent', () => {
  let component: CandidacyFrontComponent;
  let fixture: ComponentFixture<CandidacyFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidacyFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidacyFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
