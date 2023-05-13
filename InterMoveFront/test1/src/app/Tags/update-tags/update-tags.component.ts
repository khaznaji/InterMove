import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tag } from '../../model/Tag/tag.module';
import { TagService } from '../../shared/tag.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-tags',
  templateUrl: './update-tags.component.html',
  styleUrls: ['./update-tags.component.css']
})
export class UpdateTagsComponent implements OnInit {
  id!: number;
  event!: Tag ;
  eventForm!: FormGroup;
  constructor(private route: ActivatedRoute,private router: Router,
    private eventService: TagService , private formBuilder: FormBuilder) { }
 
    ngOnInit() {
      this.route.params.subscribe(params => {
        this.id = +params['id'];
        this.eventService.getOfferId(this.id)
          .subscribe((event: Tag) => {
            this.event = event;
            // pré-remplir les champs du formulaire avec les valeurs de l'événement
            this.eventForm = this.formBuilder.group({
              nameTag: [this.event.nameTag],
       
            });
          });
      });
    }
  

  updateEvent() {
    this.eventService.updateOffer(this.id, this.event)
      .subscribe({
        next: data => {
          console.log(data);
          this.event = new Tag();
          this.gotoList();
        },
        error: error => console.log(error)
      });
  }
  

  onSubmit() {
    this.updateEvent();   

     
  }

  gotoList() {
    this.router.navigate(['/listTags']);
  }

}