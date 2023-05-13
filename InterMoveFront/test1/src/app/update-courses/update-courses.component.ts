import { Component } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute, Params } from '@angular/router';
import { courses } from '../models/courses';

@Component({
  selector: 'app-update-courses',
  templateUrl: './update-courses.component.html',
  styleUrls: ['./update-courses.component.css']
})
export class UpdateCoursesComponent {
  id:number=0;
  inputLabel:string="";
  showSucc=false;
showErr=false;
  course:courses=new courses();
  constructor(private activatedRoute: ActivatedRoute,private _coursesService:CoursesService){}

  ngOnInit(){
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    
    this._coursesService.getid(this.id).subscribe((res)=>{
      console.log(res)
      this.course=res;
      this.inputLabel=res.name;
    })
  }

  onsubmit()
  {
    this.course.name=this.inputLabel
    this._coursesService.addcourse(this.course).subscribe((res)=>{

    })
  }
}
