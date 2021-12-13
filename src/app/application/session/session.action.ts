import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/domain/session/user';

//export const signIn = createAction('[Counter Component] Increment');
export const signInRequest = createAction(
  '[Session] SignInRequest',
  props<{ email: string; password: string }>()
);

export const signInSuccess = createAction(
  '[Session] SignInSuccess',
  props<{ user: User }>()
);

export const signInFail = createAction('[Session] SignInFail');
