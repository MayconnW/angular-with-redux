import { Either } from 'purify-ts/Either';
import { Maybe } from 'purify-ts/Maybe';
import { AuthFailure } from './failure';
import { User } from './user';
import { Cpf, Password, EmailAddress } from './value-objects';

export abstract class IAuth {
  public abstract getSignedInUser(): Promise<Maybe<User>>;

  public abstract registerWithEmailAndPassword(props: {
    fullName: string;
    emailAddress: EmailAddress;
    cpf: Cpf;
    password: Password;
  }): Promise<Either<AuthFailure, void>>;

  public abstract signInWithEmailAndPassword(props: {
    emailAddress: EmailAddress;
    password: Password;
  }): Promise<Either<AuthFailure, void>>;

  public abstract signInWithGoogle(): Promise<Either<AuthFailure, void>>;

  // signInWithApple(): Promise<Either<AuthFailure, void>>;

  // signInWithFacebook(): Promise<Either<AuthFailure, void>>;

  public abstract finishSignUpWithSocialMedia(props: {
    fullName: string;
    emailAddress: EmailAddress;
    cpf: Cpf;
  }): Promise<Either<AuthFailure, void>>;

  public abstract signOut(): Promise<void>;
}
