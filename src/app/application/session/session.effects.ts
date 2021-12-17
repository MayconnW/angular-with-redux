import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, switchMap } from 'rxjs/operators';
import { IAuth } from 'src/app/domain/session/i-auth';
import {
  authCheckRequested,
  authenticated,
  unauthenticated,
} from './session.action';

@Injectable()
export class SessionEffects {
  authCheckRequested$ = createEffect(() => {
    console.log('Remover depois de arrumar o eslint');
    return this.actions$.pipe(
      ofType(authCheckRequested),
      switchMap(async () => {
        const signedUser = await this.auth.getSignedInUser();
        return signedUser;
      }),
      mergeMap(async (user) => {
        if (user.isNothing()) {
          return unauthenticated();
        }
        return authenticated();
      })
    );
  });

  constructor(private actions$: Actions, private auth: IAuth) {}
}
