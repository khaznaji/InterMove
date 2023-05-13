import { Component } from '@angular/core';
import { courses } from '../models/courses';
import { CoursesService } from '../services/courses.service';
import { Router } from '@angular/router';
import { Tag } from '../model/Tag/tag.module';
import { TagService } from '../shared/tag.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
@Component({
  selector: 'app-courses-add',
  templateUrl: './courses-add.component.html',
  styleUrls: ['./courses-add.component.css']
})
export class CoursesAddComponent {
showSucc=false;
showErr=false;
inputLabel:string="";
course:courses= new courses();
 tags: Tag[] = [];
 selectedTags: Tag[] =[];
 tagInput : string="";
 tagIds: number[]=[];

constructor(private _coursesService:CoursesService,private router: Router,private _tagService:TagService){}

ngOnInit(){
  this.getTags();

}
  onsubmit()
  {
console.log(this.inputLabel)
this.course.name=this.inputLabel;
console.log(this.course)
this._coursesService.addcourse(this.course).subscribe((res)=>{
  console.log(res);
  if(this.tagIds.length!=0){
  this._coursesService.assignTagsToCourse(res.idCourse,this.tagIds).subscribe(res => {
    return res;
  })}
  this.showSucc=true;
  this.showErr=false;
  this.router.navigate(['/coursesback']);
},error => {
  this.showErr=true;
  this.showSucc=false;

},)
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
