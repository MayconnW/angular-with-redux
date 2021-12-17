import { SessionState, sessionReducer } from './session/session.reducer';
import {
  FormSignInState,
  formSignInReducer,
} from './session/form-sign-in/form-sign-in.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SessionEffects } from './session/session.effects';
import { FormSignInEffects } from './session/form-sign-in/form-sign-in.effects';

export interface AppState {
  session: Readonly<SessionState>;
  formSignIn: Readonly<FormSignInState>;
}

export const storeModule = StoreModule.forRoot<AppState>({
  session: sessionReducer,
  formSignIn: formSignInReducer,
});

export const effectsModule = EffectsModule.forRoot([
  SessionEffects,
  FormSignInEffects,
]);
