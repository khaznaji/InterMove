import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/shared/event.service';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { AuthService } from 'src/app/User/security/auth.service';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.css']
})
export class DetailEventComponent implements OnInit {
  event: any;
  hasParticipated = false; // Add this line
  participatedEvents: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService,  private http: HttpClient ,    private toastr: ToastrService ,private authService :AuthService

  ) {}
 
  ngOnInit() {

    const id = this.route.snapshot.params['id'];
    this.eventService.getEventById(id).subscribe(event => {
      this.event = event;
    });
  }
  reloadData() {
    const id = this.route.snapshot.params['id'];
    this.eventService.getEventById(id).subscribe(event => {
      this.event = event;
    });
  }
  
  participate(id: number, idE: number) {
    const url = `http://localhost:8080/InterMove/Events/affecter-user-event/${id}/${idE}`;

    this.http.post(url, {}).subscribe(
      () => {
        // Success
        console.log('User assigned to event.');
        this.participatedEvents.push(idE); // Add the event ID to the list of participated events
        this.toastr.success('Thank you for your participation');

        this.reloadData(); // Refresh the list of events
      },
      (error) => {
        // Error
        console.error('Error assigning user to event:', error);
      }
    );
  }
  
  removeparticipate(id: number, idE: number) {
    const url = `http://localhost:8080/InterMove/Events/remove-user-event/${id}/${idE}`;
  
    this.http.delete(url, {}).subscribe(
      () => {
        // Success
        console.log('User assigned to event.');
        this.participatedEvents = this.participatedEvents.filter(eventId => eventId !== idE); // Remove the event ID from the list of participated events
        this.toastr.error('Oh No :(');

        this.reloadData(); // Refresh the list of events
      },
      (error) => {
        // Error
        console.error('Error assigning user to event:', error);
        this.toastr.error('Une erreur est survenue lors de l\'inscription à l\'événement.');

      }
    );
  }
}
