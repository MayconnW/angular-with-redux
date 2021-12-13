import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { signInRequest } from '../application/session/session.action';
import {
  selectGetUser,
  selectIsLoading,
  selectIsSignedIn,
} from '../application/session/session.selectors';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isLoading = this.store.select(selectIsLoading);
  user = this.store.select(selectGetUser);
  isSignedIn = this.store.select(selectIsSignedIn);

  constructor(private store: Store) {}

  onSignIn() {
    this.store.dispatch(signInRequest({ email: 'm@m.m', password: '123' }));
  }
}
