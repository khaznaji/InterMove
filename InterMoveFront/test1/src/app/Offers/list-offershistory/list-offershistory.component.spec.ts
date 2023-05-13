import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOffershistoryComponent } from './list-offershistory.component';

describe('ListOffershistoryComponent', () => {
  let component: ListOffershistoryComponent;
  let fixture: ComponentFixture<ListOffershistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOffershistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOffershistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
