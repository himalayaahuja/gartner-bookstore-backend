import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidationErrors, FormControl, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ROUTE_HOME } from 'src/app/app.routes';
import { UtilityService } from 'src/app/services/utility.service';
import { AppState } from 'src/app/store';
import { LoginUser } from 'src/app/store/auth/actions/auth.actions';
import { AuthDTO } from 'src/app/store/auth/models/auth.model';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  authSubscription: Subscription | null = null;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private utilityService: UtilityService,
    private store: Store<AppState>,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  loginForm = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, this.utilityService.nonEmptyStringValidator()]],
  });

  ngOnInit(): void {
    this.authSubscription = this.store
      .select((state) => state.auth)
      .subscribe((authState) => {
        this.loading = authState.loading;
        if (authState.user && !authState.loading && !authState.error) {
          // login successful
          this.router.navigate([ROUTE_HOME]);
        } else if (!authState.user && !authState.loading && authState.error) {
          // error while login
          if (authState.error.error && authState.error.error.status === 401 && authState.error.error.code === 'UNAUTHORIZED') {
            // this.loginForm.reset();
            this._snackBar.open('Invalid email/password')._dismissAfter(3000);
          }
        }
      });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.store.dispatch(new LoginUser(this.loginForm.value as unknown as AuthDTO));
    } else {
      this.getFormValidationErrors();
    }
  }

  private getFormValidationErrors(): void {
    Object.keys(this.loginForm.controls).forEach((key: any) => {
      const controlErrors: ValidationErrors | null | undefined = this.loginForm.get(key)?.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach((keyError) => {
          // console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          this.loginForm.markAllAsTouched();
          // this.loginForm.controls.password.markAsTouched();
        });
      }
    });
  }
}
