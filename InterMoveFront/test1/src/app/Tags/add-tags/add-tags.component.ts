import { Component ,OnInit} from '@angular/core';
import { Tag } from 'src/app/model/Tag/tag.module';
import { TagService } from '../../shared/tag.service';
import { Observable } from "rxjs";
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-tags',
  templateUrl: './add-tags.component.html',
  styleUrls: ['./add-tags.component.css']
})
export class AddTagsComponent implements OnInit {
  tags: Tag = new Tag();
  submitted = false;

  constructor(private offersService: TagService,
    private router: Router) { }

  ngOnInit() {
  }

  newEmployee(): void {
    this.submitted = false;
    this.tags = new Tag();
  }

  save() {
    this.offersService
      .createOffer(this.tags)
      .subscribe({
        next: data => {
          console.log(data);
          this.tags = new Tag();
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
    this.router.navigate(['/listTags']);
  }
 
  }
  


  
