import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  validForm = true;
  loginError = true;

  loginForm = this.fb.nonNullable.group(
    {username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)}
  )

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  login() {
    if (!this.loginForm.valid) {
      this.validForm = false;
      return;
    }
    this.validForm = true;
    this.authService.login(this.loginForm.value.username!, this.loginForm.value.password!).pipe(catchError(this.handleError)).subscribe((username) => {
      this.loginError = username !== ''
      if (this.loginError) this.router.navigateByUrl("/home")

    });
  }

  handleError(error: HttpErrorResponse) {
    return new Observable<string>((subscriber) => {subscriber.next('')});
  }

}
