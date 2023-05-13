import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidacyDetailComponent } from './candidacy-detail.component';

describe('CandidacyDetailComponent', () => {
  let component: CandidacyDetailComponent;
  let fixture: ComponentFixture<CandidacyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidacyDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidacyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
