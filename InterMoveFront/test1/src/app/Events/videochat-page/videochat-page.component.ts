import { Component, OnInit } from '@angular/core';
import { VideochatService } from '../../shared/videochat.service';
@Component({
  selector: 'app-videochat-page',
  template: '<app-videochat></app-videochat>',
})
export class VideochatPageComponent implements OnInit {
  constructor(private videochatService: VideochatService) {}

  ngOnInit() {
    this.videochatService.getVideochatPage().subscribe(
      (data) => console.log(data), // Afficher les données récupérées dans la console
      (error) => console.error(error) // Gérer les erreurs éventuelles
    );
  }
}
