import { createReducer, on } from '@ngrx/store';

import { signInRequest, signInSuccess, signInFail } from './session.action';
import { User } from '../../domain/session/user';

export type SessionState = { user: User; loading: boolean };

export const initialState: Readonly<SessionState> = {
  user: undefined,
  loading: false,
};

export const sessionReducer = createReducer(
  initialState,
  on(
    signInRequest,
    (state, { email, password }): SessionState => ({ ...state, loading: true })
  ),
  on(
    signInSuccess,
    (state, { user }): SessionState => ({ loading: false, user })
  ),
  on(signInFail, (state): SessionState => ({ loading: false, user: undefined }))
);
