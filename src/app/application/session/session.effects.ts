import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { signInFail, signInRequest, signInSuccess } from './session.action';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

@Injectable()
export class SessionEffects {
  signIn$ = createEffect(() => {
    console.log('Remover depois de arrumar o eslint');
    return this.actions$.pipe(
      ofType(signInRequest),
      switchMap(async (action) => {
        await sleep(2000);
        return { user: { id: 'test', name: action.email } };
      }),
      mergeMap(async ({ user }) => signInSuccess({ user })),
      catchError((error) => of(signInFail()))
    );
  });
  constructor(private actions$: Actions) {}
}
