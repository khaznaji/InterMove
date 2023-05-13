import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Observable } from 'rxjs';
import { QuizService } from 'src/app/shared/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  @ViewChild('quiz') content!: ElementRef; //typescript /// eli taht div lkolo binding lel 'quiz'
  quizs: any;
  score!: number;
  badge!: string;
  question: any;
  constructor(private guizService: QuizService, private router: Router) {
  }
  ngOnInit() {
    this.reloadData();
  }
  getQuestion(id: number): Observable<any> {
    return this.guizService.getMostRespondedQuestionOnQuiz(id);
  }
  
  getBadge(score: number): string {
    if (score >= 5000) {
      return 'PLATINUM';
    } else if (score >= 3000) {
      return 'GOLD';
    } else if (score >= 700 ) {
      return 'SILVER';
    } else {
      return 'BRONZE';
    }
  }

  reloadData() {
    this.guizService.getQuizScoreByUser(1).subscribe(data => {
      if (data) {
        console.log("this.quizs,data", data);
        this.score = data.score;
        this.badge = this.getBadge(this.score);
      }
    });
    this.guizService.getQuiz().subscribe(data => {
      if (data) {
        this.quizs = data
        this.quizs.forEach((data: any) => {
          if (data.etat === 'Finish') {
            this.getQuestion(data.id).subscribe((questionData: any) => {
              console.log('finished', questionData);
              data.mostQuestion = questionData;
            });
          }
        });        
        console.log(this.quizs);
      }
    });
  }
  imprime(){
    const doc = new jsPDF('p', 'pt', 'a4');
    const content = this.content.nativeElement;

    html2canvas(content).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      doc.save('facture.pdf');
    });
  }
  showEventDetails(id: number) {
    this.router.navigate(['/front/userQuestion', id]);
  }
}
