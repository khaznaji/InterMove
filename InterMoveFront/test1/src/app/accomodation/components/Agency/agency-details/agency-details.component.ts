import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Agency } from 'src/app/accomodation/models/agency.model';
import { AgencyService } from 'src/app/accomodation/services/agency.service';

interface Country {
  shortName: string;
  name: string;
}


@Component({
  selector: 'app-agency-details',
  templateUrl: './agency-details.component.html',
  styleUrls: ['./agency-details.component.css']
})
export class AgencyDetailsComponent implements OnInit {

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

  @Input() viewMode = false;

  @Input() currentAgency: Agency = {
    name: '',
      country: '',
      region: '',
      adress: ''
  };
  
  message = '';

  constructor(
    private agencyService: AgencyService,
    private route: ActivatedRoute,
    private router: Router) {

      this.countries = this.agencyService.getCountries();
      this.form = new FormGroup({
      country: this.country,
      state: this.state,
      city: this.city,
    });
     }

  ngOnInit(){
    
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

    if (!this.viewMode) {
      this.message = '';
      this.getAgency(this.route.snapshot.params["id"]);
    }
    
  }

  getAgency(id: string): void {
    this.agencyService.get(id)
      .subscribe({
        next: (data) => {
          this.currentAgency = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  updateAgency(): void {
    this.message = '';

    this.agencyService.update(this.currentAgency)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This agency was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteAgency(): void {
    this.agencyService.delete(this.currentAgency.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/listAgencies']);
        },
        error: (e) => console.error(e)
      });
  }

}