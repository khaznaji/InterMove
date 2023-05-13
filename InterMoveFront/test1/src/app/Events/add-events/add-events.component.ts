import { Component } from '@angular/core';
import { EventsService } from '../../shared/event.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../../model/Event/event.model';
import { DomSanitizer ,SafeUrl } from '@angular/platform-browser';
import { QrcodeService } from 'src/app/shared/qrcode.service';
import { QrCode } from 'src/app/model/QrCode/qrcode.model';

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  
})
export class AddEventsComponent implements OnInit {

  events: Event = new Event();
  submitted = false;
  qrCode!: QrCode;

  constructor(private eventsService: EventsService,
    private router: Router,private qrCodeService: QrcodeService) { }

    map: any;

    ngOnInit() {
      
    }

  newEmployee(): void {
    this.submitted = false;
    this.events = new Event();
  }

  save() {
    this.eventsService
      .createEvent(this.events)
      .subscribe({
        next: data => {
          console.log(data);
          this.events = new Event();
          this.gotoList();
        },
        error: error => console.log(error)
      });
  }
  

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoVideo() {
    this.router.navigate(['/video']);
  }
  gotoList() {
    this.router.navigate(['/listEvents']);
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.events.image = file.name;
  }  

  onFileSelected2(event: any) {
    const file = event.target.files[0];
    this.events.speaker = file.name;
  }

  onSubmit2(link: string) {
    this.qrCodeService.createQRCode(link)
      .subscribe(qrCode => this.qrCode = qrCode);
  }
  }
  
