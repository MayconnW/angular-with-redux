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

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class Auth implements IAuth {
  public async getSignedInUser(): Promise<Maybe<User>> {
    await sleep(2000);
    if (user) {
      return Just(user);
    }
    return Just({ id: '1', name: 'Teste' });
  }

  public async registerWithEmailAndPassword(props: {
    fullName: string;
    emailAddress: EmailAddress;
    cpf: Cpf;
    password: Password;
  }): Promise<Either<AuthFailure, void>> {
    await sleep(2000);
    const { cpf } = props;
    if (cpf.getOrCrash() === '12312312312') {
      return Left(AuthFailure.serverError());
    }
    user = {
      id: '123',
      name: 'teste',
    };

    return Right(null);
  }

  public async signInWithEmailAndPassword(props: {
    emailAddress: EmailAddress;
    password: Password;
  }): Promise<Either<AuthFailure, void>> {
    await sleep(2000);
    if (props.password.getOrCrash() !== '12345678A') {
      return Left(AuthFailure.invalidEmailAndPasswordCombination());
    }

    user = {
      id: '123',
      name: props.emailAddress.getOrCrash(),
    };

    return Right(null);
  }

  public async signInWithGoogle(): Promise<Either<AuthFailure, void>> {
    user = {
      id: '123',
      name: 'Google',
    };
    await sleep(2000);

    return Right(null);
  }

  public async finishSignUpWithSocialMedia(props: {
    fullName: string;
    emailAddress: EmailAddress;
    cpf: Cpf;
  }): Promise<Either<AuthFailure, void>> {
    user = {
      id: '123',
      name: props.emailAddress.getOrCrash(),
    };
    await sleep(2000);
    return Right(null);
  }

  public async signOut(): Promise<void> {
    user = undefined;
    return;
  }
}
