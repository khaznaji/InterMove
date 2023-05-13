import { Component } from '@angular/core';
import { Quizz } from 'src/app/model/Quizz/quizz.model';
import { QuizService } from 'src/app/shared/quiz.service';

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.css']
})
export class ListQuizComponent {
  quiz:Quizz=new Quizz();
  quizs: any;
  domains: string[] = ['Informatique', 'Marketing']; 
  etats: string[] = ['Not','Finish']; 
  editquiz:Quizz=new Quizz();
  id: any;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.quizService.getQuiz().subscribe(data => {
      if (data) {
        this.quizs=data
        console.log(this.quizs);
      }
    });
  }
  public editeQuiz(quiz:Quizz){
    this.quiz={...quiz};
    this.id=quiz.id;
  }
  public addOrEditeQuiz(quiz:Quizz){
    console.log("quizquizquiz",quiz);
    if(!this.id){
      this.quizService.createQuiz(quiz).subscribe({
        next: response => this.reloadData(),
        error: error => console.log(error),
        complete: () =>  this.quiz=new Quizz(),
      });
    }else{
      this.quiz.id=this.id;
      this.quizService.updateQuiz(quiz).subscribe({
        next: response => this.reloadData(),
        error: error => console.log(error),
        complete: () => this.quiz=new Quizz(),
      });
      this.id=null;
    }
    
  }
  public deleteQuiz(id: number): void {
    console.log(id,"dddddddddddddddddddddddddddd");
    
    this.quizService.deleteQuiz(id).subscribe({
      next: response => this.quizs = this.quizs?.filter((s:Quizz) => s.id != id),
      error: error => console.log(error),
      complete: () => console.log('Delete request completed.')
    });
  }
  
}
