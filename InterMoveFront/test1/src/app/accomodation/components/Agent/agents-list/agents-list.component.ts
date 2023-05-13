import { Component, OnInit } from '@angular/core';
import { Agent } from 'src/app/accomodation/models/agent.model';
import { AgentService } from 'src/app/accomodation/services/agent.service';

@Component({
  selector: 'app-agents-list',
  templateUrl: './agents-list.component.html',
  styleUrls: ['./agents-list.component.css']
})
export class AgentsListComponent implements OnInit {

  agents?: Agent[];
  currentAgent: Agent = {};
  currentIndex = -1;
  name = '';
  searchString = '';

  constructor(private AgentService: AgentService) { }

  ngOnInit(): void {
    this.retrieveAgencies();
  }

  retrieveAgencies(): void {
    this.AgentService.getAll()
      .subscribe({
        next: (data) => {
          this.agents = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveAgencies();
    this.currentAgent = {};
    this.currentIndex = -1;
  }

  setActiveAgency(agent: Agent, index: number): void {
    this.currentAgent = agent;
    this.currentIndex = index;
  }

  removeAllAgencys(): void {
    this.AgentService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentAgent = {};
    this.currentIndex = -1;

    this.AgentService.findByTitle(this.name)
      .subscribe({
        next: (data) => {
          this.agents = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
