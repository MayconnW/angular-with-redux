import {
  selectAuthFailureSuccessOption,
  selectEmailAddress,
  selectIsSubmitting,
  selectPassword,
  selectShowErrorMessages,
} from './form-sign-in.selectors';
import { AppState } from '../../app.state';
import { Just, Nothing } from 'purify-ts/Maybe';
import { EmailAddress, Password } from 'src/app/domain/session/value-objects';
import {
  AuthFailure,
  AuthFailureTypes,
  PasswordFailureTypes,
} from 'src/app/domain/session/failure';
import { Left, Right } from 'purify-ts/Either';

describe('Form Sign in selectors', () => {
  const initialState: Pick<AppState, 'formSignIn'> = {
    formSignIn: {
      authFailureSuccessOption: Nothing,
      emailAddress: new EmailAddress(''),
      isSubmitting: false,
      password: new Password(''),
      showErrorMessages: false,
    },
  };

  it('should return invalid email', () => {
    let result = selectEmailAddress.projector(initialState.formSignIn);
    expect(result.isValid()).toEqual(false);
    result = selectEmailAddress.projector({
      ...initialState.formSignIn,
      emailAddress: new EmailAddress('invalid-email'),
    });
    expect(result.isValid()).toEqual(false);
  });

  it('should return valid email', () => {
    const expectedEmail = 'valid@email.com';
    const result = selectEmailAddress.projector({
      ...initialState.formSignIn,
      emailAddress: new EmailAddress(expectedEmail),
    });
    expect(result.isValid()).toEqual(true);
    const email = result.getOrCrash();
    expect(email).toEqual(expectedEmail);
  });

  it('should return invalid password', () => {
    let result = selectPassword.projector(initialState.formSignIn);
    expect(result.isValid()).toEqual(false);

    result = selectPassword.projector({
      ...initialState.formSignIn,
      password: new Password('12345'),
    });
    expect(result.isValid()).toEqual(false);
    const left = result.value.leftToMaybe();
    expect(left.isJust()).toEqual(true);
    const failure = left.extract();
    expect(failure.type).toEqual(PasswordFailureTypes.passwordToShort);

    result = selectPassword.projector({
      ...initialState.formSignIn,
      password: new Password('12345678'),
    });
    expect(result.value.leftToMaybe().extract().type).toEqual(
      PasswordFailureTypes.passwordShouldContainAtLeastOneUpperCaseChar
    );
  });

  it('should return valid password', () => {
    const expectedPassword = 'ValidPassword123';
    const result = selectPassword.projector({
      ...initialState.formSignIn,
      password: new Password(expectedPassword),
    });
    expect(result.isValid()).toEqual(true);
    const password = result.getOrCrash();
    expect(password).toEqual(expectedPassword);
  });

  it('should return the form is submiting', () => {
    const result = selectIsSubmitting.projector({
      ...initialState.formSignIn,
      isSubmitting: true,
    });
    expect(result).toEqual(true);
  });

  it('should return show form errors as true', () => {
    const result = selectShowErrorMessages.projector({
      ...initialState.formSignIn,
      showErrorMessages: true,
    });
    expect(result).toEqual(true);
  });

  it('should return failure on auth', () => {
    const result = selectAuthFailureSuccessOption.projector({
      ...initialState.formSignIn,
      authFailureSuccessOption: Just(
        Left(AuthFailure.invalidEmailAndPasswordCombination())
      ),
    });
    expect(result.isJust()).toEqual(true);
    expect(result.extract().leftToMaybe().isJust()).toEqual(true);
    const failure = result.extract().leftToMaybe().extract();
    expect(failure.type).toEqual(
      AuthFailureTypes.invalidEmailAndPasswordCombination
    );
  });

  it('should return auth success', () => {
    const result = selectAuthFailureSuccessOption.projector({
      ...initialState.formSignIn,
      authFailureSuccessOption: Just(Right(null)),
    });
    expect(result.isJust()).toEqual(true);
    expect(result.extract().isRight()).toEqual(true);
  });
});
