import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService{

  constructor() { }
  createDb(reqInfo?: RequestInfo | undefined): {} | Observable<{}> | Promise<{}> {
    return {
      cats: [
        {id: 1, name: "Bob", userId: "asdf", picture: ""},
        {id: 2, name: "Joe", userId: "asdf", picture: ""},
      ],
      incidents: [
        {id: 1, catName: "Bob", catId: 1, userId:"asdf", date: new Date()},
        {id: 2, catName: "Bob", catId: 1, userId:"asdf", date: new Date()}
      ]
    }
  }
}
