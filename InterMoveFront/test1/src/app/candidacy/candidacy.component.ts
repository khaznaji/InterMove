import { Component } from '@angular/core';
import { CandidacyService } from '../services/candidacy.service';
import { candidacy } from '../models/candidacy';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { CoursesService } from '../services/courses.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-candidacy',
  template: `
    <input type="file" (change)="onFileSelected($event)">
    <button (click)="convertPdf()">Convert to Text</button>
    <div *ngIf="conversionResult$ | async as conversionResult">
      {{ conversionResult }}% match
    </div>
  `,
  templateUrl: './candidacy.component.html',
  styleUrls: ['./candidacy.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class CandidacyComponent {
  list_candidacy:candidacy[]=[];
  selectedFile?: File;
  conversionResult$?: Observable<number>;
  dataSource!: MatTableDataSource<any>;
  columnsToDisplay = ['score', 'lastname','Actions'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: candidacy | null | undefined ;
  score:number;

  constructor(private _candidacyService:CandidacyService, private _courseservice:CoursesService){}

  ngOnInit(){

    this.getall();
  }
  getall(){
    this._candidacyService.getall().subscribe((res)=>{
      this.dataSource=new MatTableDataSource(res)
      console.log(res)
    })
  }

  getdocument(idc:number){
// this._courseservice.getdocument(idc).subscribe( res => {
//   console.log("Accepted")
//   this.getall();
// });
this._courseservice.downloadPdf(idc)
  }

  setAccepted(idc:number)
  {
    this._candidacyService.setAccepted(idc).subscribe( res => {
      console.log("Accepted")
      this.getall();
      this._candidacyService.sendmail(idc).subscribe(res=>{console.log(res)});
    });
  }

  setRejected(idc:number)
  {
    this._candidacyService.setRejected(idc).subscribe( res => {
      console.log("Rejected")
      this.getall();
      
    });
  }

pdfdown(idc:number,pdf:string){
this._courseservice.downloadPdf(idc)  ;
}



onFileSelected(event: any): void {
  this.selectedFile = event.target.files[0];
}




convertPdf(idc:number): void {
 

   // replace with the actual value

  //this.conversionResult$ = 
  this._candidacyService.testpdf(idc).subscribe(res =>{console.log(res)
  this.score=res});
}
}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
  },
  {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`,
  },
  {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`,
  },
  {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`,
  },
  {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`,
  },
  {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`,
  },
  {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`,
  },
  {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`,
  },
  {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`,
  },
  {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`,
  },
];