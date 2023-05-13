import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Offer } from 'src/app/model/Offer/offer.model';
import { candidacy } from 'src/app/models/candidacy';
import { offer } from 'src/app/models/offer';
import { RecomendedComponent } from 'src/app/recomended/recomended.component';
import { CandidacyService } from 'src/app/services/candidacy.service';
import { OffersService } from 'src/app/shared/offers.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-offer-front',
  templateUrl: './offer-front.component.html',
  styleUrls: ['./offer-front.component.css']
})
export class OfferFrontComponent  implements OnInit {

  events!: Observable<Offer[]>;

  constructor(private eventsService: OffersService  ,private router: Router , private http: HttpClient,public dialog: MatDialog,private _candidacyService:CandidacyService){ }

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.events = this.eventsService.getOffers();
  }
  markAsInteressted(id: number) {
    this.eventsService.markOfferAsInteressant(id);
    console.log(`Offer ${id} marked as interessant!`);
  }


  //aziz
  openDialog(offre:string) {
    this.dialog.open(RecomendedComponent, {
      data: {
        tagID: offre,
      },
    });
  }

  submitCandidacy(idoffre:number)
  {
    
    let o = new offer;
    o.idoffre=idoffre;
    let cand =  new candidacy();
    const now = new Date();
    console.log(now.toLocaleDateString());
    cand.dateCandidacy=now;
    cand.user=environment.currentuser;
    cand.offer=o;
    this._candidacyService.add(cand).subscribe(res => {console.log("added")
    this.router.navigate(['/front/candidacy']);
  });
  }
}
