import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { Cat } from 'src/app/common/cat';
import { CatService } from 'src/app/services/cat.service';

@Component({
  selector: 'app-cat-listing',
  templateUrl: './cat-listing.component.html',
  styleUrls: ['./cat-listing.component.css']
})
export class CatListingComponent implements OnInit {
  cats: Cat[] = [];
  componentError: boolean = false;

  constructor(private catService: CatService, private router: Router) { }

  ngOnInit(): void {
    this.catService.getCatList().pipe(catchError((error) => this.handleError(error))).subscribe((response) => {
      this.cats = response;
    })
  }
  private handleError(error: HttpErrorResponse) {
    this.componentError = true;
    return throwError(() => new Error('Could not process the request.'));
  }
}
