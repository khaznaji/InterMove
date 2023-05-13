import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionUComponent } from './question.component';

describe('QuestionComponent', () => {
  let component: QuestionUComponent;
  let fixture: ComponentFixture<QuestionUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionUComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
