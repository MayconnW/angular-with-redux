import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SessionState, SignStatus } from './session.reducer';

const selectSession = createFeatureSelector<Readonly<SessionState>>('session');

export const selectIsSignedIn = createSelector(
  selectSession,
  (session) => session.signStatus === SignStatus.authenticated
);
