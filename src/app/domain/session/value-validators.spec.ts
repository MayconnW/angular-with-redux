import { CpfFailureTypes, PasswordFailureTypes } from './failure';
import { Cpf, EmailAddress, Password } from './value-objects';

describe('Core/Session -> Validators', () => {
  describe('Email', () => {
    it('should return invalid email', () => {
      const email = new EmailAddress('invalid-email');
      expect(email.isValid()).toEqual(false);
      expect(email.value.isLeft()).toEqual(true);
    });

    it('should return valid email', () => {
      const expectedEmail = 'valid@email.com';
      const email = new EmailAddress(expectedEmail);
      expect(email.isValid()).toEqual(true);
      expect(email.value.isRight()).toEqual(true);
      expect(email.getValueOrFailedValue()).toEqual(expectedEmail);
    });
  });

  describe('Password', () => {
    it('should return invalid password - to short', () => {
      const password = new Password('12345');
      expect(password.isValid()).toEqual(false);
      expect(password.value.leftToMaybe().extract().type).toEqual(
        PasswordFailureTypes.passwordToShort
      );
    });

    it('should return invalid password - not contain uppercase letter', () => {
      const password = new Password('12345678');
      expect(password.isValid()).toEqual(false);
      expect(password.value.leftToMaybe().extract().type).toEqual(
        PasswordFailureTypes.passwordShouldContainAtLeastOneUpperCaseChar
      );
    });

    it('should return valid password', () => {
      const expectedPasswordStr = '12345678A';
      const password = new Password(expectedPasswordStr);
      expect(password.isValid()).toEqual(true);
      expect(password.getOrCrash()).toEqual(expectedPasswordStr);
    });
  });

  describe('Cpf', () => {
    it('should return invalid cpf', () => {
      const cpf1 = new Cpf('123');
      const cpf2 = new Cpf('12345678909');
      expect(cpf1.isValid()).toEqual(false);
      expect(cpf2.isValid()).toEqual(false);
      expect(cpf1.value.leftToMaybe().extract().type).toEqual(
        CpfFailureTypes.invalidCpf
      );
    });

    it('should return valid cpf', () => {
      const expectedCpf1Str = '57684254030';
      const expectedCpf2Str = '576.842.540-30';

      const cpf1 = new Cpf(expectedCpf1Str);
      const cpf2 = new Cpf(expectedCpf2Str);

      expect(cpf1.isValid()).toEqual(true);
      expect(cpf2.isValid()).toEqual(true);
      expect(cpf1.getOrCrash()).toEqual(expectedCpf1Str);
      expect(cpf2.getOrCrash()).toEqual(expectedCpf2Str);
    });
  });
});
