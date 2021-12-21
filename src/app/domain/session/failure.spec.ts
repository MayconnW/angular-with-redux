import {
  AuthFailure,
  AuthFailureTypes,
  CpfFailure,
  CpfFailureTypes,
  EmailFailure,
  EmailFailureTypes,
  PasswordFailure,
  PasswordFailureTypes,
} from './failure';

describe('Core/Session -> Failure', () => {
  describe('Email failures', () => {
    it('should return invalid email type', () => {
      const expectedInvalidEmail = 'invalid-email';
      const emailFailure = EmailFailure.invalidEmail(expectedInvalidEmail);
      expect(emailFailure.failedValue).toEqual(expectedInvalidEmail);
      expect(emailFailure.type).toEqual(EmailFailureTypes.invalidEmail);
    });
  });

  describe('Password failures', () => {
    it('should return password is to short type', () => {
      const expectedInvalidPassword = '12345';
      const passwordFailure = PasswordFailure.passwordToShort(
        expectedInvalidPassword
      );
      expect(passwordFailure.failedValue).toEqual(expectedInvalidPassword);
      expect(passwordFailure.type).toEqual(
        PasswordFailureTypes.passwordToShort
      );
    });

    it('should return password should contain at least one Upper charactere type', () => {
      const expectedInvalidPassword = '12345678';
      const passwordFailure =
        PasswordFailure.passwordShouldContainAtLeastOneUpperCaseChar(
          expectedInvalidPassword
        );
      expect(passwordFailure.failedValue).toEqual(expectedInvalidPassword);
      expect(passwordFailure.type).toEqual(
        PasswordFailureTypes.passwordShouldContainAtLeastOneUpperCaseChar
      );
    });

    it('should return password not contain special charactere type', () => {
      const expectedInvalidPassword = '12345678A';
      const passwordFailure = PasswordFailure.notContainSpecialCharacter(
        expectedInvalidPassword
      );
      expect(passwordFailure.failedValue).toEqual(expectedInvalidPassword);
      expect(passwordFailure.type).toEqual(
        PasswordFailureTypes.notContainSpecialCharacter
      );
    });
  });

  describe('CPF failures', () => {
    it('should return invalid cpf type', () => {
      const expectedInvalidCpf = 'invalid-cpf-123';
      const cpfFailure = CpfFailure.invalidCpf(expectedInvalidCpf);
      expect(cpfFailure.failedValue).toEqual(expectedInvalidCpf);
      expect(cpfFailure.type).toEqual(CpfFailureTypes.invalidCpf);
    });
  });

  describe('Auth failures', () => {
    it('should return cancelled by user type', () => {
      const authFailure = AuthFailure.cancelledByUser();
      expect(authFailure.type).toEqual(AuthFailureTypes.cancelledByUser);
    });

    it('should return email already in use type', () => {
      const authFailure = AuthFailure.emailAlreadyInUse();
      expect(authFailure.type).toEqual(AuthFailureTypes.emailAlreadyInUse);
    });

    it('should return invalid email and password combination type', () => {
      const authFailure = AuthFailure.invalidEmailAndPasswordCombination();
      expect(authFailure.type).toEqual(
        AuthFailureTypes.invalidEmailAndPasswordCombination
      );
    });

    it('should return server error type', () => {
      const authFailure = AuthFailure.serverError();
      expect(authFailure.type).toEqual(AuthFailureTypes.serverError);
    });
  });
});
