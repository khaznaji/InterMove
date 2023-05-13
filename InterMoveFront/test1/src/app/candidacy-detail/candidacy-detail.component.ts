import { Component } from '@angular/core';
import { candidacy } from '../models/candidacy';
import { ActivatedRoute, Params } from '@angular/router';
import { CandidacyService } from '../services/candidacy.service';

@Component({
  selector: 'app-candidacy-detail',
  templateUrl: './candidacy-detail.component.html',
  styleUrls: ['./candidacy-detail.component.scss']
})
export class CandidacyDetailComponent {
  id:number=0;

  candidacy: candidacy= new candidacy();

  constructor(private activatedRoute: ActivatedRoute,private _candidacyService:CandidacyService){
    
  }

ngOnInit(){
  
  this.activatedRoute.params.subscribe((params: Params) => {
    this.id = params['id'];
  });
  
  this._candidacyService.getbyId(this.id).subscribe((res:any) =>{
    this.candidacy=res;
    console.log(this.candidacy);
  });


}

}
