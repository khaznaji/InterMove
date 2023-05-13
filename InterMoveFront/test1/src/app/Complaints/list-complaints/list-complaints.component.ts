import { Component, Input, OnInit } from '@angular/core';
import { Claim } from '../../model/Complaints/claim.model';
import { ClaimService } from '../../shared/claim.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-complaints',
  templateUrl: './list-complaints.component.html',
  styles: [
  ]
})
export class ListComplaintsComponent  implements OnInit {
  @Input() claims!: Claim;

  claim!: Observable<Claim[]>;
  selectedStatus: string = '';
  constructor(private claimService: ClaimService  ,private router: Router){ }

  ngOnInit() {
    this.loadComplaints();

  }
  reloadData() {
  }
  deleteClaim(id: number): void {
    this.claimService.deleteClaim(id).subscribe({
      next: response => console.log(response),
      error: error => console.log(error),
      complete: () => console.log('Delete request completed.')
    });
  }


  onCheckboxClick(event: Event) {
    const target = event.target as HTMLInputElement;
    const label = target.nextElementSibling as HTMLLabelElement;

    label.textContent = target.checked ? 'Claim Processed and Email Sent!' : '';
  }
  updateComplaint() {
    this.claimService.updateComplaint(this.claims.id, true).subscribe(() => {
      console.log('Complaint updated successfully');
      this.claims.status = true;
    }, (error) => {
      console.error('Error updating complaint', error);
    });
  }
  isUpdating = false;

 /*  updateComplaintStatus(complaint: Claim) {
    this.isUpdating = true;
    this.claimService.updateComplaint(complaint.id, true).subscribe(() => {
      console.log('Complaint updated successfully');
      complaint.status = true;
      this.isUpdating = false;
    }, (error) => {
      console.error('Error updating complaint', error);
      this.isUpdating = false;
    });
  } */
  complaints: Claim[] = [];
  filteredComplaints: Claim[] = [];
  loadComplaints() {
    this.claimService.
    getClaim().subscribe((complaints: Claim[]) => {
      this.complaints = complaints.map((complaint: Claim) => {
        complaint.message = this.filterDirtyWords(complaint.message);
        complaint.objet = this.filterDirtyWords(complaint.objet);

        return complaint;
      });
      this.filteredComplaints = this.complaints;
    }, (error) => {
      console.error('Error loading complaints', error);
    });
  }
  
  dirtyWords= ['word1'];
  filterDirtyWords(text: string): string {
    if (!text) {
      return text;
    }
  
    this.dirtyWords.forEach((word) => {
      const regex = new RegExp(word, 'gi');
      text = text.replace(regex, '*'.repeat(word.length));
    });
  
    return text;
  }
  
  
  
  onStatusChange() {
    
    if (this.selectedStatus === '') {
      this.filteredComplaints = this.complaints;
    } else {
      const status = (this.selectedStatus === 'true');
      this.claimService.getComplaintsByStatus(status).subscribe((complaints) => {
        this.filteredComplaints = complaints;
      }, (error) => {
        console.error('Error filtering complaints by status', error);
      });
    }
  }
  updateComplaints(id: number){
    this.router.navigate(['front/editComplaints', id]);
  }
  userId = 1; // ID de l'utilisateur pour lequel vous souhaitez envoyer l'e-mail

  /* sendEmail(): void {
    this.claimService.sendEmail(this.userId).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  } */
  updateComplaintAndSendEmail(complaint: Claim) {
  this.isUpdating = true;
  this.claimService.updateComplaint(complaint.id, true).subscribe(
    () => {
      console.log('Complaint updated successfully');
      complaint.status = true;
      this.isUpdating = false;
      this.sendEmail();
    },
    (error) => {
      console.error('Error updating complaint', error);
      this.isUpdating = false;
    }
  );
}

sendEmail(): void {
  this.claimService.sendEmail(this.userId).subscribe(
    response => console.log(response),
    error => console.log(error)
  );
}
}
