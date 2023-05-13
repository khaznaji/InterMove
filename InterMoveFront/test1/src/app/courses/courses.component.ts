import { Component } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { courses } from '../models/courses';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  list_reccourses:courses[]=[];
  list_courses:courses[]=[];
  list_Ucourses:any[]=[];
  udemy:string[]=["833298","2903072","24823","594360","552672","1298462","2222850","1948098","3550828"]
  searchText!:any;
  constructor(private coursesService:CoursesService){}

    ngOnInit()
  {
   this.getRecomendedCourses();
   this.getAll();
   this.getUdemy();
  }

  getRecomendedCourses(){
    this.coursesService.gettagName("angular").subscribe((res)=>{
      this.list_reccourses=res
      console.log(res)
    });
  }

  getAll(){
    this.coursesService.getall().subscribe((res)=>{
      this.list_courses=res
    })
  }

  getUdemy()
  {
    for (let i = 0; i < this.udemy.length; i++) {
      this.coursesService.getUdemyCourses(this.udemy[i]).subscribe(res=> {console.log(res);
        this.list_Ucourses.push(res);
        console.log(this.list_Ucourses)
      })
    }
  }

}
