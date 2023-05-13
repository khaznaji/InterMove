import { Component, OnInit } from '@angular/core';
import { Agent } from 'src/app/accomodation/models/agent.model';
import { AgencyService } from 'src/app/accomodation/services/agency.service';
import { AgentService } from 'src/app/accomodation/services/agent.service';
import { Agency } from 'src/app/accomodation/models/agency.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css']
})
export class AddAgentComponent {
  agencies?: Agency[];
  agent: Agent = {
    name: '',
    number: 0,
    agency: '',
    email:'',
    description:''
  };
  submitted = false;

  constructor(private agentService: AgentService,private AgencyService: AgencyService , private router:Router) { }
  ngOnInit(): void {
    this.retrieveAgencies();
  }

  retrieveAgencies(): void {
    this.AgencyService.getAll()
      .subscribe({
        next: (data) => {
          this.agencies = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  

  saveAgent(): void {
    const data = {
      name: this.agent.name,
      number: this.agent.number,
      agency: this.agent.agency,
      email:this.agent.email,
      description:this.agent.description
    };

    this.agentService.create(data,this.agent.agency)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
      this.router.navigate(['/listAgents']);

  }

  newAgent(): void {
    this.submitted = false;
    this.agent = {
      name: '',
      number: 0,
      agency: '',
      email:'',
      description:''
    };
  }

}