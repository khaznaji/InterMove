import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Agency } from 'src/app/accomodation/models/agency.model';
import { AgencyService } from 'src/app/accomodation/services/agency.service';

interface Country {
  shortName: string;
  name: string;
}

@Component({
  selector: 'app-add-agency',
  templateUrl: './add-agency.component.html',
  styleUrls: ['./add-agency.component.css']
})
export class AddAgencyComponent {

  agency: Agency = {
    name: '',
      country: '',
      region: '',
      adress: '',
      aboutUs: ''
  };
  submitted = false;

  //Country Selector
  form: FormGroup;
  countries: Country[];
  states: string[];
  cities: string[];

  name = new FormControl(null, [Validators.required]);
  aboutUs = new FormControl(null, [Validators.required]);
  country = new FormControl(null, [Validators.required]);
  state = new FormControl({ value: null, disabled: true }, [
    Validators.required,
  ]);
  city = new FormControl({ value: null, disabled: true }, [
    Validators.required,
  ]);

  constructor(private agencyService: AgencyService , private router:Router) {
    this.countries = this.agencyService.getCountries();
    this.form = new FormGroup({
      country: this.country,
      state: this.state,
      city: this.city,
    });
   }


   ngOnInit() {
    this.country.valueChanges.subscribe((country) => {
      this.state.reset();
      this.state.disable();
      if (country) {
        this.states = this.agencyService.getStatesByCountry(country);
        this.state.enable();
      }
    });

    this.state.valueChanges.subscribe((state) => {
      this.city.reset();
      this.city.disable();
      if (state) {
        this.cities = this.agencyService.getCitiesByState(this.country.value, state);
        this.city.enable();
      }
    });
  }

  saveAgency(): void {
    const data = {
      name: this.agency.name,
      country: this.agency.country,
      region: this.agency.region,
      adress: this.agency.adress,
      aboutUs: this.agency.aboutUs
    };
    this.agencyService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
      this.router.navigate(['/listAgencies']);

  }

  newAgency(): void {
    this.submitted = false;
    this.agency = {
      name: '',
      country: '',
      region: '',
      adress: '',
      aboutUs: ''
    };
  }



  //Country selector

}