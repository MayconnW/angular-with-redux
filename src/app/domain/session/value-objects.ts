import {
  validateCpf,
  validateEmailAddress,
  validatePassword,
} from './value-validators';
import { ValueObject } from '../core/value-objects';
import {
  CpfFailureTypes,
  EmailFailureTypes,
  PasswordFailureTypes,
} from './failure';

export class EmailAddress extends ValueObject<string, EmailFailureTypes> {
  constructor(input: string) {
    super(validateEmailAddress(input));
  }
}

export class Password extends ValueObject<string, PasswordFailureTypes> {
  constructor(input: string) {
    super(validatePassword(input));
  }
}

export class Cpf extends ValueObject<string, CpfFailureTypes> {
  constructor(input: string) {
    super(validateCpf(input));
  }
}
