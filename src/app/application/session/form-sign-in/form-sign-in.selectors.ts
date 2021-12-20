import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FormSignInState } from './form-sign-in.reducer';

const selectFormSignIn =
  createFeatureSelector<Readonly<FormSignInState>>('formSignIn');

export const selectEmailAddress = createSelector(
  selectFormSignIn,
  (formSignIn) => formSignIn.emailAddress
);

export const selectPassword = createSelector(
  selectFormSignIn,
  (formSignIn) => formSignIn.password
);

export const selectShowErrorMessages = createSelector(
  selectFormSignIn,
  (formSignIn) => formSignIn.showErrorMessages
);

export const selectIsSubmitting = createSelector(
  selectFormSignIn,
  (formSignIn) => formSignIn.isSubmitting
);

export const selectAuthFailureSuccessOption = createSelector(
  selectFormSignIn,
  (formSignIn) => formSignIn.authFailureSuccessOption
);
