import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidacyAddComponent } from './candidacy-add.component';

describe('CandidacyAddComponent', () => {
  let component: CandidacyAddComponent;
  let fixture: ComponentFixture<CandidacyAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidacyAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidacyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
