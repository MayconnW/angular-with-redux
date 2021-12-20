import { Either } from 'purify-ts/Either';
import { Maybe } from 'purify-ts/Maybe';
import { AuthFailure } from 'src/app/domain/session/failure';
import { IAuth } from 'src/app/domain/session/i-auth';
import { User } from 'src/app/domain/session/user';

export class Auth implements IAuth {
  public getSignedInUser(): Promise<Maybe<User>> {
    throw new Error('Method not implemented.');
  }
  public registerWithEmailAndPassword(): Promise<Either<AuthFailure, void>> {
    throw new Error('Method not implemented.');
  }
  public signInWithEmailAndPassword(): Promise<Either<AuthFailure, void>> {
    throw new Error('Method not implemented.');
  }
  public signInWithGoogle(): Promise<Either<AuthFailure, void>> {
    throw new Error('Method not implemented.');
  }
  public finishSignUpWithSocialMedia(): Promise<Either<AuthFailure, void>> {
    throw new Error('Method not implemented.');
  }
  public signOut(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
