import { Component, OnInit } from '@angular/core';
import { Event } from '../../model/Event/event.model';
import { EventsService } from '../../shared/event.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-events-front',
  templateUrl: './list-events-front.component.html',
  styles: [
  ]
})
export class ListEventsFrontComponent implements OnInit {
  hasParticipated = false; // Add this line
  participatedEvents: number[] = [];

  events!: Observable<Event[]>;

  constructor(private eventsService: EventsService  ,private router: Router , private http: HttpClient){ }

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.events = this.eventsService.getEvents();
  }
  
  refreshEvents() {
    this.reloadData(); // Reload the list of events from the server
  }
  participate(id: number, idE: number) {
    const url = `http://localhost:8080/InterMove/Events/affecter-user-event/${id}/${idE}`;

    this.http.post(url, {}).subscribe(
      () => {
        // Success
        console.log('User assigned to event.');
        this.participatedEvents.push(idE); // Add the event ID to the list of participated events

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

        this.reloadData(); // Refresh the list of events
      },
      (error) => {
        // Error
        console.error('Error assigning user to event:', error);
      }
    );
  }
  showEventDetails(id: number) {
    this.router.navigate(['/front/detailevent', id]);
  }
  

}
