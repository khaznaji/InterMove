import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontHousesListComponent } from './front-houses-list.component';

describe('FrontComponent', () => {
  let component: FrontHousesListComponent;
  let fixture: ComponentFixture<FrontHousesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontHousesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontHousesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
