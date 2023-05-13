import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontHouseDetailsComponent } from './front-house-details.component';

describe('FrontHouseDetailsComponent', () => {
  let component: FrontHouseDetailsComponent;
  let fixture: ComponentFixture<FrontHouseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontHouseDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontHouseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
