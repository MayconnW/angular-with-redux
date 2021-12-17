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

export class EmailFailure extends Failure<EmailFailureTypes> {
  private constructor(errorMessage: string, errorType: EmailFailureTypes) {
    super(errorMessage, errorType);
  }

  public static invalidEmail(): Failure<EmailFailureTypes> {
    return new EmailFailure('Email inválido', EmailFailureTypes.invalidEmail);
  }
}

export class PasswordFailure extends Failure<PasswordFailureTypes> {
  private constructor(errorMessage: string, errorType: PasswordFailureTypes) {
    super(errorMessage, errorType);
  }

  public static passwordToShort(): Failure<PasswordFailureTypes> {
    return new PasswordFailure(
      'Password precisa conter no mínimo 6 caracteres',
      PasswordFailureTypes.passwordToShort
    );
  }

  public static notContainSpecialCharacter(): Failure<PasswordFailureTypes> {
    return new PasswordFailure(
      'Password precisa conter no mínimo um caractere especial',
      PasswordFailureTypes.notContainSpecialCharacter
    );
  }
}

export class CpfFailure extends Failure<CpfFailureTypes> {
  private constructor(errorMessage: string, errorType: CpfFailureTypes) {
    super(errorMessage, errorType);
  }

  public static invalidCpf(): Failure<CpfFailureTypes> {
    return new CpfFailure(
      'Cpf informado não é válido',
      CpfFailureTypes.invalidCpf
    );
  }
}

export class AuthFailure extends Failure<AuthFailureTypes> {
  private constructor(errorMessage: string, errorType: AuthFailureTypes) {
    super(errorMessage, errorType);
  }

  public static cancelledByUser(): Failure<AuthFailureTypes> {
    return new AuthFailure(
      'Cancelado pelo usuário',
      AuthFailureTypes.cancelledByUser
    );
  }

  public static serverError(): Failure<AuthFailureTypes> {
    return new AuthFailure(
      'Erro ao comunicar com o servidor',
      AuthFailureTypes.serverError
    );
  }

  public static emailAlreadyInUse(): Failure<AuthFailureTypes> {
    return new AuthFailure(
      'Este email já está sendo utilizado em nossa base',
      AuthFailureTypes.emailAlreadyInUse
    );
  }

  public static invalidEmailAndPasswordCombination(): Failure<AuthFailureTypes> {
    return new AuthFailure(
      'Email ou senha inválidos',
      AuthFailureTypes.invalidEmailAndPasswordCombination
    );
  }
}
