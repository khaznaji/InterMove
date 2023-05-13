import { Component, OnInit } from '@angular/core';
import { Agency } from 'src/app/accomodation/models/agency.model';
import { AgencyService } from 'src/app/accomodation/services/agency.service';

@Component({
  selector: 'app-agencies-list',
  templateUrl: './agencies-list.component.html',
  styleUrls: ['./agencies-list.component.css']
})
export class AgenciesListComponent implements OnInit {

  agencies?: Agency[];
  currentAgency: Agency = {};
  currentIndex = -1;
  title = '';
  searchString= '';

  constructor(private AgencyService: AgencyService) { }

  ngOnInit(): void {
    this.retrieveAgencies();
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

  refreshList(): void {
    this.retrieveAgencies();
    this.currentAgency = {};
    this.currentIndex = -1;
  }

  setActiveAgency(agency: Agency, index: number): void {
    this.currentAgency = agency;
    this.currentIndex = index;
  }

  removeAllAgencys(): void {
    this.AgencyService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentAgency = {};
    this.currentIndex = -1;

    this.AgencyService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.agencies = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}