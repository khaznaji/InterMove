import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'app-videochat',
  templateUrl: './videochat.component.html',
  styles: [
  ]
})
export class VideochatComponent {
  iframe_url: SafeResourceUrl;

  constructor(private embedService: EmbedVideoService, private sanitizer: DomSanitizer) {
    const randomRoomId = Math.floor(Math.random() * 1000000);
    const jitsiUrl = `https://meet.jit.si/${randomRoomId}`;
    this.iframe_url = this.sanitizer.bypassSecurityTrustResourceUrl(jitsiUrl);
  }
}
