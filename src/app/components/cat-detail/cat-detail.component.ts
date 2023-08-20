import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild("fileinput", { static: false })
  inputVar!: ElementRef;

  updateForm!: FormGroup;
  selectedFile: any;
  formValid = true;


  constructor(private catService: CatService, private route: ActivatedRoute, private router: Router, public fb: FormBuilder) { }
  cat!: Cat;


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === undefined || !Number.isInteger(parseInt(id!))) {
      this.router.navigateByUrl('/error/404');
      return;
    }
    this.catService.getCatById(parseInt(id!)).pipe(catchError((error) => this.handleError(error))).subscribe((cat) => {
      this.cat = cat;
      this.updateForm = this.fb.nonNullable.group({
        name: new FormControl(this.cat.name, [Validators.required]),
        imageRemove: new FormControl(false)
      })
    });
  }

  disableUpload() {
    if (this.updateForm.value.imageRemove) {
      this.clearImage();
      this.inputVar.nativeElement.disabled = true;
    }
    else {
      this.inputVar.nativeElement.disabled =false;
    }
  }

  changeFile(event: any) {
    this.selectedFile = event.target.files.item(0);
  }

  clearImage() {
    this.selectedFile = '';
    this.inputVar.nativeElement.value = "";
  }

  patchCat() {
    if (!this.updateForm.valid) {
      this.formValid = false;
      return;
    }
    this.formValid = true;
    this.catService.patchCat(new Cat(this.cat.id, this.cat.userId, this.updateForm.value.imageRemove ? '' : this.cat.imageUrl, this.updateForm.value.name)).pipe(catchError((error) => this.handleError(error))).subscribe((cat) => {
      this.cat = cat;
      if (this.selectedFile !== '' && !this.updateForm.value.imageRemove) {
        this.catService.postImage(this.cat!.id, this.selectedFile).pipe(catchError((error) => this.handleError(error))).subscribe(() => {
          this.catService.getCatById(this.cat!.id).pipe(catchError((error) => this.handleError(error))).subscribe((cat) => {
            this.cat = cat;
          })
        })
      }
    });
  }

  deleteCat() {
    this.catService.deleteCat(this.cat!).pipe(catchError((error) => this.handleError(error))).subscribe(() => {
      this.router.navigateByUrl('/home')
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status == 404) {
      this.router.navigateByUrl("/error/404")
    }
    return throwError(() => new Error('Could not process the request.'));
  }
}
