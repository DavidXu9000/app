import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, catchError, throwError } from 'rxjs';
import { Cat } from 'src/app/common/cat';

import { CatService } from 'src/app/services/cat.service';

@Component({
  selector: 'app-cat-detail',
  templateUrl: './cat-detail.component.html',
  styleUrls: ['./cat-detail.component.css']
})
export class CatDetailComponent implements OnInit {
  updateForm!: FormGroup;
  selectedFile: any;

  constructor(private catService: CatService, private route: ActivatedRoute, private router: Router, public fb: FormBuilder) { }
  cat!: Cat;


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === undefined || !Number.isInteger(id)) {
      this.router.navigateByUrl('/error/404');
      return;
    }
    this.catService.getCatById(parseInt(id!)).pipe(catchError(this.handleError)).subscribe((cat) => {
      this.cat = cat;
      this.updateForm = this.fb.nonNullable.group({
        name: new FormControl(this.cat.name, [Validators.required]),
        picture: new FormControl('')
      })
    });
  }

  changeFile(event: any) {
    this.selectedFile = event.target.files.item(0);
  }

  patchCat() {
    this.catService.patchCat(new Cat(0, this.cat!.userId, '', this.updateForm.value.name)).pipe(catchError(this.handleError)).subscribe((cat) => {
      this.cat = cat;
      this.catService.postImage(this.cat!.id, this.selectedFile).pipe(catchError(this.handleError)).subscribe(() => {
        this.catService.getCatById(this.cat!.id).pipe(catchError(this.handleError)).subscribe((cat) => {
          this.cat = cat;
        })
      })
    });
  }

  deleteCat() {
    this.catService.deleteCat(this.cat!).pipe(catchError(this.handleError)).subscribe(() => {
      this.router.navigateByUrl('/cat')
    });
  }

  private handleError(error: HttpErrorResponse) {
    this.router.navigateByUrl('/error/404');
    return throwError(() => new Error('Could not process the request.'));
  }
}
