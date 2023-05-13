import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Quizz } from 'src/app/model/Quizz/quizz.model';
import { QuizService } from 'src/app/shared/quiz.service';
import { Response } from 'src/app/model/Quizz/response';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionUComponent {
  id!: number;
  public timeLeft!: any; // remaining time in milliseconds
  questions: any;
  submitted = false;
  selectedResponses: any;
  msg: any;
  responses: Response = new Response();
  quizs: any;
  time: any;
  x: number = 0;
  startTime!: Date;
  question:any;
  timeLeft$: any=0;
  color:string="green";
  constructor(private activated: ActivatedRoute,
    private guizService: QuizService,
    private router: Router,) { }
    finish(){
      this.quizs[0].etat = "Finish";
      this.guizService.updateQuiz(this.quizs[0]).subscribe({
        next: response => {  
          this.router.navigateByUrl('front/userQuiz')},
        error: error => console.log(error),
      });
    }
  ngOnInit(): void {
    
    this.id = this.activated.snapshot.params['id']
    this.guizService.getQuizdiplayShuffledQuestionOfQuiz(this.id).subscribe({
      next: (data) => {
        this.questions = data; console.log(this.questions)
      },
      error: (error) => console.log(error),
      complete: () => console.log("I m finished")
    })
    this.guizService.getQuiz().subscribe(data => {
      if (data) {
        this.quizs = data.filter((Element: Quizz) => {
          return Element.id == this.id
        })
        this.time = (this.quizs[0].timelimit * 60) * 1000
        this.timeLeft = this.time;
        this.timeLeft$ = of(this.time/1000); // update the Observable
        console.log(this.quizs[0].timelimit * 60, "                    ", this.time);
        setTimeout(() => {
          // mark the quiz as finished and update the database
          this.quizs[0].etat = "Finish";
          this.guizService.updateQuiz(this.quizs[0]).subscribe({
            next: response => {  clearInterval(timer); // stop the timer
            this.router.navigateByUrl('/userQuiz')},
            error: error => console.log(error),
          });
        }, this.time);

        // update the time left every second
       // update the time left every second
const timer = setInterval(() => {
  this.timeLeft = Math.max(0, this.time - (new Date().getTime() - this.startTime.getTime()));
   if( Math.round(this.timeLeft/1000)>10){
    this.color="green";
  }else{
    this.color="red";
  }
  this.timeLeft$ = of(Math.round(this.timeLeft/1000));

  if (this.timeLeft <= 0) {
    clearInterval(timer);
  }
}, 1000);

        this.startTime = new Date(); // save the start time
      }
    });
  }


  submitQuestion(index: number, questionId: number) {
    this.questions[index].submitted = true;
    this.selectedResponses = [];
    const responseInputs = document.getElementsByClassName('question')[index].getElementsByClassName('response-input');
    console.log("selectedResponses", questionId);
    for (let i = 0; i < responseInputs.length; i++) {
      if ((responseInputs[i] as HTMLInputElement).checked) {
        this.selectedResponses.push((responseInputs[i] as Element).previousSibling?.textContent?.trim());
      }
    }
    console.log("selectedResponses");
    //  Send the studentResponse object to the API
    this.responses.studentResponse = this.selectedResponses;
    console.log(this.responses);

    this.guizService.addResponseToQuestion(questionId, 1, this.responses).subscribe({
      next: (data: any) => this.msg = "saved with success",
      error: (error: any) => this.msg = "error with saving produit",
      complete: () => console.log("I m finished")
    })
  }
}
