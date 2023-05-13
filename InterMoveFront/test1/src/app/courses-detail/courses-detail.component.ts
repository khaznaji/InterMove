import { Component } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute, Params } from '@angular/router';
import { courses } from '../models/courses';

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrls: ['./courses-detail.component.css']
})
export class CoursesDetailComponent {
id  : number=0;
course: courses= new courses();

  constructor(private activatedRoute: ActivatedRoute,private _coursesService:CoursesService){
    
  }

ngOnInit(){
  
  this.activatedRoute.params.subscribe((params: Params) => {
    this.id = params['id'];
  });

  this.getCouseId();

}

getCouseId(){
this._coursesService.getid(this.id).subscribe((res)=>{
this.course=res
})
}

}
