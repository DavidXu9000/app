import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cat } from '../common/cat';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  baseUrl: string = "/api/cats";
  
  getCatById(id: number): Observable<Cat> {
    return this.http.get<Cat>(this.baseUrl + '/' + id);
  }

  getCatList(): Observable<Cat[]> {
    return this.http.get<Cat[]>(this.baseUrl + '/getByUserId');
  }

  postCat(cat: Cat): Observable<Cat> {
    alert("" + cat)
    return this.http.post<Cat>(this.baseUrl, cat);
  }

  patchCat(cat: Cat) {
    alert("" + cat)
    return this.http.patch<Cat>(this.baseUrl + '/' + cat.id, cat);
  }

  deleteCat(cat: Cat) {
    alert("" + cat)
    return this.http.delete<void>(this.baseUrl + '/' + cat.id);
  }

  postImage(id: number, file: File) {
    const formData: FormData = new FormData();
    formData.append('catId', id.toString());
    formData.append('image', file);
    return this.http.post<void>('http://localhost:8080/api/cat-image', formData, );
  }

}

interface GetResponseCats {
  _embedded: {
    cats: Cat[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}