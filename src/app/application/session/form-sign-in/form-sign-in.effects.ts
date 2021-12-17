import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap, tap } from 'rxjs/operators';
import { IAuth } from 'src/app/domain/session/i-auth';
import {
  signInWithEmailAndPasswordPressed,
  signInSubmitResponse,
} from './form-sign-in.action';
import { selectEmailAddress, selectPassword } from './form-sign-in.selectors';
import { Just } from 'purify-ts/Maybe';

// on<SignInWithEmailAndPasswordPressed>((event, emit) async {
//   Either<AuthFailure, Unit>? failureOrSuccess;
//   final isEmailValid = state.emailAddress.isValid();
//   final isPasswordlValid = state.password.isValid();

//   if (isEmailValid && isPasswordlValid) {
//     emit(state.copyWith(
//       isSubmitting: true,
//       authFailureSuccessOption: none(),
//     ));

//     failureOrSuccess = await _authFacade.signInWithEmailAndPassword(
//       emailAddress: state.emailAddress,
//       password: state.password,
//     );
//   }

//   emit(state.copyWith(
//     isSubmitting: false,
//     showErrorMessages: true,
//     authFailureSuccessOption: optionOf(failureOrSuccess),
//   ));
// });

@Injectable()
export class FormSignInEffects {
  signInWithEmailAndPasswordPressed$ = createEffect(() => {
    console.log('Remover depois de arrumar o eslint');
    return this.actions$.pipe(
      ofType(signInWithEmailAndPasswordPressed),
      concatLatestFrom(() => [
        this.store.select(selectEmailAddress),
        this.store.select(selectPassword),
      ]),
      switchMap(async ([, emailAddress, password]) => {
        const signInStatus = await this.auth.signInWithEmailAndPassword({
          emailAddress,
          password,
        });
        return signInStatus;
      }),
      mergeMap(async (signInStatus) =>
        signInSubmitResponse({ authFailureSuccess: Just(signInStatus) })
      )
    );
  });

  // signOut$ = createEffect(() => {
  //   console.log('Remover depois de arrumar o eslint');
  //   return this.actions$.pipe(
  //     ofType(signOutRequest),
  //     switchMap(async (action) => {
  //       await sleep(2000);
  //     }),
  //     mergeMap(async () => signOutSuccess()),
  //     catchError((error) => of(signInFail()))
  //   );
  // });
  constructor(
    private actions$: Actions,
    private auth: IAuth,
    private store: Store
  ) {}
}
