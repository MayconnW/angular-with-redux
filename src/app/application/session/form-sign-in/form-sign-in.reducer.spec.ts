import {
  initialState,
  formSignInReducer,
  FormSignInState,
} from './form-sign-in.reducer';
import {
  emailChanged,
  formSubmittingStatus,
  passwordChanged,
  signInSubmitResponse,
  signInWithEmailAndPasswordPressed,
} from './form-sign-in.action';
import { EmailAddress, Password } from 'src/app/domain/session/value-objects';
import { Just } from 'purify-ts/Maybe';
import { Left, Right } from 'purify-ts/Either';
import { AuthFailure } from 'src/app/domain/session/failure';

describe('Form Sign In reducer', () => {
  describe('unknown action', () => {
    it('should return the default state since the action dispatched is not known by this reducer', () => {
      const action = {
        type: 'Unknown',
      };

      const state = formSignInReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('Known actions', () => {
    it('should update the user email and password', () => {
      const expectedEmail = 'valid@email.com';
      const expectedPassword = 'ValidPass123';

      const expectedNewState: FormSignInState = {
        ...initialState,
        emailAddress: new EmailAddress(expectedEmail),
        password: new Password(expectedPassword),
      };

      const actionEmailChanged = emailChanged({ email: expectedEmail });
      const actionPasswordChanged = passwordChanged({
        password: expectedPassword,
      });
      const state = formSignInReducer(
        formSignInReducer(initialState, actionEmailChanged),
        actionPasswordChanged
      );

      expect(state).toEqual(expectedNewState);
      expect(state).not.toBe(expectedNewState);
    });

    it('should update the form state when the sign in is called', () => {
      const expectedNewState: FormSignInState = {
        ...initialState,
        isSubmitting: true,
        showErrorMessages: true,
      };

      const action = signInWithEmailAndPasswordPressed();
      const state = formSignInReducer(initialState, action);

      expect(state).toEqual(expectedNewState);
      expect(state).not.toBe(expectedNewState);
    });

    describe('when the response for the sign in is called', () => {
      it('should return success', () => {
        const expectedAuthSuccess = Just(Right(null));
        const expectedNewState: FormSignInState = {
          ...initialState,
          authFailureSuccessOption: expectedAuthSuccess,
          showErrorMessages: true,
        };

        const action = signInSubmitResponse({
          authFailureSuccess: expectedAuthSuccess,
        });
        const state = formSignInReducer(initialState, action);

        expect(state).toEqual(expectedNewState);
        expect(state).not.toBe(expectedNewState);
      });

      it('should return fail', () => {
        const expectedAuthFail = Just(
          Left(AuthFailure.invalidEmailAndPasswordCombination())
        );
        const expectedNewState: FormSignInState = {
          ...initialState,
          authFailureSuccessOption: expectedAuthFail,
          showErrorMessages: true,
        };

        const action = signInSubmitResponse({
          authFailureSuccess: expectedAuthFail,
        });
        const state = formSignInReducer(initialState, action);

        expect(state).toEqual(expectedNewState);
        expect(state).not.toBe(expectedNewState);
      });
    });

    it('should change submitting status', () => {
      const expectedNewState: FormSignInState = {
        ...initialState,
        isSubmitting: true,
      };

      const action = formSubmittingStatus({ isSubmitting: true });
      const state = formSignInReducer(initialState, action);

      expect(state).toEqual(expectedNewState);
      expect(state).not.toBe(expectedNewState);
    });
  });
});
