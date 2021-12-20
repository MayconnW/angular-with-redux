/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Either } from 'purify-ts/Either';
import { Failure } from './failure';

/*
  T represents the type of the ValueObject will be created
  R represents the set of Failure types it could return
*/
export abstract class ValueObject<T, R> {
  private _value: Either<Failure<R, T>, T>;

  constructor(value: Either<Failure<R, T>, T>) {
    this._value = value;
  }

  get value(): Either<Failure<R, T>, T> {
    return this._value;
  }

  isValid(): boolean {
    return this.value.isRight();
  }

  getOrCrash(): T {
    return this.value.caseOf({
      Left: (_) => {
        throw Error('Unhandled Error');
      },
      Right: (r) => r,
    });
  }

  getValueOrFailedValue(): T {
    return this.value.caseOf({
      Left: (l) => l.failedValue,
      Right: (r) => r,
    });
  }

  getErrorMessage(): string {
    if (this.value.isLeft()) {
      return this.value.extract().errorMessage;
    }

    return '';
  }

  toString(): string {
    return `Value(${this.value.toString()})`;
  }
}
