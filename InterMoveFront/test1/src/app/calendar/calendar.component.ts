import { Component, OnInit } from '@angular/core';
import {Calendar, CalendarOptions,EventInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Offer } from '../model/Offer/offer.model';
import { OffersService } from '../shared/offers.service';
import { Router } from '@angular/router';






@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendar!: Calendar;
  calendarOptions: any;
  offer!: Offer[];
  idoffre!: number;
  datedebut!: Date;

  datefin!: Date;
  
//

 /*  name!: string;
  startDate!: string;
  endDate!: string;
  calendarOptions!: CalendarOptions;
 */
  ngOnInit() {
    
    this.getALLRDV();
    const calendarEl = document.getElementById('calendar');
    if (calendarEl) {
      this.calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, timeGridPlugin],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [],eventClick: (info) => {
          alert(info.event.extendedProps['description']);

          // rediriger vers la page de détails en utilisant le router
          this.router.navigate(['/front/offer']);
        }
      });
      this.calendar.render();}
    
  }
  constructor(private offerservice: OffersService , private router:Router){

  }

  
  

 
  
  getALLRDV() {
    this.offerservice.getOffers().subscribe((res) => {
      if (Array.isArray(res)) {  // vérifier si res est un tableau
        this.offer = res;
        this.calendar.addEventSource(this.offer.map(rdv => {  // utiliser map() si this.RDV est un tableau
          return {
            title: `Offers ${rdv.titre}`,

            start: rdv.datedebut ,end:rdv.datefin,
            id: rdv.idoffre.toString(),

          }
        }));
      }
    });


    };
  
  }