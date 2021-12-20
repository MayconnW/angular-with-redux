/* eslint-disable max-len */
import { Either, Right, Left } from 'purify-ts/Either';
import { CpfFailure, EmailFailure, PasswordFailure } from './failure';

export const validateEmailAddress = (
  input: string
): Either<EmailFailure, string> => {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (!input.match(regex)) {
    return Left(EmailFailure.invalidEmail(input));
  }
  return Right(input);
};

export const validatePassword = (
  input: string
): Either<PasswordFailure, string> => {
  if (input.length < 6) {
    return Left(PasswordFailure.passwordToShort(input));
  }
  if (!input.match(/[A-Z]/)) {
    return Left(
      PasswordFailure.passwordShouldContainAtLeastOneUpperCaseChar(input)
    );
  }

  return Right(input);
};

export const validateCpf = (input: string): Either<CpfFailure, string> => {
  const cpf = input.replace(/[^\d]/g, '');

  if (cpf.length !== 11) {
    return Left(CpfFailure.invalidCpf(input));
  }

  if (cpf === '12345678909') {
    return Left(CpfFailure.invalidCpf(input));
  }

  return Right(input);
};
