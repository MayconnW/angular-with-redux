import { createReducer, on } from '@ngrx/store';

import * as actions from './session.action';

export enum SignStatus {
  prestine,
  authenticated,
  unauthenticated,
}

export type SessionState = { signStatus: SignStatus };

export const initialState: Readonly<SessionState> = {
  signStatus: SignStatus.prestine,
};

export const sessionReducer = createReducer(
  initialState,
  on(
    actions.authenticated,
    (): SessionState => ({ signStatus: SignStatus.authenticated })
  ),
  on(
    actions.unauthenticated,
    (): SessionState => ({ signStatus: SignStatus.unauthenticated })
  )
);
