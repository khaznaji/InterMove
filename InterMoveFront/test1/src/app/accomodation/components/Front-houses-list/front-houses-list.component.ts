import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { House, HouseType2LabelMapping, TypeHouses } from 'src/app/accomodation/models/house.model';
import { HousesService } from 'src/app/accomodation/services/houses.service';

interface Country {
  shortName: string;
  name: string;
}

@Component({
  selector: 'app-front',
  templateUrl: './front-houses-list.component.html',
  styleUrls: ['./front-houses-list.component.css']
})
export class FrontHousesListComponent implements OnInit {

  public HouseType2LabelMapping = HouseType2LabelMapping;
  public Types = Object.values(TypeHouses);

  countries: Country[];
  
  //Search
  Keyword='';

  aparts;
  villas;
  rooms;
  nbraparts;
  nbrvillas;
  nbrrooms;
  nbrprop;


  house: House = {
    title: '',
    type_houses: undefined,
    country: '',
    region: '',
    adress: '',
    loyer: 0,
    available: true,
    nbrOfRooms: 0,
    agency: ''
  };
  houses?: House[];
  selectedType:TypeHouses;
  image:any;
  constructor(private httpClient: HttpClient,private HouseService: HousesService) {
    this.countries = this.HouseService.getCountries();
   }

  ngOnInit(): void {
    this.retrieveHouses();
  
  }


  retrieveHouses(): void {
    this.HouseService.getAll()
      .subscribe({
        next: (data) => {
          this.houses = data;
          this.aparts=this.houses.filter(house => house.type_houses == TypeHouses.Apartemet);
          this.villas=this.houses.filter(house => house.type_houses == TypeHouses.Villa);
          this.rooms=this.houses.filter(house => house.type_houses == TypeHouses.Room);
          this.nbraparts=this.aparts.length;
          this.nbrvillas=this.villas.length;
          this.nbrrooms=this.rooms.length;
          this.nbrprop=this.houses.length;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
    }

    getThumb(id: string) {    
  
      this.httpClient.get('http://localhost:800/Houses/get/housethumb/' + id)
      .subscribe({
        next: (data) => {
          this.image = data;
        }
      })
    }

    setApartement(){
      this.houses=this.aparts;
    }
    setVilla(){
      this.houses=this.villas;
    }
    setRoom(){
      this.houses=this.rooms;
    }

    //this.houses=this.houses villa
}
