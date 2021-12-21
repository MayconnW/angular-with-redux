//Lembrar de setar o env para fake daqui de dentro.
//Ainda não está via env o fake, está via texto direto no arquivo

import { authProvider } from 'src/app/infrastructure/providers';
import { AuthFailureTypes } from './failure';
import { IAuth } from './i-auth';
import { Cpf, EmailAddress, Password } from './value-objects';

describe('Auth interface test', () => {
  it('should return the signed in user then sign out', async () => {
    const expectedUser = {
      id: '123',
      name: 'test@email.com',
    };

    const auth: IAuth = new authProvider.useClass();

    const authStatus = await auth.signInWithEmailAndPassword({
      emailAddress: new EmailAddress(expectedUser.name),
      password: new Password('12345678A'),
    });
    expect(authStatus.isRight()).toEqual(true);

    let user = await auth.getSignedInUser();
    expect(user.isJust()).toEqual(true);
    expect(user.extract()).toEqual(expectedUser);

    await auth.signOut();
    user = await auth.getSignedInUser();
    expect(user.isNothing()).toEqual(true);
  });
});

describe('Auth interface test', () => {
  it('should be able to sign in with google', async () => {
    const expectedUser = {
      id: '123',
      name: 'Google',
    };

    const auth: IAuth = new authProvider.useClass();

    const authStatus = await auth.signInWithGoogle();
    expect(authStatus.isRight()).toEqual(true);

    const user = await auth.getSignedInUser();
    expect(user.isJust()).toEqual(true);
    expect(user.extract()).toEqual(expectedUser);
  });
});

describe('Auth interface test', () => {
  it('should not sign in with wrong user', async () => {
    const auth: IAuth = new authProvider.useClass();

    const authStatus = await auth.signInWithEmailAndPassword({
      emailAddress: new EmailAddress('wrong-user@email.com'),
      password: new Password('12345678X'),
    });

    expect(authStatus.isLeft()).toEqual(true);
    expect(authStatus.leftToMaybe().extract().type).toEqual(
      AuthFailureTypes.invalidEmailAndPasswordCombination
    );
  });
});

describe('Auth interface test', () => {
  it('should be able to register a new user with email and password', async () => {
    const user = {
      cpf: new Cpf('32580718028'),
      emailAddress: new EmailAddress('test@email.com'),
      fullName: 'Test Full Name',
      password: new Password('12345678A'),
    };

    const auth: IAuth = new authProvider.useClass();

    const registerStatus = await auth.registerWithEmailAndPassword(user);

    expect(registerStatus.isRight()).toEqual(true);
  });
});
