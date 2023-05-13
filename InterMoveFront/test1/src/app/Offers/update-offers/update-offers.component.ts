import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Offer } from '../../model/Offer/offer.model';
import { OffersService } from '../../shared/offers.service';
import { FormBuilder, FormGroup } from '@angular/forms';
//import { ToasterService } from 'angular2-toaster';




@Component({
  selector: 'app-update-offers',
  templateUrl: './update-offers.component.html',
  styleUrls: ['./update-offers.component.css']
})
export class UpdateOffersComponent implements OnInit {
  id!: number;
  offer!: Offer ;
  eventForm!: FormGroup;
  constructor(private route: ActivatedRoute,private router: Router,
    private eventService: OffersService , private formBuilder: FormBuilder) { }
 
    ngOnInit() {
      this.route.params.subscribe(params => {
        this.id = +params['id'];
        this.eventService.getOfferId(this.id)
          .subscribe((offer: Offer) => {
            this.offer = offer;
            // pré-remplir les champs du formulaire avec les valeurs de l'événement
            this.eventForm = this.formBuilder.group({
             
titre: [this.offer.titre],
description: [this.offer.description],
datedebut: [this.offer.datedebut],
datefin: [this.offer.datefin],
domain: [this.offer.domain],
interesse: [this.offer.interesse],


            });
          });
      });
    }
  

  updateEvent() {
    this.eventService.updateOffer(this.id, this.offer)
      .subscribe({
        next: data => {
          console.log(data);
          this.offer = new Offer();
          this.gotoList();
          //this._TS.pop('success', 'Success', 'Post added successfully')

        },
        error: error => console.log(error)
        
      });
  }
  updateEvent1() {
    this.eventService.updateOffer1(this.id, this.offer)
      .subscribe({
        next: data => {
          console.log(data);
          this.offer = new Offer();
          this.gotoList();
          //this._TS.pop('success', 'Success', 'Post added successfully')

        },
        error: error => console.log(error)
        
      });
  }
  

  onSubmit() {
    this.updateEvent();   

     
  }

  gotoList() {
    this.router.navigate(['/listOffers']);
  }
  



}