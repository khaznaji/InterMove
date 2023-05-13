import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Event } from '../../model/Event/event.model';
import { EventsService } from '../../shared/event.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styles: [
  ]
})
export class UpdateEventComponent implements OnInit {
  id!: number;
  event!: Event ;
  eventForm!: FormGroup;
  constructor(private route: ActivatedRoute,private router: Router,
    private eventService: EventsService , private formBuilder: FormBuilder) { }
 
    ngOnInit() {
      this.route.params.subscribe(params => {
        this.id = +params['id'];
        this.eventService.getEventId(this.id)
          .subscribe((event: Event) => {
            this.event = event;
            // pré-remplir les champs du formulaire avec les valeurs de l'événement
            this.eventForm = this.formBuilder.group({
              title: [this.event.title],
              description: [this.event.description],
              dateD: [this.event.dateD],
              dateF: [this.event.dateF],
              nbreDePlaces: [this.event.nbreDePlaces],
              image: [this.event.image],
              speaker: [this.event.speaker],
              typeEvent: [this.event.typeEvent],
              modaliteEvent: [this.event.modaliteEvent],
            });
          });
      });
    }
  

  updateEvent() {
    this.eventService.updateEvent(this.id, this.event)
      .subscribe({
        next: data => {
          console.log(data);
          this.event = new Event();
          this.gotoList();
        },
        error: error => console.log(error)
      });
  }
  

  onSubmit() {
    this.updateEvent();   

     
  }

  gotoList() {
    this.router.navigate(['/listEvents']);
  }
  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.event.image = file.name;
  }

  onFileSelected2(event: any) {
    const file = event.target.files[0];
    this.event.speaker = file.name;
  }
}
