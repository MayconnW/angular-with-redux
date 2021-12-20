import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Either } from 'purify-ts/Either';
import { Maybe } from 'purify-ts/Maybe';
import { Observable, of, Subscription } from 'rxjs';
import {
  emailChanged,
  passwordChanged,
  signInWithEmailAndPasswordPressed,
} from 'src/app/application/session/form-sign-in/form-sign-in.action';
import {
  selectAuthFailureSuccessOption,
  selectEmailAddress,
  selectIsSubmitting,
  selectPassword,
  selectShowErrorMessages,
} from 'src/app/application/session/form-sign-in/form-sign-in.selectors';
import { AuthFailure } from 'src/app/domain/session/failure';
import { EmailAddress, Password } from 'src/app/domain/session/value-objects';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit, OnDestroy {
  subscription: Subscription;
  email$: Observable<EmailAddress>;
  password$: Observable<Password>;
  showErrorMessages$: Observable<boolean>;
  isSubmitting$: Observable<boolean>;
  authFailureSuccessOption$: Observable<Maybe<Either<AuthFailure, void>>>;
  formError$: Observable<string>;

  constructor(private store: Store, private router: Router) {
    this.email$ = this.store.select(selectEmailAddress);
    this.password$ = this.store.select(selectPassword);
    this.showErrorMessages$ = this.store.select(selectShowErrorMessages);
    this.isSubmitting$ = this.store.select(selectIsSubmitting);
    this.authFailureSuccessOption$ = this.store.select(
      selectAuthFailureSuccessOption
    );
  }

  public onEmailChange(value: string): void {
    this.store.dispatch(emailChanged({ email: value }));
  }

  public onPasswordChange(value: string): void {
    this.store.dispatch(passwordChanged({ password: value }));
  }

  public async onLoginClick() {
    this.store.dispatch(signInWithEmailAndPasswordPressed());
  }

  ngOnInit() {
    this.subscription = this.authFailureSuccessOption$.subscribe((maybe) => {
      this.formError$ = of('');
      if (maybe.isJust()) {
        const authFailureSuccessOption = maybe.extract();
        if (authFailureSuccessOption.isLeft()) {
          this.formError$ = of(authFailureSuccessOption.extract().errorMessage);
          return;
        }
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
