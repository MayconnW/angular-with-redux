import { createAction, props } from '@ngrx/store';
import { Either } from 'purify-ts/Either';
import { Maybe } from 'purify-ts/Maybe';
import { AuthFailure } from 'src/app/domain/session/failure';
import { User } from 'src/app/domain/session/user';

export const emailChanged = createAction(
  '[FormSignIn] emailChanged',
  props<{ email: string }>()
);

export const passwordChanged = createAction(
  '[FormSignIn] passwordChanged',
  props<{ password: string }>()
);

export const signInWithEmailAndPasswordPressed = createAction(
  '[FormSignIn] signInWithEmailAndPasswordPressed'
);

export const formSubmittingStatus = createAction(
  '[FormSignIn] formSubmittingStatus',
  props<{ isSubmitting: boolean }>()
);

export const signInSubmitResponse = createAction(
  '[FormSignIn] signInSubmitResponse',
  props<{ authFailureSuccess: Maybe<Either<AuthFailure, void>> }>()
);
