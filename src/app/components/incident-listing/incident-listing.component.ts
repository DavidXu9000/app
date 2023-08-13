import { Component, OnInit } from '@angular/core';
import { Incident } from 'src/app/common/incident';
import { IncidentService } from 'src/app/services/incident.service';

@Component({
  selector: 'app-incident-listing',
  templateUrl: './incident-listing.component.html',
  styleUrls: ['./incident-listing.component.css']
})
export class IncidentListingComponent implements OnInit {
  incidents!: Incident[]

  constructor(private incidentService: IncidentService) { }
  
  ngOnInit(): void {
    this.incidentService.getIncidents().subscribe((response) => {
      this.incidents = response._embedded.incidents;
    })
  }
}
