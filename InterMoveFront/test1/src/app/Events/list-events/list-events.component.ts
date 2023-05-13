import { Component, OnInit } from '@angular/core';
import { Event } from '../../model/Event/event.model';
import { EventsService } from '../../shared/event.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
})
export class ListEventsComponent implements OnInit {
  events:any;
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [3, 6, 9, 12];
  constructor(private eventsService: EventsService  ,private router: Router,private http: HttpClient){ }

  ngOnInit() {
    this.reloadData();
    
  }
  reloadData() {
    this.events = this.eventsService.getEvents().subscribe((res)=>{
      this.events=res;
      console.log(res);
  
     });

  }
  onTableDataChange(event: any) {
    this.page = event;
    this.reloadData();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.reloadData();
  }
 /*  deleteEvent(id: number): void {
    this.eventsService.deleteEvent(id).subscribe({
      next: () => {
        console.log('Event deleted successfully');
      },
      error: error => console.error(error),
      complete: () => console.log('Delete request completed.')
    });

  } */
  deleteEvents = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce poste?')) {
      this.eventsService.deleteEvent(id).subscribe(() => {
        // Recharge la page après la suppression
        window.location.reload();
      });
    }
  }
  updateEvent(id: number){
    this.router.navigate(['editEvent', id]);
  }
 
  
  /* eventId!: number;
  affecterUserToEvent(id: number , eventId : number) {
    const url = `/affecter-user-event/${id}/${this.eventId}`;
    this.http.post(url, {}).subscribe(
      () => {
        console.log('Utilisateur affecté à l\'événement');
      },
      (error) => {
        console.log('Erreur lors de l\'affectation de l\'utilisateur à l\'événement :', error);
      }
    );
  } */
  private downloadFile(data: Blob, filename: string) {
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  }


}
