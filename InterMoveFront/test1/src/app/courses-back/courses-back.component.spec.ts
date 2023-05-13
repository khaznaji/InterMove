import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesBackComponent } from './courses-back.component';

describe('CoursesBackComponent', () => {
  let component: CoursesBackComponent;
  let fixture: ComponentFixture<CoursesBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
