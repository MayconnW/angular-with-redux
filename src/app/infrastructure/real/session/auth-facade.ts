import { Either, Left, Right } from 'purify-ts/Either';
import { Just, Maybe } from 'purify-ts/Maybe';
import { AuthFailure } from 'src/app/domain/session/failure';
import { IAuth } from 'src/app/domain/session/i-auth';
import { User } from 'src/app/domain/session/user';
import {
  EmailAddress,
  Cpf,
  Password,
} from 'src/app/domain/session/value-objects';

let user: User | undefined;

export class Auth implements IAuth {
  public getSignedInUser(): Promise<Maybe<User>> {
    throw new Error('Method not implemented.');
  }
  public registerWithEmailAndPassword(props: {
    fullName: string;
    emailAddress: EmailAddress;
    cpf: Cpf;
    password: Password;
  }): Promise<Either<AuthFailure, void>> {
    throw new Error('Method not implemented.');
  }
  public signInWithEmailAndPassword(props: {
    emailAddress: EmailAddress;
    password: Password;
  }): Promise<Either<AuthFailure, void>> {
    throw new Error('Method not implemented.');
  }
  public signInWithGoogle(): Promise<Either<AuthFailure, void>> {
    throw new Error('Method not implemented.');
  }
  public finishSignUpWithSocialMedia(props: {
    fullName: string;
    emailAddress: EmailAddress;
    cpf: Cpf;
  }): Promise<Either<AuthFailure, void>> {
    throw new Error('Method not implemented.');
  }
  public signOut(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
