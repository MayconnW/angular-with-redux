import {
  initialState,
  sessionReducer,
  SessionState,
  SignStatus,
} from './session.reducer';
import { authenticated, unauthenticated } from './session.action';
//import { Book } from '../book-list/books.model';

describe('Session reducer', () => {
  describe('unknown action', () => {
    it('should return the default state since the action dispatched is not known by this reducer', () => {
      const action = {
        type: 'Unknown',
      };

      const state = sessionReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('Testing the auth reducers', () => {
    it('should sign in the user', () => {
      const expectedNewState: SessionState = {
        signStatus: SignStatus.authenticated,
      };

      const action = authenticated();
      const state = sessionReducer(initialState, action);

      expect(state).toEqual(expectedNewState);
      expect(state).not.toBe(expectedNewState);
    });

    it('should return the user is not signed in', () => {
      const expectedNewState: SessionState = {
        signStatus: SignStatus.unauthenticated,
      };

      const action = unauthenticated();
      const state = sessionReducer(initialState, action);

      expect(state).toEqual(expectedNewState);
      expect(state).not.toBe(expectedNewState);
    });
  });
});
