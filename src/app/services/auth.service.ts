import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated: boolean = false;
  userId: string = '';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post('/api/login', { 'id': 0, 'username': username, 'password': password }, { responseType: "text" }).pipe(catchError((error) => this.handleError(error)), tap((username) => {
      alert("" + username)
      if (username !== '') {
        this.userId = username
        this.isAuthenticated = true;
      } else {
        this.userId = '';
        this.isAuthenticated = false;
      }
    }))
  }

  handleError(error: HttpErrorResponse) {
    return new Observable<string>((subscriber) => { subscriber.next('') });
  }

  logout() {
    this.userId = '';
    this.isAuthenticated = false;
  }
}
