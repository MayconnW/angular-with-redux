import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SessionState } from './session.reducer';

const selectSession = createFeatureSelector<Readonly<SessionState>>('session');

export const selectIsSignedIn = createSelector(
  selectSession,
  (session) => !!session.user
);

export const selectGetUser = createSelector(
  selectSession,
  (session) => session.user
);

export const selectIsLoading = createSelector(
  selectSession,
  (session) => session.loading
);
