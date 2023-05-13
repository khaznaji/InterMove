import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOffersinteressComponent } from './list-offersinteress.component';

describe('ListOffersinteressComponent', () => {
  let component: ListOffersinteressComponent;
  let fixture: ComponentFixture<ListOffersinteressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOffersinteressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOffersinteressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
