import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Maybe, Nothing } from 'purify-ts/Maybe';
import { Observable, of, Subscription } from 'rxjs';
import { signInWithEmailAndPasswordPressed } from 'src/app/application/session/form-sign-in/form-sign-in.action';
import { authCheckRequested } from 'src/app/application/session/session.action';
import { selectIsSignedIn } from 'src/app/application/session/session.selectors';
import { IAuth } from 'src/app/domain/session/i-auth';
import { User } from 'src/app/domain/session/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  isSignedIn$: Observable<boolean> = this.store.select(selectIsSignedIn);
  user$: Observable<User>;
  subscription: Subscription;

  constructor(private store: Store, private authService: IAuth) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.isSignedIn$.subscribe(async (value) => {
      if (value) {
        const user = await this.authService.getSignedInUser();
        if (user.isJust()) {
          this.user$ = of(user.extract());
          return;
        }
      }
      this.user$ = of(undefined);
    });

    this.store.dispatch(authCheckRequested());
  }
}
