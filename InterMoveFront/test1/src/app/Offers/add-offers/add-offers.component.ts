import { Component,OnInit } from '@angular/core';
import { Offer } from 'src/app/model/Offer/offer.model';

import { OffersService } from '../../shared/offers.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { Tag } from 'src/app/model/Tag/tag.module';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CoursesService } from 'src/app/services/courses.service';
import { offer } from 'src/app/models/offer';

@Component({
  selector: 'app-add-offers',
  templateUrl: './add-offers.component.html',
  styleUrls: ['./add-offers.component.css']
})
export class AddOffersComponent  implements OnInit {
  offers: Offer = new Offer();
  submitted = false;
  tags: Tag[] = [];
  selectedTags: Tag[] =[];
  tagInput : string="";
  tagIds: number[]=[];
  constructor(private offersService: OffersService,
    private router: Router,private _coursesService:CoursesService) { }

  ngOnInit() {
    this.getTags();

  }

  newEmployee(): void {
    this.submitted = false;
    this.offers = new Offer();
  }

  save() {
    this.offersService
      .createOffer(this.offers)
      .subscribe({
        next: data => {
          console.log(data);
          const returnedObject:any = data;
          console.log(returnedObject.idoffre)
          if(this.tagIds.length!=0){
            this._coursesService.assignTagsToOffre(returnedObject.idoffre,this.tagIds).subscribe(res => {
              return res;
            })}
          this.offers = new Offer();
          this.gotoList();
        },
        error: error => console.log(error)
      });
  }
  

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/listOffers']);
  }
 
  getTags(){
    this._coursesService.getTags().subscribe((res:Tag[])=>{
      console.log(res)
      this.tags=res;
      console.log(this.tags)
    });
  }
  
  addTags()
  {
    let tg = new Tag();
    tg.nameTag=this.tagInput;
    if (tg.nameTag!=undefined){
      this._coursesService.addTags(tg).subscribe((res)=>{
        console.log(res);
        this.getTags();
  
      })
    }
    
  }

  selectTag(tag: Tag, event: MatCheckboxChange){
    if (event.checked && !this.selectedTags.includes(tag)) {
      this.selectedTags.push(tag);
      
    } else if (!event.checked && this.selectedTags.includes(tag)) {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
      
    }
    if(this.selectedTags.length == 0)
    {
      
    }
    else{
    this.tagIds=this.selectedTags.map((tag: Tag) => tag.idTags)
    console.log(this.tagIds);
  //   this.missionService.getFilteredTags(tagIds).subscribe((res)=>{
  //     this.data=res;
  //     console.log(this.data)
  //   });
  // }
  }

}

  }
  


  