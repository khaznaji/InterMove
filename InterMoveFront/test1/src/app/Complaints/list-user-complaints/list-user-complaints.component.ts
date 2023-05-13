import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Claim } from 'src/app/model/Complaints/claim.model';
import { ClaimService } from 'src/app/shared/claim.service';

@Component({
  selector: 'app-list-user-complaints',
  templateUrl: './list-user-complaints.component.html',
  styles: [
  ]
})
export class ListUserComplaintsComponent implements OnInit {
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
  complaints: Claim[] = [];
  filteredComplaints: Claim[] = [];
  @Input() claims!: Claim;

  claim!: Observable<Claim[]>;
  selectedStatus: string = '';
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
    this.router.navigate(['front/editComplaints/', id]);

  }

  loadComplaints() {
    this.claimService.getClaim().subscribe((complaints) => {
      this.complaints = complaints;
      this.filteredComplaints = complaints;
    }, (error) => {
      console.error('Error loading complaints', error);
    });
  }
}
