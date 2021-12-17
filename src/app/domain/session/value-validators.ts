/* eslint-disable max-len */
import { Either, Right, Left } from 'purify-ts/Either';
import { CpfFailure, EmailFailure, PasswordFailure } from './failure';
import { Failure } from '../core/failure';

export const validateEmailAddress = (
  input: string
): Either<EmailFailure, string> => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!input.match(regex)) {
    return Left(EmailFailure.invalidEmail());
  }
  return Right(input);
};

export const validatePassword = (
  input: string
): Either<PasswordFailure, string> => {
  if (input.length < 6) {
    return Left(PasswordFailure.passwordToShort());
  }

  return Right(input);
};

export const validateCpf = (input: string): Either<CpfFailure, string> => {
  const cpf = input.replace(/[^\d]/g, '');

  if (cpf.length !== 11) {
    return Left(CpfFailure.invalidCpf());
  }

  if (cpf === '12345678909') {
    return Left(CpfFailure.invalidCpf());
  }

  return Right(input);
};
