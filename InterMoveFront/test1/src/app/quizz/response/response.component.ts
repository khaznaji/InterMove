import { Component } from '@angular/core';
import { QuizService } from 'src/app/shared/quiz.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent {
  responses:any;
  
  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizService.getdisplayResponse().subscribe(data => {
      if (data) {
        this.responses=data
        console.log(this.responses);
        
      }
    });
  }
}
