import { Component } from '@angular/core';
import { Question } from 'src/app/model/Quizz/question';
import { QuizService } from 'src/app/shared/quiz.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  question:Question=new Question();
  questions: any;
  responseList: string[] = [];
  correctResponsesList : number[] = [];
  types: string[] = ["MULTIPLE_CHOICE"]; 
  editquestion:Question=new Question();
  id: any;
  response!:string;
  correctResponsesIndex!:number;
  quizs: any;

 
  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizService.getQuiz().subscribe(data => {
      if (data) {
        this.quizs=data
        console.log(this.quizs);
      }
    });
    this.reloadData();
  }
  clearResponses(){
    this.responseList = [];
  }
  clearCorrectResponses(){
    this.correctResponsesList = [];
  }
  addCorrectResponses(correctResponsesIndex:number){
    if(correctResponsesIndex){
    this.correctResponsesList.push(correctResponsesIndex-1);
    this.correctResponsesIndex=0;
  }
  }
  addResponses(response:string){
if(response){
    this.responseList.push(response);
    this.response="";
    console.log(this.responseList,"qsssssssssss");
  }
  }
  reloadData() {
    this.quizService.getQuestion().subscribe(data => {
      if (data) {
        console.log(data);
        this.questions=data
      }
    });
  }

  public addOrEditQuestion(question:Question){

    question.responses=this.responseList;
    question.correctResponsesIndex=this.correctResponsesList;
    console.log("quizquizquiz",question);
      this.quizService.addQuestionToQuiz(question,question.quiz_id).subscribe({
        next: response => this.reloadData(),
        error: error => console.log(error),
        complete: () =>  this.question=new Question(),
      });
    
    
  }
  public deleteQuestion(id: number): void {
    console.log(id,"dddddddddddddddddddddddddddd");
    
    this.quizService.deleteQuestion(id).subscribe({
      next: response => this.questions = this.questions?.filter((s:Question) => s.id != id),
      error: error => console.log(error),
      complete: () => console.log('Delete request completed.')
    });
  }
}
