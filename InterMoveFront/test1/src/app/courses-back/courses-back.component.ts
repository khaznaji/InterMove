import { Component } from '@angular/core';
import { courses } from '../models/courses';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses-back',
  templateUrl: './courses-back.component.html',
  styleUrls: ['./courses-back.component.css']
})
export class CoursesBackComponent {


  searchText!:any;
  list_courses:courses[]=[];
  constructor(private coursesService:CoursesService){}

    ngOnInit()
  {
   this.getAll();
  }

 
  
  getAll(){
    this.coursesService.getall().subscribe((res)=>{
      this.list_courses=res
    })
  }

  deleteCourse(id:number){
    this.coursesService.delete(id).subscribe((res)=>{
      console.log(res)
      this.getAll();
    })
  }
}
