import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tag } from 'src/app/model/Tag/tag.module';
import { courses } from 'src/app/models/courses';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-recomended',
  templateUrl: './recomended.component.html',
  styleUrls: ['./recomended.component.css']
})
export class RecomendedComponent {
  list_reccourses:courses[]=[];
  constructor(private coursesService:CoursesService, @Inject(MAT_DIALOG_DATA) public data: any) {}
 

  ngOnInit()
  {
   this.getRecomendedCourses();
   console.log(this.data)

  }


  getRecomendedCourses(){
    this.coursesService.getoffretags(this.data.OffreId).subscribe((res:Tag[]) =>{
      console.log(res)

      res.forEach((number) => {
        console.log(number); // Perform desired action with each element
        this.coursesService.gettagName(number.nameTag).subscribe((res2:courses[])=>{
          console.log(res2)
          res2.forEach((number) => {
            console.log(number); // Perform desired action with each element
            this.list_reccourses.push(number);
          });
          
          
          
        });
      });
      
    }
      );
    
  }
 close()
 {
  this.data.close()
 }

}
