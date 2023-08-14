import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  postImage(id: string, file: File) {
    const formData: FormData = new FormData();
    formData.append('userId', id);
    formData.append('image', file);
    return this.http.post<void>('/user-image', formData);
  }
}
