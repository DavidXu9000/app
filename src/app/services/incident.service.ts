import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Incident } from '../common/incident';
import { Cat } from '../common/cat';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  baseUrl: string = '/api/incidents'

  getIncidentPaginate(page: number, pageSize: number) {
    let queryString = `?page=${page}&pageSize=${pageSize}`;
    return this.http.get<GetResponseIncidents>(this.baseUrl + queryString);
  }

  getIncidents() {
    return this.http.get<GetResponseIncidents>(this.baseUrl + '/search/findByCatUser?catUser=' + this.authService.userId);
  }

  getIncidentById(id: number) {
    return this.http.get<Incident>(this.baseUrl + '/' + id);
  }

  getCatByIncidentId(id: number) {
    return this.http.get<Cat>(this.baseUrl + '/' + id + '/cat')
  }

  patchIncident(incident: Incident) {
    return this.http.patch<Incident>(this.baseUrl + '/' + incident.id, incident);
  }

  postIncident(incident: Incident) {
    return this.http.patch<void>(this.baseUrl, incident);
  }

  deleteIncident(incident: Incident) {
    return this.http.delete<void>(this.baseUrl + '/' + incident.id);
  }
}

interface GetResponseIncidents {
  _embedded: {
    incidents: Incident[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}