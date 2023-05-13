import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { HousesService } from 'src/app/accomodation/services/houses.service';
import { House } from '../../models/house.model';
import { AgencyService } from '../../services/agency.service';
import { Agent } from '../../models/agent.model';

@Component({
  selector: 'app-front-house-details',
  templateUrl: './front-house-details.component.html',
  styleUrls: ['./front-house-details.component.css']
})
export class FrontHouseDetailsComponent {
  images: GalleryItem[];
  allImages :any; 
  agents:Agent[];
  
  currentHouse: House = {
    title: '',
    type_houses: undefined,
    country: '',
    region: '',
    adress: '',
    loyer: 0,
    available: true,
    nbrOfRooms: 0,
    agencyName: '',
    agency: '',
    description: ''
  };

  constructor(
    private houseService: HousesService,
    private agencyService: AgencyService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router) { }


    ngOnInit(): void {
      
      this.images = [
        new ImageItem({ src: 'IMAGE_SRC_URL', thumb: 'IMAGE_THUMBNAIL_URL' }),
        // ... more items
      ];
        this.getHouse(this.route.snapshot.params["id"]);
        this.getImages(this.route.snapshot.params["id"]);
        console.log(this.agents.length);
      }

      getHouse(id: string): void {
        this.houseService.get(id)
          .subscribe({
            next: (data) => {
              this.currentHouse = data;
              this.getAgents(data.agencyName);
              console.log(data.agencyName);
            },
            error: (e) => console.error(e)
          });
      }

      getAgents(id: string): void {
        this.agencyService.getAgents(id)
          .subscribe({
            next: (data) => {
              this.agents = data;
              console.log(data);
            },
            error: (e) => console.error(e)
          });
      }

      uploadedImage: File;
  dbImage: any;
  postResponse: any;
  successResponse: string;
  image: any;
      viewImage() {
        this.httpClient.get('http://localhost:8080/InterMove/get/image/info/' + this.image)
          .subscribe(
            res => {
              this.postResponse = res;
              this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
            }
          );
      }
    
    
         
        
        getImages(id: string) {    
      
          this.httpClient.get('http://localhost:8080/InterMove/Houses/get/houseimage/' + id)
          .subscribe({
            next: (data) => {
              this.allImages = data;
              
          for (let i = 0; i < this.allImages.length; i++) {
    
            /*
            this.images = [
              new ImageItem({ src: 'http://localhost:8088/Houses/get/image/'+this.allImages[i].name, thumb: 'http://localhost:8088/Houses/get/image/'+this.allImages[i].name }),
              new ImageItem({ src: 'http://localhost:8088/Houses/get/image/'+this.allImages[i+1].name, thumb: 'http://localhost:8088/Houses/get/image/'+this.allImages[i+1].name })
            ];
            */
           
           this.images[i] = new ImageItem({ src: 'http://localhost:8080/InterMove/Houses/get/image/'+this.allImages[i].name, thumb: 'http://localhost:8080/InterMove/Houses/get/image/'+this.allImages[i].name });
            
            
            console.log(this.allImages[i].name)
            
              }
              console.log(data);
            },
            error: (e) => console.error(e)
          }); 
        }    
    

}
