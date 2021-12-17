import { createReducer, on, State } from '@ngrx/store';

import {
  emailChanged,
  passwordChanged,
  formSubmittingStatus,
  signInSubmitResponse,
} from './form-sign-in.action';
import { EmailAddress, Password } from 'src/app/domain/session/value-objects';
import { Maybe } from 'purify-ts/Maybe';
import { Either } from 'purify-ts/Either';
import { AuthFailure } from 'src/app/domain/session/failure';

export type FormSignInState = {
  emailAddress: EmailAddress;
  password: Password;
  isSubmitting: boolean;
  showErrorMessages: boolean;
  authFailureSuccessOption: Maybe<Either<AuthFailure, void>>;
};

export const initialState: Readonly<FormSignInState> = {
  emailAddress: new EmailAddress('m@m.m'),
  password: new Password('12345678'),
  isSubmitting: false,
  showErrorMessages: false,
  authFailureSuccessOption: null,
};

export const formSignInReducer = createReducer(
  initialState,
  on(
    emailChanged,
    (state, { email }): FormSignInState => ({
      ...state,
      emailAddress: new EmailAddress(email),
      authFailureSuccessOption: null,
    })
  ),
  on(
    passwordChanged,
    (state, { password }): FormSignInState => ({
      ...state,
      password: new Password(password),
      authFailureSuccessOption: null,
    })
  ),
  on(
    formSubmittingStatus,
    (state, { isSubmitting }): FormSignInState => ({
      ...state,
      isSubmitting,
      authFailureSuccessOption: null,
    })
  ),
  on(
    signInSubmitResponse,
    (state, { authFailureSuccess }): FormSignInState => ({
      ...state,
      isSubmitting: false,
      showErrorMessages: true,
      authFailureSuccessOption: authFailureSuccess,
    })
  )
);
