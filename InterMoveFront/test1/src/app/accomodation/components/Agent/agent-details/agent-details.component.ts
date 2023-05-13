import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agent } from 'src/app/accomodation/models/agent.model';
import { AgencyService } from 'src/app/accomodation/services/agency.service';
import { AgentService } from 'src/app/accomodation/services/agent.service';
import { Agency } from 'src/app/accomodation/models/agency.model';

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.css']
})
export class AgentDetailsComponent implements OnInit {
  agencies?: Agency[];
  agencyN?: '';
  @Input() viewMode = false;

  @Input() currentAgent: Agent = {
    id: '',
    name: '',
    number: 0,
    agencyName: '',
    agency: 0,
    email: '',
    description: ''
  };
  
  message = '';

  constructor(
    private agentService: AgentService,
    private AgencyService: AgencyService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getAgent(this.route.snapshot.params["id"]);
    }
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

  getAgent(id: string): void {
    this.agentService.get(id)
      .subscribe({
        next: (data) => {
          this.currentAgent = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  updateAgent(): void {
    this.message = '';
    
    this.agentService.update(this.currentAgent)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This agent was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteAgent(): void {
    this.agentService.delete(this.currentAgent.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/listAgents']);
        },
        error: (e) => console.error(e)
      });
  }

}
