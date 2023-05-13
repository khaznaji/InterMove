import { Component ,ElementRef,OnInit, ViewChild } from '@angular/core';
import { Offer} from '../../model/Offer/offer.model';
import { OffersService } from '../../shared/offers.service';
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';
import {jsPDF} from "jspdf"
import html2canvas from 'html2canvas'
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.css']
})
export class ListOffersComponent implements OnInit {
  offers:any;
  POSTS: any;
  searchText!:any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 2;
  tableSizes: any = [3, 6, 9, 12];
  @ViewChild('pdf') pdf!: ElementRef;
  contratDetail : any;
  show : boolean = false;
  idOffre : any;
  constructor(private offersService: OffersService,    private route : ActivatedRoute,private router: Router ,  private http:HttpClient) 
  { this.idOffre = this.route.snapshot.params['id']}

  ngOnInit() {
    this.reloadData();
    
  }
  reloadData() {
    this.offers = this.offersService.getOffers().subscribe(
      (res)=>{
        this.offers=res;
        console.log(res);
    
       }
    );
  }
  markAsHist(id: number) {
    this.offersService.markOfferAsHistory(id);
    this.offersService.deleteEvent;
    console.log(`Offer ${id} marked as history!`);
  }
  downloadPdf(id: number) {
    //const id = 32 
    const url = `http://localhost:8080/InterMove/gestionoffre/export/${id}`; 
    

    this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'offer.pdf';
      link.click();
    });
  }
/*
  deleteEvent(id: number): void {
    this.offersService.deleteEvent(id).subscribe({
      next: response => console.log(response),
      error: error => console.log(error),
      complete: () => console.log('Delete request completed.')
    });

  }*/
/*   deleteEvent = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce poste?')) {
      this.offersService.deleteEvent(id).subscribe(() => {
        // Recharge la page après la suppression
        window.location.reload();
      });
    }
  } */
  deleteEvent(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce poste?')) {
      this.offersService.deleteEvent(id).subscribe(() => {
        // Recharge la page après la suppression
        window.location.reload();
      });
    }
  }
  updateOffer(id: number){
    this.router.navigate(['editOffer', id]);
  }
  updateOffer1(id: number){
    this.router.navigate(['/listOffers']);
  }

  getall(){
    this.offersService.getall().subscribe((res)=>{
      this.offersService=res
      console.log(res)
    })
  }
  setAccepted(idc:number)
  {
    this.offersService.setAccepted(idc).subscribe( res => {
      console.log("Informatique")
      this.getall();
    });
  }

  setRejected(idc:number)
  {
    this.offersService.setRejected(idc).subscribe( res => {
      console.log("Marketing")
      this.getall();
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getall();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getall();
  }

  markAsInteressted(id: number) {
    this.offersService.markOfferAsInteressant(id);
    console.log(`Offer ${id} marked as interessant!`);
  }
  /*
  downloadPDF() {
    const id = 123; // Replace with your offer ID
    this.offersService.downloadPDF(id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Offre_${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }*/

  generatePDF(item:any){
    console.log("+++++++++"+item)
    this.show = true
    this.contratDetail = item
  }

  loadPdfff(){
    const op = {
      backgroud : 'white',
      scale : 3
    }

    var div = document.getElementById('pdff')

    setTimeout(()=>{
      if(this.pdf){

        html2canvas(this.pdf.nativeElement , op).then(async canvas=>{
          const myImage = await canvas.toDataURL('image/png')
          let myPdf = new jsPDF('p' , 'mm' ,'a4')
          var width = await myPdf.internal.pageSize.getWidth()
          var heigth = await canvas.height * width / canvas.width
          myPdf.addImage(myImage , 'PNG' , 0 , 0 , width , heigth)
          myPdf.save('contrat.pdf')
          // this.toastr.success('Vous avez téléchargé le pdf avec succée', 'OK 🙂');
        })
      }
    })
  }

}



