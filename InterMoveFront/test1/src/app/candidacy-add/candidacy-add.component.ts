import { Component } from '@angular/core';
import { CandidacyService } from '../services/candidacy.service';
import { candidacy } from '../models/candidacy';
import { environment } from 'src/environments/environment';
import { offer } from '../models/offer';

@Component({
  selector: 'app-candidacy-add',
  templateUrl: './candidacy-add.component.html',
  styleUrls: ['./candidacy-add.component.scss']
})
export class CandidacyAddComponent {
  constructor(private _candidacyService:CandidacyService){}

  submitCandidacy()
  {
    let o = new offer;
    o.idoffre=1;
    let cand =  new candidacy();
    const now = new Date();
    console.log(now.toLocaleDateString());
    cand.dateCandidacy=now;
    cand.user=environment.currentuser;
    cand.offer=o;
    this._candidacyService.add(cand).subscribe(res => {console.log("added")});
  }
}
