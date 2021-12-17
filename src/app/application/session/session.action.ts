import { createAction } from '@ngrx/store';

export const authCheckRequested = createAction('[Session] authCheckRequested');

export const authenticated = createAction('[Session] authenticated');

export const unauthenticated = createAction('[Session] unauthenticated');
