import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs/operators';
import { IAuth } from 'src/app/domain/session/i-auth';
import {
  signInWithEmailAndPasswordPressed,
  signInSubmitResponse,
} from './form-sign-in.action';
import { selectEmailAddress, selectPassword } from './form-sign-in.selectors';
import { Just, Nothing } from 'purify-ts/Maybe';

@Injectable()
export class FormSignInEffects {
  signInWithEmailAndPasswordPressed$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signInWithEmailAndPasswordPressed),
      concatLatestFrom(() => [
        this.store.select(selectEmailAddress),
        this.store.select(selectPassword),
      ]),
      mergeMap(async ([, emailAddress, password]) => {
        if (!emailAddress.isValid()) {
          return signInSubmitResponse({ authFailureSuccess: Nothing });
        }
        if (!password.isValid()) {
          return signInSubmitResponse({ authFailureSuccess: Nothing });
        }
        const signInStatus = await this.auth.signInWithEmailAndPassword({
          emailAddress,
          password,
        });
        return signInSubmitResponse({ authFailureSuccess: Just(signInStatus) });
      })
    );
  });
  constructor(
    private actions$: Actions,
    private auth: IAuth,
    private store: Store
  ) {}
}
