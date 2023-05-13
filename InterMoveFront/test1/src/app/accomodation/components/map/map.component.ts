import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import * as GeoJSON from 'geojson';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent {
  @Input() location='Dubai';
  
constructor(private httpClient: HttpClient){}

ngOnInit(): void {
  this.location='dubai';
}

  
  setLocation(){
  this.httpClient.get('https://api.positionstack.com/v1/forward?access_key=0fc7a24473051374eb76bab92799021d&query=1600%20Pennsylvania%20Ave%20NW,%20Washington%20DC')
  .subscribe({
    next: (data) => {
      console.log(data);
    },
    error: (e) => console.error(e)
  });
}




  

}
