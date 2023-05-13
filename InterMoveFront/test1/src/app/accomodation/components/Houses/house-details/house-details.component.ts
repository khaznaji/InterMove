import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { Agency } from 'src/app/accomodation/models/agency.model';
import { House, HouseType2LabelMapping, TypeHouses } from 'src/app/accomodation/models/house.model';
import { HousesService } from 'src/app/accomodation/services/houses.service';
import { AgencyService } from 'src/app/accomodation/services/agency.service';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.css']
})
export class HouseDetailsComponent implements OnInit {
  images: GalleryItem[];
  
  public HouseType2LabelMapping = HouseType2LabelMapping;
  public Types = Object.values(TypeHouses);
  agencies?: Agency[];
  agencyN?: '';
  allImages :any; 
  @Input() viewMode = false;

  @Input() currentHouse: House = {
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
  
  message = '';

  constructor(
    private houseService: HousesService,
    private AgencyService: AgencyService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.images = [
      new ImageItem({ src: 'IMAGE_SRC_URL', thumb: 'IMAGE_THUMBNAIL_URL' }),
      // ... more items
    ];
    if (!this.viewMode) {
      this.message = '';
      this.getHouse(this.route.snapshot.params["id"]);
      this.getImages(this.route.snapshot.params["id"])
    }
    this.retrieveAgencies();
  
  }

  retrieveAgencies(): void {
    this.AgencyService.getAll()
      .subscribe({
        next: (data) => {
          this.agencies = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  getHouse(id: string): void {
    this.houseService.get(id)
      .subscribe({
        next: (data) => {
          this.currentHouse = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  updateHouse(): void {
    this.message = '';
    
    this.houseService.update(this.currentHouse)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This house was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteHouse(): void {
    this.houseService.delete(this.currentHouse.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/listHouses']);
        },
        error: (e) => console.error(e)
      });
  }

  uploadedImage: File;
  dbImage: any;
  postResponse: any;
  successResponse: string;
  image: any;

  public onImageUpload(event) {
    this.uploadedImage = event.target.files[0];
  }


  imageUploadAction() {
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);


    this.httpClient.post('http://localhost:8080/InterMove/Houses/upload/image/'+this.currentHouse.id, imageFormData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.postResponse = response;
          this.successResponse = this.postResponse.body.message;
          this.getImages(this.route.snapshot.params["id"])
        } else {
          this.successResponse = 'Image not uploaded due to some error!';
        }
      }
      );
    }

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
