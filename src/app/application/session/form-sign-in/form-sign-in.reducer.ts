import { createReducer, on } from '@ngrx/store';

import {
  emailChanged,
  passwordChanged,
  formSubmittingStatus,
  signInSubmitResponse,
  signInWithEmailAndPasswordPressed,
} from './form-sign-in.action';
import { EmailAddress, Password } from 'src/app/domain/session/value-objects';
import { Maybe, Nothing } from 'purify-ts/Maybe';
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
  emailAddress: new EmailAddress('masdasd@asdasd.masd'),
  password: new Password('12345678'),
  isSubmitting: false,
  showErrorMessages: false,
  authFailureSuccessOption: Nothing,
};

export const formSignInReducer = createReducer(
  initialState,
  on(emailChanged, (state, { email }): FormSignInState => {
    return {
      ...state,
      emailAddress: new EmailAddress(email),
      authFailureSuccessOption: Nothing,
    };
  }),
  on(
    passwordChanged,
    (state, { password }): FormSignInState => ({
      ...state,
      password: new Password(password),
      authFailureSuccessOption: Nothing,
    })
  ),
  on(
    signInWithEmailAndPasswordPressed,
    (state): FormSignInState => ({
      ...state,
      showErrorMessages: true,
      isSubmitting: true,
    })
  ),
  on(
    formSubmittingStatus,
    (state, { isSubmitting }): FormSignInState => ({
      ...state,
      isSubmitting,
      authFailureSuccessOption: Nothing,
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
