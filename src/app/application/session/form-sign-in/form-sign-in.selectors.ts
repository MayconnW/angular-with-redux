import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FormSignInState } from './form-sign-in.reducer';

const selectFormSignIn =
  createFeatureSelector<Readonly<FormSignInState>>('form-sign-in');

export const selectEmailAddress = createSelector(
  selectFormSignIn,
  (formSignIn) => formSignIn.emailAddress
);

export const selectPassword = createSelector(
  selectFormSignIn,
  (formSignIn) => formSignIn.password
);

// export const selectIsLoading2 = createSelector(() => true);

// export const selectIsLoading = createSelector(
//   selectSession,
//   (session) => session.loading
// );

// export const selectGetProfile = createSelector(
//   selectSession,
//   selectIsSignedIn,
//   (sessions, isSignedIn) => (isSignedIn ? sessions.user : undefined)
// );

// export const selectGetUserName = createSelector(
//   selectGetProfile,
//   (user) => user?.name || ''
// );

// export const selectGetUser = createSelector(
//   selectSession,
//   (sessions) => sessions.user
// );
