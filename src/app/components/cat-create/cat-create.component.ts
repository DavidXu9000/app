import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Cat } from 'src/app/common/cat';
import { AuthService } from 'src/app/services/auth.service';
import { CatService } from 'src/app/services/cat.service';

@Component({
  selector: 'app-cat-create',
  templateUrl: './cat-create.component.html',
  styleUrls: ['./cat-create.component.css']
})
export class CatCreateComponent {
  @ViewChild("image", {static:false})
  inputVar!: ElementRef;
  updateForm!: FormGroup;
  selectedFile: any;

  formValid = true;

  constructor(private catService: CatService, private route: ActivatedRoute, private router: Router, public fb: FormBuilder, private authService: AuthService) { }


  ngOnInit(): void {
    this.updateForm = this.fb.nonNullable.group({
      name: new FormControl('', [Validators.required]),
    });
  }

  clearImage() {
    this.selectedFile = '';
    this.inputVar.nativeElement.value=''
  }

  changeFile(event: any) {
    this.selectedFile = event.target.files.item(0);
  }

  postCat() {
    alert("Creating cat")
    if (!this.updateForm.valid) {
      this.formValid = false;
      return;
    }
    this.formValid = true;
    this.catService.postCat(new Cat(0, this.authService.userId, '', this.updateForm.value.name)).pipe(catchError((error) => this.handleError(error))).subscribe((cat) => {
      if (this.selectedFile !== undefined && this.selectedFile !== null)
      this.catService.postImage(cat.id, this.selectedFile).pipe(catchError((error) => this.handleError(error))).subscribe(() => {
        this.router.navigateByUrl("/cat")
      });
    })
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status == 404) {
      this.router.navigateByUrl('/error/404');
    }
    return throwError(() => new Error('Could not process the request.'));
  }
}
