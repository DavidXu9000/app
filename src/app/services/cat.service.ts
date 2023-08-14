import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cat } from '../common/cat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "/api/cats";
  
  getCatById(id: number): Observable<Cat> {
    return this.http.get<Cat>(this.baseUrl + '/' + id);
  }

  getCatListPaginate(pageNum: number, pageSize: number): Observable<GetResponseCats> {
    let queryString = `page=${pageNum}&size=${pageSize}`;
    return this.http.get<GetResponseCats>(this.baseUrl + queryString);
  }

  getCatList(): Observable<GetResponseCats> {
    return this.http.get<GetResponseCats>(this.baseUrl);
  }

  postCat(cat: Cat): Observable<Cat> {
    return this.http.post<Cat>(this.baseUrl, cat);
  }

  patchCat(cat: Cat) {
    return this.http.patch<Cat>(this.baseUrl + '/' + cat.id, cat);
  }

  deleteCat(cat: Cat) {
    return this.http.delete<void>(this.baseUrl + '/' + cat.id);
  }

  postImage(id: number, file: File) {
    const formData: FormData = new FormData();
    formData.append('catId', id.toString());
    formData.append('image', file);
    return this.http.post<void>('/cat-image', formData);
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