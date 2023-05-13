import { Component, OnInit } from '@angular/core';
import { Claim } from '../../model/Complaints/claim.model';
import { ClaimService } from '../../shared/claim.service';
import { Router } from '@angular/router';
import { TypeClaim } from 'src/app/model/Complaints/type-claim';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-complaints',
  templateUrl: './add-complaints.component.html',
  styles: [
  ]
})
export class AddComplaintsComponent implements OnInit {

  events: Claim = new Claim();
  submitted = false;

  constructor(private eventsService: ClaimService,
    private router: Router) { }

  ngOnInit() {
  
  }

  newEmployee(): void {
    this.submitted = false;
    this.events = new Claim();
  }
   dirtyWords = ['word1', 'word2', 'word3'];
    filterDirtyWords(text: string): string {
    let filteredText = text;
    this.dirtyWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      filteredText = filteredText.replace(regex, '****');
    });
    return filteredText;
  }
  
  save() {
    this.eventsService
      .createClaim(this.events)
      .subscribe({
        next: data => {
          console.log(data);
          this.events = new Claim();
          this.gotoList();
        },
        error: error => console.log(error)
      });
  }
  nativeSelectFormControl = new FormControl();


  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/listEvents']);
  }
 
  addUserComplaints() {
    this.eventsService.addUserClaim(this.events, 1).subscribe();
    this.events = new Claim(); 
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.events.image = file.name;
  }
}