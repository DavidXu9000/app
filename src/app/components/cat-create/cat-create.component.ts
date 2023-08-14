import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Cat } from 'src/app/common/cat';
import { CatService } from 'src/app/services/cat.service';

@Component({
  selector: 'app-cat-create',
  templateUrl: './cat-create.component.html',
  styleUrls: ['./cat-create.component.css']
})
export class CatCreateComponent {
  updateForm!: FormGroup;
  selectedFile: any;

  constructor(private catService: CatService, private route: ActivatedRoute, private router: Router, public fb: FormBuilder) { }


  ngOnInit(): void {
    this.updateForm = this.fb.nonNullable.group({
      name: new FormControl('', [Validators.required]),
      picture: new FormControl('')
    });
  }
  

  changeFile(event: any) {
    this.selectedFile = event.target.files.item(0);
  }

  postCat() {
    this.catService.postCat(new Cat(0, '', '', this.updateForm.value.name)).pipe(catchError(this.handleError)).subscribe((cat) => {
      this.catService.postImage(cat.id, this.selectedFile).pipe(catchError(this.handleError)).subscribe();
    })
  }

  private handleError(error: HttpErrorResponse) {
    this.router.navigateByUrl('/error/404');
    return throwError(() => new Error('Could not process the request.'));
  }
}
