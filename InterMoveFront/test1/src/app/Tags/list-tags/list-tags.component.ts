import { Component,OnInit } from '@angular/core';
import { TagService } from '../../shared/tag.service';
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-tags',
  templateUrl: './list-tags.component.html',
  styleUrls: ['./list-tags.component.css']
})
export class ListTagsComponent implements OnInit {
  tags:any;
  constructor(private tagsService:   TagService,    private route : ActivatedRoute,private router: Router) { }
  ngOnInit() {
    this.reloadData();
    
  }
  reloadData() {
    this.tags = this.tagsService.getTags().subscribe(
      (res)=>{
        this.tags=res;
        console.log(res);
    
       }
    );
  }
  deleteEvent(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce poste?')) {
      this.tagsService.deleteEvent(id).subscribe(() => {
        // Recharge la page après la suppression
        window.location.reload();
      });
    }
  }
  updateOffer(id: number){
    this.router.navigate(['editTag', id]);
  }


}
