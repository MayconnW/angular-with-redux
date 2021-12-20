import { Failure } from '../core/failure';

export enum EmailFailureTypes {
  invalidEmail,
}

export enum PasswordFailureTypes {
  passwordToShort,
  notContainSpecialCharacter,
}

export enum CpfFailureTypes {
  invalidCpf,
}

export enum AuthFailureTypes {
  cancelledByUser,
  serverError,
  emailAlreadyInUse,
  invalidEmailAndPasswordCombination,
}

export class EmailFailure extends Failure<EmailFailureTypes, string> {
  private constructor(
    errorMessage: string,
    errorType: EmailFailureTypes,
    failedValue: string
  ) {
    super(errorMessage, errorType, failedValue);
  }

  public static invalidEmail(failedValue: string) {
    return new EmailFailure(
      'Email inválido',
      EmailFailureTypes.invalidEmail,
      failedValue
    );
  }
}

export class PasswordFailure extends Failure<PasswordFailureTypes, string> {
  private constructor(
    errorMessage: string,
    errorType: PasswordFailureTypes,
    failedValue: string
  ) {
    super(errorMessage, errorType, failedValue);
  }

  public static passwordToShort(failedValue: string) {
    return new PasswordFailure(
      'Password precisa conter no mínimo 6 caracteres',
      PasswordFailureTypes.passwordToShort,
      failedValue
    );
  }

  public static passwordShouldContainAtLeastOneUpperCaseChar(
    failedValue: string
  ) {
    return new PasswordFailure(
      'Password precisa conter no mínimo 1 caractere maiúsculo',
      PasswordFailureTypes.passwordToShort,
      failedValue
    );
  }

  public static notContainSpecialCharacter(failedValue: string) {
    return new PasswordFailure(
      'Password precisa conter no mínimo um caractere especial',
      PasswordFailureTypes.notContainSpecialCharacter,
      failedValue
    );
  }
}

export class CpfFailure extends Failure<CpfFailureTypes, string> {
  private constructor(
    errorMessage: string,
    errorType: CpfFailureTypes,
    failedValue: string
  ) {
    super(errorMessage, errorType, failedValue);
  }

  public static invalidCpf(failedValue: string) {
    return new CpfFailure(
      'Cpf informado não é válido',
      CpfFailureTypes.invalidCpf,
      failedValue
    );
  }
}

export class AuthFailure extends Failure<AuthFailureTypes, void> {
  private constructor(errorMessage: string, errorType: AuthFailureTypes) {
    super(errorMessage, errorType);
  }

  public static cancelledByUser() {
    return new AuthFailure(
      'Cancelado pelo usuário',
      AuthFailureTypes.cancelledByUser
    );
  }

  public static serverError() {
    return new AuthFailure(
      'Erro ao comunicar com o servidor',
      AuthFailureTypes.serverError
    );
  }

  public static emailAlreadyInUse() {
    return new AuthFailure(
      'Este email já está sendo utilizado em nossa base',
      AuthFailureTypes.emailAlreadyInUse
    );
  }

  public static invalidEmailAndPasswordCombination() {
    return new AuthFailure(
      'Email ou senha inválidos',
      AuthFailureTypes.invalidEmailAndPasswordCombination
    );
  }
}
