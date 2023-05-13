import { Component, OnInit } from '@angular/core';
import { House } from 'src/app/accomodation/models/house.model';
import { HousesService } from 'src/app/accomodation/services/houses.service';

@Component({
  selector: 'app-houses-list',
  templateUrl: './houses-list.component.html',
  styleUrls: ['./houses-list.component.css']
})
export class HousesListComponent implements OnInit {

  houses?: House[];
  currentHouse: House = {};
  currentIndex = -1;
  name = '';
  searchString = '';

  constructor(private HouseService: HousesService) { }

  ngOnInit(): void {
    this.retrieveAgencies();
  }

  retrieveAgencies(): void {
    this.HouseService.getAll()
      .subscribe({
        next: (data) => {
          this.houses = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveAgencies();
    this.currentHouse = {};
    this.currentIndex = -1;
  }

  setActiveHouse(house: House, index: number): void {
    this.currentHouse = house;
    this.currentIndex = index;
  }

  removeAllHouses(): void {
    this.HouseService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentHouse = {};
    this.currentIndex = -1;

    this.HouseService.findByTitle(this.name)
      .subscribe({
        next: (data) => {
          this.houses = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
