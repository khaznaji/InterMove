import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Agency } from 'src/app/accomodation/models/agency.model';
import { House, HouseType2LabelMapping, TypeHouses } from 'src/app/accomodation/models/house.model';
import { HousesService } from 'src/app/accomodation/services/houses.service';
import { AgencyService } from 'src/app/accomodation/services/agency.service';
import { Route, Router } from '@angular/router';





interface Country {
  shortName: string;
  name: string;
}

@Component({
  selector: 'app-add-houses',
  templateUrl: './add-houses.component.html',
  styleUrls: ['./add-houses.component.css']
})
export class AddHousesComponent {
  public HouseType2LabelMapping = HouseType2LabelMapping;
  public Types = Object.values(TypeHouses);

  agencies?: Agency[];
  house: House = {
    title: '',
    type_houses: undefined,
    country: '',
    region: '',
    adress: '',
    loyer: 0,
    available: true,
    nbrOfRooms: 0,
    agency: '',
    description:''
  };
  submitted = false;


  //Country Selector
  form: FormGroup;
  countries: Country[];
  states: string[];
  cities: string[];

  name = new FormControl(null, [Validators.required]);
  description = new FormControl(null, [Validators.required]);
  country = new FormControl(null, [Validators.required]);
  state = new FormControl({ value: null, disabled: true }, [
    Validators.required,
  ]);
  city = new FormControl({ value: null, disabled: true }, [
    Validators.required,
  ]);

  constructor(private houseService: HousesService,private AgencyService: AgencyService , private router:Router) { 
    this.countries = this.houseService.getCountries();
    this.form = new FormGroup({
      country: this.country,
      state: this.state,
      city: this.city,
    });
  }
  ngOnInit(): void {
    this.retrieveAgencies();
    this.country.valueChanges.subscribe((country) => {
      this.state.reset();
      this.state.disable();
      if (country) {
        this.states = this.houseService.getStatesByCountry(country);
        this.state.enable();
      }
    });

    this.state.valueChanges.subscribe((state) => {
      this.city.reset();
      this.city.disable();
      if (state) {
        this.cities = this.houseService.getCitiesByState(this.country.value, state);
        this.city.enable();
      }
    });
  }

  retrieveAgencies(): void {
    this.AgencyService.getAll()
      .subscribe({
        next: (data) => {
          this.agencies = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  saveHouse(): void {
    const data = {
      title : this.house.title,
      type_houses: this.house.type_houses,
      country: this.house.country,
      region: this.house.region,
      adress: this.house.adress,
      loyer: this.house.loyer,
      available: this.house.available,
      nbrOfRooms: this.house.nbrOfRooms,
      agency:this.house.agency,
      description:this.house.description
    };
    console.log(data)
    
    this.houseService.create(data,this.house.agency)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
      this.router.navigate(['/listHouses']);

      
  }

  newHouse(): void {
    this.submitted = false;
    this.house = {
    title: '',
    type_houses: undefined,
    country: '',
    region: '',
    adress: '',
    loyer: 0,
    available: true,
    nbrOfRooms: 0,
    agency: '',
    description:''
    };
  }


  

}