/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Either } from 'purify-ts/Either';

export abstract class Failure<T> {
  private _errorMessage: string;

  private _type: T;

  constructor(errorMessage: string, type: T) {
    this._errorMessage = errorMessage;
    this._type = type;
  }

  get errorMessage(): string {
    return this._errorMessage;
  }

  get type(): T {
    return this._type;
  }

  toString(): string {
    return `Error: (${this.errorMessage})`;
  }
}
