import {
  CpfFailureTypes,
  EmailFailureTypes,
  PasswordFailureTypes,
} from './failure';
import { Cpf, EmailAddress, Password } from './value-objects';

describe('Core/Session -> Value Objects', () => {
  describe('Email', () => {
    it('should return invalid email', () => {
      const expectedEmailStr = 'invalid@email';
      const emailAddress = new EmailAddress(expectedEmailStr);
      expect(emailAddress.isValid()).toEqual(false);
      expect(emailAddress.getValueOrFailedValue()).toEqual(expectedEmailStr);
      expect(emailAddress.value.leftToMaybe().extract().type).toEqual(
        EmailFailureTypes.invalidEmail
      );
    });

    it('should return valid email', () => {
      const expectedEmailStr = 'valid@email.com';
      const emailAddress = new EmailAddress(expectedEmailStr);
      expect(emailAddress.isValid()).toEqual(true);
      expect(emailAddress.getOrCrash()).toEqual(expectedEmailStr);
    });
  });

  describe('Password', () => {
    it('should return invalid password', () => {
      const expectedPasswordlStr1 = '12345';
      const password1 = new Password(expectedPasswordlStr1);
      expect(password1.isValid()).toEqual(false);
      expect(password1.getValueOrFailedValue()).toEqual(expectedPasswordlStr1);
      expect(password1.value.leftToMaybe().extract().type).toEqual(
        PasswordFailureTypes.passwordToShort
      );

      const expectedPasswordlStr2 = '123456789';
      const password2 = new Password(expectedPasswordlStr2);
      expect(password2.isValid()).toEqual(false);
      expect(password2.getValueOrFailedValue()).toEqual(expectedPasswordlStr2);
      expect(password2.value.leftToMaybe().extract().type).toEqual(
        PasswordFailureTypes.passwordShouldContainAtLeastOneUpperCaseChar
      );
    });

    it('should return valid password', () => {
      const expectedPasswordStr = 'ValidPass123';
      const password = new Password(expectedPasswordStr);
      expect(password.isValid()).toEqual(true);
      expect(password.getOrCrash()).toEqual(expectedPasswordStr);
    });
  });

  describe('Cpf', () => {
    it('should return invalid Cpf', () => {
      const expectedCpfStr = '12345678909';
      const cpf = new Cpf(expectedCpfStr);
      expect(cpf.isValid()).toEqual(false);
      expect(cpf.getValueOrFailedValue()).toEqual(expectedCpfStr);
      expect(cpf.value.leftToMaybe().extract().type).toEqual(
        CpfFailureTypes.invalidCpf
      );
    });

    it('should return valid cpf', () => {
      const expectedCpfStr1 = '57684254030';
      const expectedCpfStr2 = '576.842.540-30';

      const cpf1 = new Cpf(expectedCpfStr1);
      const cpf2 = new Cpf(expectedCpfStr2);

      expect(cpf1.isValid()).toEqual(true);
      expect(cpf1.getOrCrash()).toEqual(expectedCpfStr1);

      expect(cpf2.isValid()).toEqual(true);
      expect(cpf2.getOrCrash()).toEqual(expectedCpfStr2);
    });
  });
});
