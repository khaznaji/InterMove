import { Component } from '@angular/core';
import { CandidacyService } from '../services/candidacy.service';
import { candidacy } from '../models/candidacy';

@Component({
  selector: 'app-candidacy-front',
  templateUrl: './candidacy-front.component.html',
  styleUrls: ['./candidacy-front.component.css']
})
export class CandidacyFrontComponent {
  list_candidacy:candidacy[]=[];
  private candidacyId: number=0;
  private selectedFile: File | undefined;


  constructor(private _candidacyService:CandidacyService){}



    ngOnInit()
  {
    this._candidacyService.getbyUserId(this._candidacyService.getUserById().userid).subscribe(res=>{

      this.list_candidacy=res
    })
  }
//assignDocumentToCandidacy

onFileSelected(event: any): void {
  this.selectedFile = event.target.files[0];
}

assignDocument(idC:number): void {
  if (!this.selectedFile) {
    alert('Please select a file first!');
    return;
  }

  this._candidacyService.assignDocumentToCandidacy(idC, this.selectedFile)
    .subscribe(
      () => {
        console.log('Document assigned successfully');
        // Handle success response
      },
      error => {
        console.error('Error assigning document:', error);
        // Handle error response
      }
    );
}
}
